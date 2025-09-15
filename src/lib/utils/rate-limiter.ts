export class RateLimiter {
	private static emailCounts: Map<string, { count: number; resetTime: number }> = new Map();

	static checkRateLimit(identifier: string, maxEmails: number, windowMs: number): boolean {
		const now = Date.now();
		const record = this.emailCounts.get(identifier);

		if (!record || now > record.resetTime) {
			// Reset or create new record
			this.emailCounts.set(identifier, {
				count: 1,
				resetTime: now + windowMs
			});
			return true;
		}

		if (record.count >= maxEmails) {
			return false; // Rate limit exceeded
		}

		record.count++;
		return true;
	}

	static getRemainingQuota(identifier: string, maxEmails: number): number {
		const record = this.emailCounts.get(identifier);
		if (!record || Date.now() > record.resetTime) {
			return maxEmails;
		}
		return Math.max(0, maxEmails - record.count);
	}
}