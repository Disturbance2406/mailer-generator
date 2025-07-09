import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Monitor, Smartphone, Tablet } from 'lucide-react'

export default function EmailPreview({ template, content, images, generatedHTML }) {
  const [viewMode, setViewMode] = useState('desktop')

  const getPreviewStyles = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: '375px', height: '600px' }
      case 'tablet':
        return { width: '768px', height: '600px' }
      default:
        return { width: '100%', height: '600px' }
    }
  }

  const renderPlaceholderPreview = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border h-full overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Email Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {content.title || 'Your Email Title'}
            </h1>
            {content.subtitle && (
              <p className="text-gray-600 mt-2">{content.subtitle}</p>
            )}
          </div>

          {/* Email Body */}
          <div className="space-y-4 mb-6">
            {content.body ? (
              <div className="prose prose-sm max-w-none">
                {content.body.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Add your email content to see it here...
              </p>
            )}
          </div>

          {/* Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {images.slice(0, 4).map((image) => (
                <div key={image.id} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          {content.ctaText && (
            <div className="text-center mb-6">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                {content.ctaText}
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="border-t pt-4 text-center text-sm text-gray-500">
            <p className="font-medium">{content.companyName || 'Your Company'}</p>
            <p>{content.companyAddress || 'Company Address'}</p>
            {content.footerText && (
              <p className="mt-2">{content.footerText}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Device Toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant={viewMode === 'desktop' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('desktop')}
        >
          <Monitor className="h-4 w-4 mr-1" />
          Desktop
        </Button>
        <Button
          variant={viewMode === 'tablet' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('tablet')}
        >
          <Tablet className="h-4 w-4 mr-1" />
          Tablet
        </Button>
        <Button
          variant={viewMode === 'mobile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('mobile')}
        >
          <Smartphone className="h-4 w-4 mr-1" />
          Mobile
        </Button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex justify-center">
        <div 
          className="border rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300"
          style={getPreviewStyles()}
        >
          {generatedHTML ? (
            <iframe
              srcDoc={generatedHTML}
              className="w-full h-full border-0"
              title="Email Preview"
            />
          ) : (
            renderPlaceholderPreview()
          )}
        </div>
      </div>

      {/* Template Info */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Template: <span className="font-medium capitalize">{template}</span></p>
        <p className="mt-1">
          {generatedHTML ? 'Generated with MJML' : 'Click "Generate Preview" to see MJML output'}
        </p>
      </div>
    </div>
  )
}

