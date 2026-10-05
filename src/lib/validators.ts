import { z } from 'zod';

export const CheckoutSchema = z.object({
  customerName: z.string().min(2, 'Full name must be at least 2 characters'),
  customerEmail: z.string().email('Please enter a valid email address'),
  customerPhone: z.string().min(7, 'Please provide a valid contact number'),
  shippingAddress: z.object({
    street: z.string().min(3, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State or province is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ).min(1, 'Cart cannot be empty'),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;

export const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});
