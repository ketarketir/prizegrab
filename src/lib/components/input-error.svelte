<script lang="ts" module>
	import type { ClassValue } from 'svelte/elements';

	interface Props {
		class?: ClassValue | null;
		children: Snippet<[]> | undefined;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	let { class: className, children }: Props = $props();
</script>

<div>
	<p class={cn('text-xs text-red-600 dark:text-red-500', className)}>
		{@render children?.()}
	</p>
</div>
