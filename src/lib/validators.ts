import { z } from 'zod';

export const googleMapsUrlSchema = z
  .string()
  .min(1, 'Please paste a Google Maps URL')
  .refine(
    (val) =>
      val.includes('maps.google.com') ||
      val.includes('google.com/maps') ||
      val.includes('maps.app.goo.gl') ||
      val.includes('goo.gl/maps'),
    { message: "This doesn't look like a Google Maps link" }
  );

export const reviewSchema = z.object({
  authorName: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string(),
  time: z.number(),
});

export const reviewsResponseSchema = z.object({
  placeId: z.string(),
  name: z.string(),
  rating: z.number(),
  reviews: z.array(reviewSchema),
});

export const scoreResponseSchema = z.object({
  selectedReview: reviewSchema,
  caption: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;
export type ReviewsResponse = z.infer<typeof reviewsResponseSchema>;
export type ScoreResponse = z.infer<typeof scoreResponseSchema>;
export type Theme = 'dark' | 'light' | 'brand';
