import { SMTP_PASS, SMTP_USER, APP_NAME } from "$env/static/private";

export const EMAIL_CONFIG = {
	// SMTP Settings
	SMTP: {
		SERVICE: "gmail", // or "outlook", "yahoo", etc.
		HOST: "smtp.gmail.com",
		PORT: 587,
		SECURE: false, // true for 465, false for other ports
	},

	// Default sender info
	DEFAULT_SENDER: {
		NAME: APP_NAME,
		EMAIL: SMTP_USER,
	},

	// Template paths
	TEMPLATES: {
		WELCOME: "../templates/welcome.html",
		NEWSLETTER: "../templates/newsletter.html",
		INVOICE: "../templates/invoice.html",
		PASSWORD_RESET: "../templates/password-reset.html",
		ORDER_CONFIRMATION: "../templates/order-confirmation.html",
	},

	// File upload limits
	ATTACHMENT_LIMITS: {
		MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
		MAX_FILES: 10,
		ALLOWED_TYPES: [
			// Images
			'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
			// Documents
			'application/pdf', 'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.ms-powerpoint',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			// Text files
			'text/plain', 'text/csv', 'application/json',
			// Archives
			'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed',
			// Audio/Video
			'video/mp4', 'video/avi', 'video/mov', 'video/wmv',
			'audio/mp3', 'audio/wav', 'audio/ogg',
		]
	},

	// Rate limiting
	RATE_LIMITS: {
		EMAILS_PER_MINUTE: 10,
		EMAILS_PER_HOUR: 100,
		BULK_EMAIL_DELAY: 1000, // ms between bulk emails
	}
};