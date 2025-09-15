export class TemplateProcessor {
	/**
	 * Process template with advanced features
	 */
	static processAdvancedTemplate(template: string, variables: any): string {
		let processed = template;

		// Handle loops: {{#each items}} ... {{/each}}
		processed = this.processLoops(processed, variables);

		// Handle conditionals: {{#if condition}} ... {{/if}}
		processed = this.processConditionals(processed, variables);

		// Handle simple variables: {{variable}}
		processed = this.processVariables(processed, variables);

		// Handle formatting: {{variable|date}}, {{variable|currency}}
		processed = this.processFormatters(processed, variables);

		return processed;
	}

	private static processLoops(template: string, variables: any): string {
		const loopRegex = /{{#each\s+(\w+)}}([\s\S]*?){{\/each}}/g;

		return template.replace(loopRegex, (match, arrayName, content) => {
			const array = this.getNestedValue(variables, arrayName);
			if (!Array.isArray(array)) return '';

			return array.map((item, index) => {
				let itemContent = content;
				// Replace {{this}} with current item
				itemContent = itemContent.replace(/{{this}}/g, String(item));
				// Replace {{@index}} with current index
				itemContent = itemContent.replace(/{{@index}}/g, String(index));
				// Replace {{item.property}} with item properties
				if (typeof item === 'object' && item !== null) {
					Object.keys(item).forEach(key => {
						const regex = new RegExp(`{{${key}}}`, 'g');
						itemContent = itemContent.replace(regex, String(item[key] || ''));
					});
				}
				return itemContent;
			}).join('');
		});
	}

	private static processConditionals(template: string, variables: any): string {
		const conditionalRegex = /{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g;

		return template.replace(conditionalRegex, (match, condition, content) => {
			const value = this.getNestedValue(variables, condition);
			return value ? content : '';
		});
	}

	private static processVariables(template: string, variables: any): string {
		const variableRegex = /{{(\w+(?:\.\w+)*)}}/g;

		return template.replace(variableRegex, (match, path) => {
			const value = this.getNestedValue(variables, path);
			return String(value !== undefined ? value : '');
		});
	}

	private static processFormatters(template: string, variables: any): string {
		const formatterRegex = /{{(\w+(?:\.\w+)*)\|(\w+)(?:\(([^)]*)\))?}}/g;

		return template.replace(formatterRegex, (match, path, formatter, params) => {
			const value = this.getNestedValue(variables, path);
			return this.applyFormatter(value, formatter, params);
		});
	}

	private static getNestedValue(obj: any, path: string): any {
		return path.split('.').reduce((current, key) => {
			return current && current[key] !== undefined ? current[key] : undefined;
		}, obj);
	}

	private static applyFormatter(value: any, formatter: string, params?: string): string {
		if (value === undefined || value === null) return '';

		switch (formatter) {
			case 'date': {
				const date = new Date(value);
				return date.toLocaleDateString();
			}

			case 'datetime': {
				const datetime = new Date(value);
				return datetime.toLocaleString();
			}

			case 'currency': {
				const currency = params || 'USD';
				return new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: currency
				}).format(Number(value));
			}

			case 'number':
				return Number(value).toLocaleString();

			case 'uppercase':
				return String(value).toUpperCase();

			case 'lowercase':
				return String(value).toLowerCase();

			case 'capitalize':
				return String(value).charAt(0).toUpperCase() + String(value).slice(1);

			case 'truncate': {
				const length = params ? parseInt(params) : 50;
				const str = String(value);
				return str.length > length ? str.substring(0, length) + '...' : str;
			}

			default:
				return String(value);
		}
	}
}