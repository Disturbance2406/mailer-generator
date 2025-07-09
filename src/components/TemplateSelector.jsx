import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with bold typography',
    preview: '🎨',
    category: 'Business'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with plenty of white space',
    preview: '⚪',
    category: 'Professional'
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Perfect for regular updates and news',
    preview: '📰',
    category: 'Content'
  },
  {
    id: 'promotional',
    name: 'Promotional',
    description: 'Eye-catching design for sales and offers',
    preview: '🎯',
    category: 'Marketing'
  },
  {
    id: 'welcome',
    name: 'Welcome',
    description: 'Warm and inviting for new subscribers',
    preview: '👋',
    category: 'Onboarding'
  },
  {
    id: 'transactional',
    name: 'Transactional',
    description: 'Professional layout for receipts and confirmations',
    preview: '📋',
    category: 'Business'
  },
  {
    id: 'event',
    name: 'Event',
    description: 'Dynamic design for event invitations',
    preview: '🎪',
    category: 'Events'
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Showcase products with beautiful imagery',
    preview: '📦',
    category: 'E-commerce'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional and trustworthy for business communications',
    preview: '🏢',
    category: 'Business'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic for creative industries',
    preview: '🎭',
    category: 'Creative'
  }
]

export default function TemplateSelector({ selectedTemplate, onTemplateChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card 
          key={template.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedTemplate === template.id 
              ? 'ring-2 ring-blue-500 bg-blue-50' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => onTemplateChange(template.id)}
        >
          <CardContent className="p-4">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{template.preview}</div>
              <h3 className="font-semibold text-sm">{template.name}</h3>
            </div>
            <p className="text-xs text-gray-600 text-center mb-2">
              {template.description}
            </p>
            <div className="flex justify-center">
              <Badge variant="secondary" className="text-xs">
                {template.category}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

