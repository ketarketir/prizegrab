export class EmailValidator {
	static isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	static validateEmailList(emails: string | string[]): string[] {
		const emailArray = Array.isArray(emails) ? emails : [emails];
		const validEmails: string[] = [];
		const invalidEmails: string[] = [];

		emailArray.forEach(email => {
			const trimmedEmail = email.trim();
			if (this.isValidEmail(trimmedEmail)) {
				validEmails.push(trimmedEmail);
			} else {
				invalidEmails.push(trimmedEmail);
			}
		});

		if (invalidEmails.length > 0) {
			throw new Error(`Invalid email addresses: ${invalidEmails.join(', ')}`);
		}

		return validEmails;
	}

	static validateFileType(filename: string, allowedTypes: string[]): boolean {
		const extension = filename.toLowerCase().split('.').pop();
		if (!extension) return false;

		// Map extensions to MIME types
		const mimeTypeMap: { [key: string]: string } = {
			// Images
			'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'png': 'image/png',
			'gif': 'image/gif', 'webp': 'image/webp', 'svg': 'image/svg+xml',
			// Documents
			'pdf': 'application/pdf', 'doc': 'application/msword',
			'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'xls': 'application/vnd.ms-excel',
			'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'ppt': 'application/vnd.ms-powerpoint',
			'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			// Text
			'txt': 'text/plain', 'csv': 'text/csv', 'json': 'application/json',
			// Archives
			'zip': 'application/zip', 'rar': 'application/x-rar-compressed',
			'7z': 'application/x-7z-compressed',
			// Media
			'mp4': 'video/mp4', 'avi': 'video/avi', 'mov': 'video/mov', 'wmv': 'video/wmv',
			'mp3': 'audio/mp3', 'wav': 'audio/wav', 'ogg': 'audio/ogg',
		};

		const mimeType = mimeTypeMap[extension];
		return mimeType ? allowedTypes.includes(mimeType) : false;
	}

	static validateFileSize(fileSize: number, maxSize: number): boolean {
		return fileSize <= maxSize;
	}
}