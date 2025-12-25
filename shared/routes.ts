import { z } from 'zod';
import { insertInquirySchema, inquiries, services, testimonials } from './schema';
import { buildApiUrl } from './api-utils';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// Base API paths (these will be converted by buildApiUrl on the client)
export const apiPaths = {
  contact: '/api/contact',
  services: '/api/services',
  testimonials: '/api/testimonials',
};

// Helper to get the actual API URL (works on client-side)
export function getApiUrl(basePath: string): string {
  if (typeof window !== 'undefined') {
    return buildApiUrl(basePath);
  }
  return basePath;
}

export const api = {
  contact: {
    submit: {
      method: 'POST' as const,
      get path() { return getApiUrl(apiPaths.contact); },
      input: insertInquirySchema,
      responses: {
        200: z.object({ message: z.string() }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  services: {
    list: {
      method: 'GET' as const,
      get path() { return getApiUrl(apiPaths.services); },
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
  },
  testimonials: {
    list: {
      method: 'GET' as const,
      get path() { return getApiUrl(apiPaths.testimonials); },
      responses: {
        200: z.array(z.custom<typeof testimonials.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ContactInput = z.infer<typeof api.contact.submit.input>;
