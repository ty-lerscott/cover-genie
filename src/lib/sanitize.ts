export function sanitizeText(input: string): string {
    if (!input) return ""
  
    // Remove <script> tags and anything between them
    let sanitized = input.replace(/<script.*?>.*?<\/script>/gi, "")
  
    // Remove any remaining HTML tags
    sanitized = sanitized.replace(/<\/?[^>]+(>|$)/g, "")
  
    // Neutralize SQL control characters and comments
    sanitized = sanitized.replace(/['";`]/g, "")
    sanitized = sanitized.replace(/(--|\/\*|\*\/)/g, "")
    
    // Trim extra whitespace
    sanitized = sanitized.trim()
  
    return sanitized
}

export default sanitizeText;