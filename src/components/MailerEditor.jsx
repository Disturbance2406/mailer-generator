import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Download, 
  Eye, 
  Upload, 
  Save,
  ArrowLeft,
  Crown,
  Lock,
  Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FeatureGate, TemplateGate, DownloadGate, UsageProgress } from './FeatureGate';
import { generateMJMLEmail } from '../lib/mjmlGenerator';

export default function MailerEditor() {
  const { userProfile, canAccessTemplate, canDownload, incrementDownloadUsage } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [emailData, setEmailData] = useState({
    subject: '',
    title: '',
    content: '',
    ctaText: 'Learn More',
    ctaUrl: '#',
    images: []
  });
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [activeTab, setActiveTab] = useState('templates');

  const templates = [
    { id: 'modern', name: 'Modern', emoji: '🎨', description: 'Clean and contemporary design' },
    { id: 'minimal', name: 'Minimal', emoji: '⚪', description: 'Simple and elegant layout' },
    { id: 'newsletter', name: 'Newsletter', emoji: '📰', description: 'Perfect for regular updates' },
    { id: 'promotional', name: 'Promotional', emoji: '🎯', description: 'Drive sales and conversions' },
    { id: 'welcome', name: 'Welcome', emoji: '👋', description: 'Greet new subscribers' },
    { id: 'transactional', name: 'Transactional', emoji: '📋', description: 'Order confirmations and receipts' },
    { id: 'event', name: 'Event', emoji: '🎪', description: 'Promote events and webinars' },
    { id: 'product', name: 'Product', emoji: '📦', description: 'Showcase products and features' },
    { id: 'corporate', name: 'Corporate', emoji: '🏢', description: 'Professional business communication' },
    { id: 'creative', name: 'Creative', emoji: '🎭', description: 'Bold and artistic designs' }
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEmailData(prev => ({
          ...prev,
          images: [...prev.images, {
            name: file.name,
            url: e.target.result,
            file: file
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const generateEmail = () => {
    try {
      const template = templates[selectedTemplate];
      const html = generateMJMLEmail(template.id, {
        subject: emailData.subject,
        title: emailData.title,
        body: emailData.content,
        ctaText: emailData.ctaText,
        ctaUrl: emailData.ctaUrl
      }, emailData.images);
      setGeneratedHTML(html);
    } catch (error) {
      console.error('Email generation failed:', error);
    }
  };

  const downloadHTML = async () => {
    if (!canDownload()) {
      return;
    }

    try {
      // Increment usage
      await incrementDownloadUsage();
      
      // Create and download file
      const blob = new Blob([generatedHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${emailData.subject || 'email-template'}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Mailer Generator by AvenueHaus</h1>
                  <p className="text-sm text-gray-600">Create professional email templates</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800">
                {userProfile?.displayName}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Usage Progress */}
            <UsageProgress />

            {/* Tab Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'templates'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Palette className="h-4 w-4 inline mr-2" />
                    Templates
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'content'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Mail className="h-4 w-4 inline mr-2" />
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('images')}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'images'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Upload className="h-4 w-4 inline mr-2" />
                    Images
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Templates Tab */}
                {activeTab === 'templates' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Choose Template</Label>
                      <p className="text-xs text-gray-600 mb-3">
                        Select from our professional email templates
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {templates.map((template, index) => (
                        <TemplateGate key={index} templateIndex={index}>
                          <button
                            onClick={() => setSelectedTemplate(index)}
                            className={`p-3 border rounded-lg text-center transition-all hover:shadow-md ${
                              selectedTemplate === index
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{template.emoji}</div>
                            <div className="text-sm font-medium text-gray-900">{template.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{template.description}</div>
                          </button>
                        </TemplateGate>
                      ))}
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter email subject"
                        value={emailData.subject}
                        onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Main Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter main title"
                        value={emailData.title}
                        onChange={(e) => setEmailData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Main Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Enter your email content..."
                        rows={6}
                        value={emailData.content}
                        onChange={(e) => setEmailData(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ctaText">Call-to-Action Text</Label>
                      <Input
                        id="ctaText"
                        placeholder="e.g., Learn More, Shop Now"
                        value={emailData.ctaText}
                        onChange={(e) => setEmailData(prev => ({ ...prev, ctaText: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ctaUrl">Call-to-Action URL</Label>
                      <Input
                        id="ctaUrl"
                        placeholder="https://example.com"
                        value={emailData.ctaUrl}
                        onChange={(e) => setEmailData(prev => ({ ...prev, ctaUrl: e.target.value }))}
                      />
                    </div>
                  </div>
                )}

                {/* Images Tab */}
                {activeTab === 'images' && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Upload Images</Label>
                      <p className="text-xs text-gray-600 mb-3">
                        Add images to enhance your email template
                      </p>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag and drop images here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outline" size="sm" className="cursor-pointer">
                          Choose Files
                        </Button>
                      </label>
                    </div>
                    
                    {emailData.images.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Uploaded Images</Label>
                        <div className="space-y-2">
                          {emailData.images.map((image, index) => (
                            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                              <img src={image.url} alt={image.name} className="w-10 h-10 object-cover rounded" />
                              <span className="text-sm text-gray-700 flex-1">{image.name}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEmailData(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }))}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button onClick={generateEmail} className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Preview
                </Button>
                
                <DownloadGate>
                  <Button 
                    onClick={downloadHTML} 
                    variant="outline" 
                    className="w-full"
                    disabled={!generatedHTML}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download HTML
                  </Button>
                </DownloadGate>
                
                <FeatureGate feature="save">
                  <Button variant="outline" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                </FeatureGate>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Preview */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your email will look to recipients
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gray-100 p-4 h-96 lg:h-[600px] overflow-auto">
                  {generatedHTML ? (
                    <div className="bg-white rounded shadow-lg max-w-lg mx-auto">
                      <iframe
                        srcDoc={generatedHTML}
                        className="w-full h-full min-h-[500px] border-0"
                        title="Email Preview"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Preview Your Email</p>
                        <p className="text-sm">Click "Generate Preview" to see your email template</p>
                      </div>
                    </div>
                  )}
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

