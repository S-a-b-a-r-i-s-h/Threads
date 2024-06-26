import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().min(1),
    name: z.string().min(3).max(20),
    username: z.string().min(3).max(20),
    bio: z.string().min(5).max(100),
})

export const PostImageValidation = z.object({
    image: z.string().url().min(1),
})