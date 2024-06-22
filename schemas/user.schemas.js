import { z } from 'zod'

export const userSignupSchema = z
	.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8).max(20),
		confirmPassword: z.string().min(8).max(20),
	})
	.refine((data) => data.password == data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
