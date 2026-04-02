import { z } from 'zod';

export const profileSchema = z.object({
    banner: z.string(),
    profilePicture: z.string(),
    bio: z.string().max(220),
    about: z.string().max(2000),
    featured: z.array(z.string()).length(3),
});