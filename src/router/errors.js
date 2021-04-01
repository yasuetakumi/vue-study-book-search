import ErrorNotFound from '@views/error/ErrorNotFound';
import ErrorUnexpected from '@views/error/ErrorUnexpected';
const errors = [
  {
    path: '/404',
    name: 'errorNotFound',
    component: ErrorNotFound,
  },
  {
    path: '/500',
    name: 'errorUnexpected',
    component: ErrorUnexpected,
  },
];

export default errors;
