// PayFast Payment Service for South African payments
import CryptoJS from 'crypto-js';

class PaymentService {
  constructor() {
    // PayFast configuration - these should be environment variables in production
    this.config = {
      // Sandbox credentials - replace with live credentials for production
      merchantId: process.env.REACT_APP_PAYFAST_MERCHANT_ID || '10000100',
      merchantKey: process.env.REACT_APP_PAYFAST_MERCHANT_KEY || '46f0cd694581a',
      passphrase: process.env.REACT_APP_PAYFAST_PASSPHRASE || 'jt7NOE43FZPn',
      sandbox: process.env.REACT_APP_PAYFAST_SANDBOX !== 'false', // Default to sandbox
      
      // URLs
      sandboxUrl: 'https://sandbox.payfast.co.za/eng/process',
      liveUrl: 'https://www.payfast.co.za/eng/process',
      
      // Return URLs - these should be your actual domain
      returnUrl: process.env.REACT_APP_RETURN_URL || window.location.origin + '/payment/success',
      cancelUrl: process.env.REACT_APP_CANCEL_URL || window.location.origin + '/payment/cancel',
      notifyUrl: process.env.REACT_APP_NOTIFY_URL || window.location.origin + '/api/payment/notify'
    };
  }

  // Generate MD5 signature for PayFast
  generateSignature(data, passphrase = '') {
    // Create parameter string
    let paramString = '';
    const sortedKeys = Object.keys(data).sort();
    
    for (const key of sortedKeys) {
      if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
        paramString += `${key}=${encodeURIComponent(data[key])}&`;
      }
    }
    
    // Remove trailing &
    paramString = paramString.slice(0, -1);
    
    // Add passphrase if provided
    if (passphrase) {
      paramString += `&passphrase=${encodeURIComponent(passphrase)}`;
    }
    
    // Generate MD5 hash
    return CryptoJS.MD5(paramString).toString();
  }

  // Create payment data for subscription upgrade
  createSubscriptionPayment(userProfile, subscriptionTier, tierConfig) {
    const paymentId = `SUB_${userProfile.uid}_${Date.now()}`;
    
    const paymentData = {
      // Merchant details
      merchant_id: this.config.merchantId,
      merchant_key: this.config.merchantKey,
      
      // Return URLs
      return_url: this.config.returnUrl,
      cancel_url: this.config.cancelUrl,
      notify_url: this.config.notifyUrl,
      
      // Customer details
      name_first: userProfile.displayName?.split(' ')[0] || 'Customer',
      name_last: userProfile.displayName?.split(' ').slice(1).join(' ') || '',
      email_address: userProfile.email,
      
      // Transaction details
      m_payment_id: paymentId,
      amount: tierConfig.price.toFixed(2),
      item_name: `${tierConfig.name} Subscription - Mailer Generator`,
      item_description: `Upgrade to ${tierConfig.name} plan with ${tierConfig.downloads} downloads`,
      
      // Custom fields for our tracking
      custom_str1: subscriptionTier,
      custom_str2: userProfile.uid,
      custom_str3: 'subscription_upgrade',
      custom_int1: tierConfig.downloads,
      
      // Transaction options
      email_confirmation: '1',
      confirmation_address: userProfile.email
    };

    // Generate signature
    paymentData.signature = this.generateSignature(paymentData, this.config.passphrase);
    
    return paymentData;
  }

  // Create payment form and submit to PayFast
  initiatePayment(paymentData) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.config.sandbox ? this.config.sandboxUrl : this.config.liveUrl;
    form.style.display = 'none';

    // Add all payment data as hidden inputs
    Object.keys(paymentData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });

    // Add form to document and submit
    document.body.appendChild(form);
    form.submit();
    
    // Clean up
    document.body.removeChild(form);
  }

  // Process subscription upgrade
  async processSubscriptionUpgrade(userProfile, subscriptionTier, tierConfig) {
    try {
      // Create payment data
      const paymentData = this.createSubscriptionPayment(userProfile, subscriptionTier, tierConfig);
      
      // Store payment intent in localStorage for verification after return
      const paymentIntent = {
        paymentId: paymentData.m_payment_id,
        userId: userProfile.uid,
        subscriptionTier: subscriptionTier,
        amount: tierConfig.price,
        timestamp: Date.now()
      };
      
      localStorage.setItem('payfast_payment_intent', JSON.stringify(paymentIntent));
      
      // Initiate payment
      this.initiatePayment(paymentData);
      
      return { success: true, paymentId: paymentData.m_payment_id };
    } catch (error) {
      console.error('Payment initiation failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Verify payment return (called on return URL)
  verifyPaymentReturn(urlParams) {
    const paymentIntent = localStorage.getItem('payfast_payment_intent');
    if (!paymentIntent) {
      return { success: false, error: 'No payment intent found' };
    }

    try {
      const intent = JSON.parse(paymentIntent);
      
      // Basic verification - in production, you should verify with PayFast ITN
      if (urlParams.get('payment_id') === intent.paymentId) {
        // Clear payment intent
        localStorage.removeItem('payfast_payment_intent');
        
        return {
          success: true,
          paymentId: intent.paymentId,
          userId: intent.userId,
          subscriptionTier: intent.subscriptionTier,
          amount: intent.amount
        };
      }
      
      return { success: false, error: 'Payment verification failed' };
    } catch (error) {
      return { success: false, error: 'Invalid payment intent data' };
    }
  }

  // Get payment status (for display purposes)
  getPaymentStatus(paymentId) {
    // In a real implementation, you would call PayFast API to get payment status
    // For now, we'll simulate based on localStorage
    const paymentIntent = localStorage.getItem('payfast_payment_intent');
    if (paymentIntent) {
      const intent = JSON.parse(paymentIntent);
      if (intent.paymentId === paymentId) {
        return 'pending';
      }
    }
    return 'unknown';
  }

  // Format currency for display
  formatCurrency(amount, currency = 'ZAR') {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Calculate savings for display
  calculateSavings(originalPrice, salePrice) {
    if (!originalPrice || originalPrice <= salePrice) return 0;
    return originalPrice - salePrice;
  }

  // Calculate percentage savings
  calculateSavingsPercentage(originalPrice, salePrice) {
    if (!originalPrice || originalPrice <= salePrice) return 0;
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  }
}

export default new PaymentService();

