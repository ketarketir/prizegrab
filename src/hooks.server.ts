import { NodemailerService } from "@/server/nodemailer";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";


const initService: Handle = async ({ event, resolve }) => {
	event.locals.nodemailer = new NodemailerService(event)
	const response = await resolve(event);

	// Clean up nodemailer connection after request
	if (event.locals.nodemailer?.dispose) {
		try {
			await event.locals.nodemailer.dispose();
		} catch (error) {
			console.error('Error disposing nodemailer service:', error);
		}
	}

	return response;
}

export const handle: Handle = sequence(initService)