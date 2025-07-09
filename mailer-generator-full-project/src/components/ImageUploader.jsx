import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

export default function ImageUploader({ onImageUpload, uploadedImages }) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'))
    
    const processedImages = imageFiles.map(file => {
      const url = URL.createObjectURL(file)
      return {
        id: Date.now() + Math.random(),
        file,
        url,
        name: file.name,
        size: file.size
      }
    })
    
    onImageUpload(processedImages)
  }

  const removeImage = (imageId) => {
    const updatedImages = uploadedImages.filter(img => img.id !== imageId)
    // Clean up object URLs
    const removedImage = uploadedImages.find(img => img.id === imageId)
    if (removedImage) {
      URL.revokeObjectURL(removedImage.url)
    }
    onImageUpload(updatedImages.map(img => ({ ...img })))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed transition-colors cursor-pointer ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop images here or click to upload
          </p>
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, GIF up to 10MB each
          </p>
          <Button variant="outline" className="mt-4">
            <ImageIcon className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Uploaded Images</h4>
          <div className="grid grid-cols-2 gap-3">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="relative group">
                <CardContent className="p-3">
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-2">
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    <p className="truncate font-medium">{image.name}</p>
                    <p>{formatFileSize(image.size)}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeImage(image.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

