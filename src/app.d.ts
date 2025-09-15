import type { NodemailerService } from './lib/server/nodemailer';
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string;
		}
		interface Locals {
			nodemailer: NodemailerService
		}
		interface PageData {
			success?: boolean;
			errors?: {
				code: string;
				message: string;
				details?: any;
			};
			messages?: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
