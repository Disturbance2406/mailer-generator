import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';

export default function PaymentCancel() {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate('/pricing');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl text-orange-600">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled and no charges were made to your account.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <p className="text-sm text-orange-800">
              Don't worry! You can try again anytime. Your current plan remains active.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleRetryPayment} className="w-full h-12">
              <CreditCard className="h-4 w-4 mr-2" />
              Try Payment Again
            </Button>
            
            <Button variant="outline" onClick={handleBackToDashboard} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              Need help with payment? Contact our support team for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

