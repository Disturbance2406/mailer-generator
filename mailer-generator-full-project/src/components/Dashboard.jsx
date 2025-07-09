import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  LogOut, 
  Crown, 
  Download, 
  Save, 
  Users, 
  ArrowRight,
  Zap,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, userProfile, logout, getTierConfig, getRemainingDownloads } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const currentTier = getTierConfig();
  const remainingDownloads = getRemainingDownloads();
  const usagePercentage = currentTier.downloads > 0 
    ? ((userProfile.downloadsUsed / currentTier.downloads) * 100) 
    : 0;

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-orange-100 text-orange-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'bronze': return <Zap className="h-4 w-4" />;
      case 'gold': return <Star className="h-4 w-4" />;
      case 'platinum': return <Crown className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mailer Generator by AvenueHaus</h1>
                <p className="text-sm text-gray-600">Welcome back, {userProfile.displayName}!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`${getTierBadgeColor(userProfile.subscriptionTier)} flex items-center gap-1`}>
                {getTierIcon(userProfile.subscriptionTier)}
                {currentTier.name} Plan
              </Badge>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Start creating your professional email templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/editor">
                  <Button className="w-full justify-start h-auto p-4">
                    <Mail className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Create New Email</div>
                      <div className="text-sm text-gray-500">Start with a template and customize</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
                
                {userProfile.subscriptionTier !== 'free' && (
                  <Link to="/saved-mailers">
                    <Button variant="outline" className="w-full justify-start h-auto p-4">
                      <Save className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Saved Mailers</div>
                        <div className="text-sm text-gray-500">View and edit your saved templates</div>
                      </div>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  </Link>
                )}
                
                <Link to="/pricing">
                  <Button variant="outline" className="w-full justify-start h-auto p-4">
                    <Crown className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Upgrade Plan</div>
                      <div className="text-sm text-gray-500">Unlock more features and downloads</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Overview</CardTitle>
                <CardDescription>
                  Track your email generation and downloads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userProfile.downloadsUsed}</div>
                    <div className="text-sm text-gray-600">Downloads Used</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{remainingDownloads}</div>
                    <div className="text-sm text-gray-600">Downloads Remaining</div>
                  </div>
                </div>
                
                {currentTier.downloads > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Download Usage</span>
                      <span>{userProfile.downloadsUsed} / {currentTier.downloads}</span>
                    </div>
                    <Progress value={usagePercentage} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTierIcon(userProfile.subscriptionTier)}
                  {currentTier.name} Plan
                </CardTitle>
                <CardDescription>
                  {currentTier.price > 0 ? `R${currentTier.price.toLocaleString()} ${currentTier.currency}` : 'Free'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentTier.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    {feature}
                  </div>
                ))}
                
                {userProfile.subscriptionTier === 'free' && (
                  <div className="mt-4 pt-4 border-t">
                    <Link to="/pricing">
                      <Button className="w-full">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-gray-700">Email</div>
                  <div className="text-gray-600">{currentUser.email}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Member Since</div>
                  <div className="text-gray-600">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-700">Last Login</div>
                  <div className="text-gray-600">
                    {new Date(userProfile.lastLogin).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}



      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Mailer Generator by AvenueHaus. All rights reserved. System developed by Aventor Labs.</p>
        </div>
      </footer>

