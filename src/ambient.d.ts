
declare global {
	type ToastMessage = {
		id: string;
		message: string;
		type: 'success' | 'error' | 'warning' | 'info';
		duration?: number;
	}
	type MailerOptions = {
		to: string | string[];
		from: string;
		subject: string;
		text?: string;
		html?: string;
		attachments?: Attachment[];
		cc?: string | string[];
		bcc?: string | string[];
		replyTo?: string;
	}
	interface UserData {
		id?: string;
		name?: string;
		email?: string;
		[key: string]: any; // Untuk data tambahan lainnya
	}
	interface Attachment {
		filename: string;
		path?: string;
		content?: Buffer | string;
		contentType?: string;
		cid?: string; // Content-ID untuk inline images
	}
	interface TemplateVariables {
		[key: string]: any;
	}
	type TemplateMailOptions = {
		to: string | string[];
		from: string;
		subject: string;
		templatePath: string;
		templateVariables?: TemplateVariables;
		attachments?: Attachment[];
		cc?: string | string[];
		bcc?: string | string[];
		replyTo?: string;
	}
	type TextMailOptions = {
		to: string | string[];
		from: string;
		subject: string;
		message: string;
		userData?: UserData;
		attachments?: Attachment[];
		cc?: string | string[];
		bcc?: string | string[];
		replyTo?: string;
	}
	interface QueuedEmail {
		id: string;
		options: any;
		priority: number;
		retryCount: number;
		scheduledFor: number;
	}
}

export { }