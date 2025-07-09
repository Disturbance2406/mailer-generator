import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'

export default function ContentEditor({ content, onContentChange }) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="footer">Footer</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Email Subject</Label>
          <Input
            id="subject"
            placeholder="Enter email subject line"
            value={content.subject}
            onChange={(e) => onContentChange('subject', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preheader">Preheader Text</Label>
          <Input
            id="preheader"
            placeholder="Preview text that appears after subject"
            value={content.preheader}
            onChange={(e) => onContentChange('preheader', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Main Title</Label>
          <Input
            id="title"
            placeholder="Main headline of your email"
            value={content.title}
            onChange={(e) => onContentChange('title', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            placeholder="Supporting headline or tagline"
            value={content.subtitle}
            onChange={(e) => onContentChange('subtitle', e.target.value)}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="content" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="body">Main Content</Label>
          <Textarea
            id="body"
            placeholder="Write your email content here..."
            className="min-h-[120px]"
            value={content.body}
            onChange={(e) => onContentChange('body', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ctaText">Call-to-Action Text</Label>
            <Input
              id="ctaText"
              placeholder="Button text"
              value={content.ctaText}
              onChange={(e) => onContentChange('ctaText', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">Call-to-Action URL</Label>
            <Input
              id="ctaUrl"
              placeholder="https://example.com"
              value={content.ctaUrl}
              onChange={(e) => onContentChange('ctaUrl', e.target.value)}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="footer" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Your Company Name"
            value={content.companyName}
            onChange={(e) => onContentChange('companyName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Input
            id="companyAddress"
            placeholder="123 Main St, City, State 12345"
            value={content.companyAddress}
            onChange={(e) => onContentChange('companyAddress', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="footerText">Footer Message</Label>
          <Textarea
            id="footerText"
            placeholder="Additional footer content..."
            className="min-h-[80px]"
            value={content.footerText}
            onChange={(e) => onContentChange('footerText', e.target.value)}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}

