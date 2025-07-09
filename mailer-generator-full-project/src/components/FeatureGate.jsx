import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Crown, Zap, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentService from './payment/PaymentService';

// Feature gate wrapper component
export function FeatureGate({ 
  feature, 
  children, 
  fallback = null, 
  requiredTier = 'bronze',
  showUpgrade = true 
}) {
  const { userProfile, canAccessTemplate, canDownload, getTierConfig } = useAuth();
  
  let hasAccess = false;
  
  switch (feature) {
    case 'template':
      hasAccess = canAccessTemplate(children?.props?.templateIndex || 0);
      break;
    case 'download':
      hasAccess = canDownload();
      break;
    case 'save':
      hasAccess = userProfile?.subscriptionTier !== 'free';
      break;
    case 'premium_templates':
      hasAccess = userProfile?.subscriptionTier !== 'free';
      break;
    default:
      hasAccess = true;
  }
  
  if (hasAccess) {
    return children;
  }
  
  if (fallback) {
    return fallback;
  }
  
  if (showUpgrade) {
    return <UpgradePrompt feature={feature} requiredTier={requiredTier} />;
  }
  
  return null;
}

// Template access gate
export function TemplateGate({ templateIndex, children }) {
  const { canAccessTemplate } = useAuth();
  
  if (canAccessTemplate(templateIndex)) {
    return children;
  }
  
  return <LockedTemplate templateIndex={templateIndex} />;
}

// Download gate
export function DownloadGate({ children, onUpgrade }) {
  const { canDownload, getRemainingDownloads, userProfile, getTierConfig } = useAuth();
  
  if (canDownload()) {
    return children;
  }
  
  const currentTier = getTierConfig();
  const remainingDownloads = getRemainingDownloads();
  
  return (
    <div className="relative">
      <div className="opacity-50 pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-lg">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center pb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Download Limit Reached</CardTitle>
            <CardDescription>
              You've used all {currentTier.downloads} downloads in your {currentTier.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <UpgradeOptions onUpgrade={onUpgrade} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Locked template component
function LockedTemplate({ templateIndex }) {
  const templates = [
    { id: 'modern', name: 'Modern', emoji: '🎨' },
    { id: 'minimal', name: 'Minimal', emoji: '⚪' },
    { id: 'newsletter', name: 'Newsletter', emoji: '📰' },
    { id: 'promotional', name: 'Promotional', emoji: '🎯' },
    { id: 'welcome', name: 'Welcome', emoji: '👋' },
    { id: 'transactional', name: 'Transactional', emoji: '📋' },
    { id: 'event', name: 'Event', emoji: '🎪' },
    { id: 'product', name: 'Product', emoji: '📦' },
    { id: 'corporate', name: 'Corporate', emoji: '🏢' },
    { id: 'creative', name: 'Creative', emoji: '🎭' }
  ];
  
  const template = templates[templateIndex] || templates[0];
  
  return (
    <div className="relative p-3 border rounded-lg bg-gray-50 opacity-75">
      <div className="text-center">
        <div className="text-2xl mb-1">{template.emoji}</div>
        <div className="text-sm font-medium text-gray-600">{template.name}</div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
        <div className="bg-white rounded-full p-2 shadow-lg">
          <Lock className="h-4 w-4 text-gray-600" />
        </div>
      </div>
      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
        Premium
      </Badge>
    </div>
  );
}

// Upgrade prompt component
function UpgradePrompt({ feature, requiredTier }) {
  const { getTierConfig } = useAuth();
  const tierConfig = getTierConfig(requiredTier);
  
  const getFeatureMessage = () => {
    switch (feature) {
      case 'template':
        return 'Access all premium templates';
      case 'download':
        return 'Download your email templates';
      case 'save':
        return 'Save and edit your mailers';
      default:
        return 'Unlock this feature';
    }
  };
  
  const getTierIcon = (tier) => {
    switch (tier) {
      case 'bronze': return <Zap className="h-4 w-4" />;
      case 'gold': return <Star className="h-4 w-4" />;
      case 'platinum': return <Crown className="h-4 w-4" />;
      default: return <Crown className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-6 w-6 text-orange-600" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{getFeatureMessage()}</h3>
        <p className="text-gray-600 mb-4">
          Upgrade to {tierConfig.name} to unlock this feature and more!
        </p>
        <div className="space-y-3">
          <Link to="/pricing">
            <Button className="w-full">
              {getTierIcon(requiredTier)}
              <span className="ml-2">Upgrade to {tierConfig.name}</span>
              <span className="ml-2 font-bold">
                {PaymentService.formatCurrency(tierConfig.price)}
              </span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <p className="text-xs text-gray-500">
            {tierConfig.features.slice(0, 2).join(' • ')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Upgrade options for download gate
function UpgradeOptions({ onUpgrade }) {
  const { getTierConfig, userProfile } = useAuth();
  
  const getNextTier = () => {
    switch (userProfile?.subscriptionTier) {
      case 'free':
      case 'bronze':
        return 'gold';
      case 'gold':
        return 'platinum';
      default:
        return 'gold';
    }
  };
  
  const nextTier = getNextTier();
  const tierConfig = getTierConfig(nextTier);
  
  return (
    <div className="space-y-3">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">
          Get {tierConfig.downloads} downloads with {tierConfig.name}
        </p>
        <div className="text-lg font-bold text-green-600">
          {PaymentService.formatCurrency(tierConfig.price)}
          {tierConfig.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {PaymentService.formatCurrency(tierConfig.originalPrice)}
            </span>
          )}
        </div>
        {tierConfig.originalPrice && (
          <p className="text-xs text-green-600">
            Save {PaymentService.formatCurrency(tierConfig.originalPrice - tierConfig.price)}!
          </p>
        )}
      </div>
      
      <Link to="/pricing">
        <Button className="w-full">
          <Crown className="h-4 w-4 mr-2" />
          Upgrade Now
        </Button>
      </Link>
    </div>
  );
}

// Usage progress component
export function UsageProgress() {
  const { userProfile, getTierConfig, getRemainingDownloads } = useAuth();
  
  if (!userProfile) return null;
  
  const currentTier = getTierConfig();
  const remainingDownloads = getRemainingDownloads();
  const usagePercentage = currentTier.downloads > 0 
    ? ((userProfile.downloadsUsed / currentTier.downloads) * 100) 
    : 0;
  
  if (currentTier.downloads === 0) return null;
  
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = remainingDownloads === 0;
  
  return (
    <Card className={`${isAtLimit ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-orange-200 bg-orange-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Downloads Used</span>
          <span className="text-sm text-gray-600">
            {userProfile.downloadsUsed} / {currentTier.downloads}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className={`h-2 rounded-full transition-all ${
              isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-orange-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          ></div>
        </div>
        
        {isAtLimit ? (
          <div className="text-center">
            <p className="text-sm text-red-700 mb-2">Download limit reached!</p>
            <Link to="/pricing">
              <Button size="sm" className="w-full">
                Upgrade for More Downloads
              </Button>
            </Link>
          </div>
        ) : isNearLimit ? (
          <div className="text-center">
            <p className="text-sm text-orange-700 mb-2">
              {remainingDownloads} downloads remaining
            </p>
            <Link to="/pricing">
              <Button size="sm" variant="outline" className="w-full">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-600 text-center">
            {remainingDownloads} downloads remaining
          </p>
        )}
      </CardContent>
    </Card>
  );
}

