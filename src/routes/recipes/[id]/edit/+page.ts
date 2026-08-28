import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
  if (!params.id.startsWith('user-')) {
    error(403, 'Only recipes you created can be edited.');
  }
  return { id: params.id };
};
