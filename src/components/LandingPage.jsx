import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Zap, 
  Star, 
  Crown, 
  Check, 
  ArrowRight, 
  Sparkles,
  Users,
  Globe,
  Shield,
  Clock,
  Palette,
  Download,
  Eye,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PaymentService from './payment/PaymentService';

export default function LandingPage() {
  const features = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "10+ Professional Templates",
      description: "Choose from modern, minimal, newsletter, promotional, and more email templates"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "See your email design in real-time as you customize colors, text, and images"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "MJML-Powered",
      description: "Generate clean, responsive HTML that works perfectly in all email clients"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Instant Export",
      description: "Download your email templates as HTML files ready for Mailchimp, Gmail, and more"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Mobile Responsive",
      description: "All templates automatically adapt to desktop, tablet, and mobile devices"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Email Client Compatible",
      description: "Tested and optimized for Gmail, Outlook, Apple Mail, and other major clients"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      company: "TechStart SA",
      content: "Mailer Generator saved us hours of design work. The templates are beautiful and work perfectly in all email clients.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      company: "Cape Town Cafe",
      content: "As a non-designer, I was able to create professional newsletters that increased our customer engagement by 40%.",
      rating: 5
    },
    {
      name: "Lisa Patel",
      role: "Digital Agency Founder",
      company: "Pixel Perfect",
      content: "We use Mailer Generator for all our client campaigns. The Gold plan gives us everything we need at an amazing price.",
      rating: 5
    }
  ];

  const pricingHighlight = [
    {
      tier: 'free',
      name: 'Free',
      price: 0,
      description: 'Perfect for trying out',
      features: ['2 Basic Templates', 'Full Customization', 'Live Preview'],
      cta: 'Start Free',
      popular: false
    },
    {
      tier: 'bronze',
      name: 'Bronze',
      price: 1200,
      description: 'One-time campaign',
      features: ['All 10+ Templates', '1 HTML Download', 'Email Support'],
      cta: 'Get Bronze',
      popular: false
    },
    {
      tier: 'gold',
      name: 'Gold',
      price: 4000,
      originalPrice: 6000,
      description: 'Growing businesses',
      features: ['All Templates', '5 HTML Downloads', 'Save & Edit', 'Priority Support'],
      cta: 'Get Gold',
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mailer Generator by AvenueHaus</h1>
                <p className="text-sm text-gray-600">Professional Email Templates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Trusted by 1000+ South African Businesses
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Professional
            <span className="text-blue-600 block">Email Templates</span>
            in Minutes
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Generate beautiful, responsive email templates with our powerful MJML-based editor. 
            Compatible with Mailchimp, Gmail, Outlook, and all major email platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="px-8 py-4 text-lg">
                Start Free - No Credit Card Required
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/editor">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                Try Demo
                <Eye className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No Setup Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Mobile Responsive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Amazing Emails
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our powerful editor combines ease of use with professional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and upgrade as you grow. All prices in South African Rands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingHighlight.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'ring-2 ring-yellow-400 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    {plan.price === 0 ? (
                      <div className="text-3xl font-bold">Free</div>
                    ) : (
                      <div>
                        <div className="text-3xl font-bold">
                          {PaymentService.formatCurrency(plan.price)}
                        </div>
                        {plan.originalPrice && (
                          <div className="text-lg text-gray-500 line-through">
                            {PaymentService.formatCurrency(plan.originalPrice)}
                          </div>
                        )}
                        <div className="text-sm text-gray-600">One-time payment</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-sm">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to={plan.tier === 'free' ? '/signup' : '/pricing'}>
                    <Button 
                      className={`w-full mt-6 ${
                        plan.popular ? 'bg-yellow-600 hover:bg-yellow-700' : ''
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View All Plans & Features
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Businesses Across South Africa
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about Mailer Generator
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Your First Professional Email?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of South African businesses creating beautiful email campaigns with Mailer Generator
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Start Free - No Credit Card Required
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                View Pricing
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm opacity-75">
            <p>✓ 2 free templates forever ✓ No setup required ✓ Instant download</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Mailer Generator</span>
              </div>
              <p className="text-gray-400 text-sm">
                Create professional email templates in minutes. Built for South African businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <Link to="/pricing" className="block hover:text-white">Pricing</Link>
                <Link to="/editor" className="block hover:text-white">Demo</Link>
                <Link to="/signup" className="block hover:text-white">Sign Up</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white">Help Center</a>
                <a href="#" className="block hover:text-white">Contact Us</a>
                <a href="#" className="block hover:text-white">Email Support</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="#" className="block hover:text-white">Privacy Policy</a>
                <a href="#" className="block hover:text-white">Terms of Service</a>
                <a href="#" className="block hover:text-white">Refund Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Mailer Generator by AvenueHaus. All rights reserved. System developed by Aventor Labs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

