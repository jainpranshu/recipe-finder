// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelteHTML {
		interface IntrinsicElements {
			'recipe-card': {
				'recipe-id'?: string;
				'recipe-title'?: string;
				image?: string;
				category?: string;
				favorited?: boolean;
				oncardSelect?: (event: CustomEvent<string>) => void;
				onfavoriteToggle?: (event: CustomEvent<string>) => void;
			};
			'ui-badge': {
				label?: string;
				tone?: 'neutral' | 'success' | 'warning' | 'danger';
			};
			'ui-dialog': {
				open?: boolean;
				'dialog-title'?: string;
				ondialogClose?: (event: CustomEvent<void>) => void;
			};
			'day-slot': {
				day?: string;
				'recipe-title'?: string;
				'recipe-image'?: string;
				onaddMeal?: (event: CustomEvent<void>) => void;
				onremoveMeal?: (event: CustomEvent<void>) => void;
			};
		}
	}
}

export {};
