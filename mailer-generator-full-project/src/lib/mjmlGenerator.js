// Browser-compatible email HTML generator
// Produces MJML-style responsive email HTML without requiring Node.js MJML

// Template configurations for different email styles
const templateConfigs = {
  modern: {
    backgroundColor: '#f8fafc',
    containerBackground: '#ffffff',
    primaryColor: '#3b82f6',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '8px'
  },
  minimal: {
    backgroundColor: '#ffffff',
    containerBackground: '#ffffff',
    primaryColor: '#000000',
    textColor: '#374151',
    headerFont: 'Georgia, serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '0px'
  },
  newsletter: {
    backgroundColor: '#f3f4f6',
    containerBackground: '#ffffff',
    primaryColor: '#059669',
    textColor: '#111827',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '6px'
  },
  promotional: {
    backgroundColor: '#fef3c7',
    containerBackground: '#ffffff',
    primaryColor: '#dc2626',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '12px'
  },
  welcome: {
    backgroundColor: '#ecfdf5',
    containerBackground: '#ffffff',
    primaryColor: '#10b981',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '8px'
  },
  transactional: {
    backgroundColor: '#f9fafb',
    containerBackground: '#ffffff',
    primaryColor: '#4f46e5',
    textColor: '#374151',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '4px'
  },
  event: {
    backgroundColor: '#fdf4ff',
    containerBackground: '#ffffff',
    primaryColor: '#a855f7',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '16px'
  },
  product: {
    backgroundColor: '#f0f9ff',
    containerBackground: '#ffffff',
    primaryColor: '#0ea5e9',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '8px'
  },
  corporate: {
    backgroundColor: '#f8fafc',
    containerBackground: '#ffffff',
    primaryColor: '#1e40af',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '4px'
  },
  creative: {
    backgroundColor: '#fef7ff',
    containerBackground: '#ffffff',
    primaryColor: '#c026d3',
    textColor: '#1f2937',
    headerFont: 'Arial, sans-serif',
    bodyFont: 'Arial, sans-serif',
    borderRadius: '20px'
  }
}

function generateEmailCSS(config) {
  return `
    <style>
      /* Reset styles for email clients */
      body, table, td, p, a, li, blockquote {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      
      /* Main styles */
      body {
        margin: 0 !important;
        padding: 0 !important;
        background-color: ${config.backgroundColor};
        font-family: ${config.bodyFont};
        font-size: 16px;
        line-height: 1.6;
        color: ${config.textColor};
      }
      
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: ${config.containerBackground};
        border-radius: ${config.borderRadius};
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .email-header {
        padding: 40px 30px 20px;
        text-align: center;
        background: linear-gradient(135deg, ${config.primaryColor}15, ${config.primaryColor}05);
      }
      
      .email-title {
        font-family: ${config.headerFont};
        font-size: 32px;
        font-weight: bold;
        color: ${config.primaryColor};
        margin: 0 0 10px;
        line-height: 1.2;
      }
      
      .email-subtitle {
        font-size: 18px;
        color: ${config.textColor};
        margin: 0 0 20px;
        opacity: 0.8;
      }
      
      .email-content {
        padding: 30px;
      }
      
      .email-text {
        font-size: 16px;
        line-height: 1.6;
        color: ${config.textColor};
        margin: 0 0 20px;
      }
      
      .email-images {
        margin: 30px 0;
        text-align: center;
      }
      
      .email-image {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 10px 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      
      .email-cta {
        text-align: center;
        margin: 40px 0;
      }
      
      .email-button {
        display: inline-block;
        background-color: ${config.primaryColor};
        color: #ffffff !important;
        text-decoration: none;
        padding: 16px 32px;
        border-radius: 6px;
        font-weight: bold;
        font-size: 16px;
        transition: background-color 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .email-button:hover {
        background-color: ${config.primaryColor}dd;
      }
      
      .email-footer {
        background-color: #f8f9fa;
        padding: 30px;
        text-align: center;
        border-top: 1px solid #e9ecef;
      }
      
      .email-footer-company {
        font-weight: bold;
        font-size: 16px;
        color: ${config.textColor};
        margin: 0 0 10px;
      }
      
      .email-footer-text {
        font-size: 14px;
        color: #6c757d;
        margin: 0 0 20px;
      }
      
      .email-footer-links {
        font-size: 12px;
        color: #adb5bd;
      }
      
      .email-footer-links a {
        color: #adb5bd;
        text-decoration: underline;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
          margin: 0 !important;
          border-radius: 0 !important;
        }
        
        .email-header {
          padding: 30px 20px 15px !important;
        }
        
        .email-title {
          font-size: 24px !important;
        }
        
        .email-subtitle {
          font-size: 16px !important;
        }
        
        .email-content {
          padding: 20px !important;
        }
        
        .email-footer {
          padding: 20px !important;
        }
        
        .email-button {
          padding: 14px 28px !important;
          font-size: 14px !important;
        }
      }
    </style>
  `
}

function generateEmailHTML(templateId, content, images) {
  const config = templateConfigs[templateId] || templateConfigs.modern
  
  const imageElements = images.map(image => 
    `<img src="${image.url}" alt="${image.name}" class="email-image" />`
  ).join('')

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>${content.subject || 'Email'}</title>
      ${generateEmailCSS(config)}
    </head>
    <body>
      <div style="padding: 20px; background-color: ${config.backgroundColor};">
        <div class="email-container">
          <!-- Header Section -->
          <div class="email-header">
            ${content.title ? `<h1 class="email-title">${content.title}</h1>` : ''}
            ${content.subtitle ? `<p class="email-subtitle">${content.subtitle}</p>` : ''}
          </div>
          
          <!-- Main Content Section -->
          <div class="email-content">
            ${content.body ? `
              <div class="email-text">
                ${content.body.split('\n').map(paragraph => 
                  paragraph.trim() ? `<p style="margin: 0 0 16px;">${paragraph}</p>` : ''
                ).join('')}
              </div>
            ` : ''}
            
            <!-- Images Section -->
            ${images.length > 0 ? `
              <div class="email-images">
                ${imageElements}
              </div>
            ` : ''}
            
            <!-- Call to Action Section -->
            ${content.ctaText ? `
              <div class="email-cta">
                <a href="${content.ctaUrl || '#'}" class="email-button">
                  ${content.ctaText}
                </a>
              </div>
            ` : ''}
          </div>
          
          <!-- Footer Section -->
          <div class="email-footer">
            ${content.companyName ? `
              <p class="email-footer-company">${content.companyName}</p>
            ` : ''}
            ${content.companyAddress ? `
              <p class="email-footer-text">${content.companyAddress}</p>
            ` : ''}
            ${content.footerText ? `
              <p class="email-footer-text">${content.footerText}</p>
            ` : ''}
            <div class="email-footer-links">
              <a href="#">Unsubscribe</a> | 
              <a href="#">Update Preferences</a> | 
              <a href="#">View in Browser</a>
            </div>
            <p style="margin: 20px 0 0; font-size: 11px; color: #adb5bd;">
              Template: ${templateId} | Generated with Mailer Generator
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export function generateMJMLEmail(templateId, content, images) {
  try {
    return generateEmailHTML(templateId, content, images)
  } catch (error) {
    console.error('Error generating email HTML:', error)
    throw new Error(`Failed to generate email: ${error.message}`)
  }
}

// Export the main function for direct use
export { generateEmailHTML }

