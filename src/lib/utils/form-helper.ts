
import type { SubmitFunction } from '@sveltejs/kit';

export function formHeaderRequest(input: Parameters<SubmitFunction>[0]) {
	return new Promise<XMLHttpRequest>((resolve) => {
		const xhr = new XMLHttpRequest();

		xhr.upload.onprogress = function (event) {
			// progress = Math.round((100 * event.loaded) / event.total);
		};

		xhr.onload = function () {
			if (xhr.readyState === xhr.DONE) {
				// progress = 0;
				resolve(xhr);
			}
		};

		xhr.open('POST', input.action, true);
		xhr.send(input.formData);
	});
}

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;

	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			func(...args);
		}, wait);
	};
}