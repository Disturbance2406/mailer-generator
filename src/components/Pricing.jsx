import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Users, 
  Mail, 
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Download,
  Save,
  Palette,
  HeadphonesIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentService from './payment/PaymentService';

export default function Pricing() {
  const { userProfile, getTierConfig, TIER_CONFIG, SUBSCRIPTION_TIERS } = useAuth();
  const [isProcessing, setIsProcessing] = useState(null);
  const navigate = useNavigate();

  const handleUpgrade = async (tier) => {
    if (!userProfile) {
      navigate('/login');
      return;
    }

    setIsProcessing(tier);
    
    try {
      const tierConfig = getTierConfig(tier);
      const result = await PaymentService.processSubscriptionUpgrade(
        userProfile, 
        tier, 
        tierConfig
      );
      
      if (!result.success) {
        console.error('Payment failed:', result.error);
        setIsProcessing(null);
      }
      // If successful, user will be redirected to PayFast
    } catch (error) {
      console.error('Upgrade failed:', error);
      setIsProcessing(null);
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'free': return <Users className="h-6 w-6" />;
      case 'bronze': return <Zap className="h-6 w-6" />;
      case 'gold': return <Star className="h-6 w-6" />;
      case 'platinum': return <Crown className="h-6 w-6" />;
      default: return <Users className="h-6 w-6" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'free': return 'text-gray-600 bg-gray-100';
      case 'bronze': return 'text-orange-600 bg-orange-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const isCurrentPlan = (tier) => {
    return userProfile?.subscriptionTier === tier;
  };

  const isUpgrade = (tier) => {
    const tierOrder = ['free', 'bronze', 'gold', 'platinum'];
    const currentIndex = tierOrder.indexOf(userProfile?.subscriptionTier || 'free');
    const targetIndex = tierOrder.indexOf(tier);
    return targetIndex > currentIndex;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mailer Generator</h1>
                <p className="text-sm text-gray-600">Professional Email Templates</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              {userProfile ? (
                <Link to="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create professional email templates with our powerful generator. 
            Start free and upgrade as you grow.
          </p>
          
          {userProfile && (
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <div className={`w-3 h-3 rounded-full ${getTierColor(userProfile.subscriptionTier)}`}></div>
              <span className="font-medium">
                Current Plan: {getTierConfig(userProfile.subscriptionTier).name}
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {Object.entries(TIER_CONFIG).map(([tier, config]) => (
            <Card 
              key={tier} 
              className={`relative transition-all duration-300 hover:shadow-xl ${
                tier === 'gold' ? 'ring-2 ring-yellow-400 scale-105' : ''
              } ${isCurrentPlan(tier) ? 'ring-2 ring-blue-500' : ''}`}
            >
              {tier === 'gold' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-white px-4 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {isCurrentPlan(tier) && (
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-blue-500 text-white px-3 py-1">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${getTierColor(tier)}`}>
                  {getTierIcon(tier)}
                </div>
                <CardTitle className="text-2xl">{config.name}</CardTitle>
                <CardDescription className="text-sm">
                  {tier === 'free' && 'Perfect for trying out'}
                  {tier === 'bronze' && 'One-time email campaign'}
                  {tier === 'gold' && 'Growing businesses'}
                  {tier === 'platinum' && 'Marketing teams & agencies'}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  {config.price === 0 ? (
                    <div className="text-3xl font-bold text-gray-900">Free</div>
                  ) : (
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {PaymentService.formatCurrency(config.price)}
                      </div>
                      {config.originalPrice && (
                        <div className="text-lg text-gray-500 line-through">
                          {PaymentService.formatCurrency(config.originalPrice)}
                        </div>
                      )}
                      <div className="text-sm text-gray-600">One-time payment</div>
                    </div>
                  )}
                  
                  {config.originalPrice && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">
                        Save {PaymentService.formatCurrency(config.originalPrice - config.price)}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Value Proposition */}
                {config.downloads > 0 && (
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600">Cost per mailer</div>
                    <div className="text-lg font-bold text-green-600">
                      {PaymentService.formatCurrency(config.price / config.downloads)}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="space-y-3">
                  {config.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  {isCurrentPlan(tier) ? (
                    <Button disabled className="w-full">
                      <Check className="h-4 w-4 mr-2" />
                      Current Plan
                    </Button>
                  ) : tier === 'free' ? (
                    <Link to="/signup">
                      <Button variant="outline" className="w-full">
                        Get Started Free
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      onClick={() => handleUpgrade(tier)}
                      disabled={isProcessing === tier || !isUpgrade(tier)}
                      className={`w-full ${tier === 'gold' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
                    >
                      {isProcessing === tier ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : isUpgrade(tier) ? (
                        <>
                          Upgrade Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        'Downgrade'
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
            <p className="text-gray-600">Compare all features across our plans</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Bronze</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Gold</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Platinum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Email Templates
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">2 Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">All (10+)</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">All (10+)</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">All + Future</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    HTML Downloads
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">1</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">5</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">10</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save & Edit Mailers
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                    <HeadphonesIcon className="h-4 w-4" />
                    Support Level
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">Email</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">Priority</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">VIP (2h)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Advanced Branding
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">❌</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade anytime?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! You can upgrade your plan anytime. Downgrades take effect at the end of your current billing period.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Are the email templates mobile-responsive?
              </h3>
              <p className="text-gray-600 text-sm">
                Absolutely! All our templates are built with MJML to ensure perfect rendering across all email clients and devices.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 text-sm">
                We accept all major credit cards, EFT, and other South African payment methods through PayFast.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do downloads expire?
              </h3>
              <p className="text-gray-600 text-sm">
                No! Once you purchase a plan, your download allowance never expires. Use them at your own pace.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Create Professional Emails?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses creating beautiful email campaigns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="px-8">
                Start Free Trial
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/editor">
              <Button size="lg" variant="outline" className="px-8">
                Try Editor Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

