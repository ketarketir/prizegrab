import { EMAIL_CONFIG } from './email-config';


export class EmailQueue {
	private queue: QueuedEmail[] = [];
	private processing = false;

	add(emailOptions: any, priority = 1, delay = 0): string {
		const id = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		this.queue.push({
			id,
			options: emailOptions,
			priority,
			retryCount: 0,
			scheduledFor: Date.now() + delay
		});

		// Sort by priority (higher number = higher priority)
		this.queue.sort((a, b) => b.priority - a.priority);

		if (!this.processing) {
			this.process();
		}

		return id;
	}

	private async process() {
		if (this.processing || this.queue.length === 0) return;

		this.processing = true;

		while (this.queue.length > 0) {
			const email = this.queue[0];

			// Check if email is scheduled for future
			if (email.scheduledFor > Date.now()) {
				await new Promise(resolve =>
					setTimeout(resolve, email.scheduledFor - Date.now())
				);
			}

			try {
				// Process email here - you would call your NodemailerService
				console.log(`Processing email ${email.id}`);

				// Remove from queue after successful send
				this.queue.shift();

				// Add delay between emails to avoid rate limits
				await new Promise(resolve =>
					setTimeout(resolve, EMAIL_CONFIG.RATE_LIMITS.BULK_EMAIL_DELAY)
				);

			} catch (error) {
				console.error(`Failed to send email ${email.id}:`, error);

				// Retry logic
				email.retryCount++;
				if (email.retryCount < 3) {
					email.scheduledFor = Date.now() + (email.retryCount * 60000); // Exponential backoff
					this.queue.push(this.queue.shift()!); // Move to end of queue
				} else {
					console.error(`Giving up on email ${email.id} after 3 retries`);
					this.queue.shift(); // Remove failed email
				}
			}
		}

		this.processing = false;
	}

	getQueueStatus() {
		return {
			totalEmails: this.queue.length,
			processing: this.processing,
			nextEmail: this.queue[0]?.scheduledFor,
		};
	}
}