import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PaymentService from './PaymentService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, ArrowRight, Crown } from 'lucide-react';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { upgradeSubscription, getTierConfig } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Verify payment with PayFast
        const verification = PaymentService.verifyPaymentReturn(searchParams);
        
        if (verification.success) {
          // Update user subscription in Firebase
          await upgradeSubscription(verification.subscriptionTier);
          
          const tierConfig = getTierConfig(verification.subscriptionTier);
          
          setPaymentDetails({
            ...verification,
            tierConfig
          });
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
        setVerificationStatus('failed');
      }
    };

    verifyPayment();
  }, [searchParams, upgradeSubscription, getTierConfig]);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleCreateEmail = () => {
    navigate('/editor');
  };

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">✕</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Payment Verification Failed</h2>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. Please contact support if you believe this is an error.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate('/pricing')} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Welcome to your new {paymentDetails?.tierConfig?.name} subscription
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{paymentDetails?.tierConfig?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-medium">
                  {PaymentService.formatCurrency(paymentDetails?.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono text-xs">{paymentDetails?.paymentId}</span>
              </div>
            </div>
          </div>

          {/* New Features Unlocked */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Crown className="h-4 w-4 text-blue-600" />
              Features Unlocked
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {paymentDetails?.tierConfig?.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleCreateEmail} className="w-full h-12">
              <Mail className="h-4 w-4 mr-2" />
              Create Your First Email
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button variant="outline" onClick={handleContinue} className="w-full">
              Go to Dashboard
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Need help? Contact our {paymentDetails?.tierConfig?.support} support team.
            </p>
            {paymentDetails?.tierConfig?.support === 'VIP (2h)' && (
              <p className="text-blue-600 font-medium">
                VIP Support: Response within 2 hours guaranteed
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

