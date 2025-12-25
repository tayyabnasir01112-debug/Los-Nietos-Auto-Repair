/**
 * Get the API base path based on environment
 * In development, uses /api
 * In production (Netlify), uses /.netlify/functions
 */
export function getApiBasePath(): string {
  // Check if we're on Netlify (production)
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on Netlify domain
    const hostname = window.location.hostname;
    if (hostname.includes('netlify.app') || hostname.includes('netlify.com')) {
      return '/.netlify/functions';
    }
  }
  
  // For development or non-Netlify deployments, use /api
  // This allows local development to still work with the Express server
  return '/api';
}

/**
 * Build full API URL from path
 */
export function buildApiUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Map API paths to Netlify function names
  const functionMap: Record<string, string> = {
    'api/contact': 'contact',
    'api/services': 'services',
    'api/testimonials': 'testimonials',
  };
  
  const functionName = functionMap[cleanPath] || cleanPath.replace('api/', '');
  const basePath = getApiBasePath();
  
  // For Netlify Functions, the path is /.netlify/functions/{functionName}
  // For regular API, it's /api/{path}
  if (basePath === '/.netlify/functions') {
    return `${basePath}/${functionName}`;
  }
  
  return `/${cleanPath}`;
}

