import { z } from 'zod';

export const registerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name cannot exceed 100 characters')
		.regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),

	email: z
		.string({ required_error: 'Email is required' })
		.email('Please enter a valid email address')
		.min(5, 'Email must be at least 5 characters')
		.max(255, 'Email cannot exceed 255 characters')
		.toLowerCase()
		.transform(email => email.trim()),
	ssn_photo: z
		.instanceof(File, { message: 'SSN Photo is required' })
		.refine((file) => file.size > 0, 'SSN Photo cannot be empty')
		.refine((file) => file.size <= 5_000_000, 'SSN Photo must be less than 5MB')
		.refine(
			(file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'SSN Photo must be a JPEG, PNG, or WebP image'
		),
	passport_photo: z
		.instanceof(File, { message: 'Passport Photo is required' })
		.refine((file) => file.size > 0, 'Passport Photo cannot be empty')
		.refine((file) => file.size <= 5_000_000, 'Passport Photo must be less than 5MB')
		.refine(
			(file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
			'Passport Photo must be a JPEG, PNG, or WebP image'
		),
	// phone: z
	// 	.string()
	// 	.optional()
	// 	.refine(
	// 		(phone) => !phone || /^\+?[\d\s\-\(\)]+$/.test(phone),
	// 		'Please enter a valid phone number'
	// 	),
	// termsAccepted: z
	// 	.boolean()
	// 	.refine((accepted) => accepted === true, 'You must accept the terms and conditions')
	// 	.optional()
	// 	.default(false)
});
export const contactSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name cannot exceed 100 characters')
		.regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
	email: z
		.string({ required_error: 'Email is required' })
		.email('Please enter a valid email address')
		.min(5, 'Email must be at least 5 characters')
		.max(255, 'Email cannot exceed 255 characters')
		.toLowerCase()
		.transform(email => email.trim()),
	subject: z
		.string({ required_error: 'Subject is required' })
		.min(15, 'Subject must be at least 15 characters')
		.max(100, 'Subject cannot exceed 200 characters'),
	message: z
		.string({ required_error: 'Message is required' })
		.min(25, 'Message must be at least 25 characters')
		.max(1000, 'Message cannot exceed 1000 characters'),
})
export const unsubscribeSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Please enter a valid email address')
		.min(5, 'Email must be at least 5 characters')
		.max(255, 'Email cannot exceed 255 characters')
		.toLowerCase()
		.transform(email => email.trim()),
})

export type RegisterSchema = z.infer<typeof registerSchema>;
export type ContactSchema = z.infer<typeof contactSchema>;
export type UnsubscribeSchema = z.infer<typeof unsubscribeSchema>;