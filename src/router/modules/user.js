import Form from '@views/main/user/Form';
import Datatable from '@views/main/user/Datatable';

const usersRoutes = [
  {
    path: 'users',
    name: 'users',
    component: Datatable,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
  },
  {
    path: 'users/create',
    name: 'users.create',
    component: Form,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
  },
  {
    path: 'users/:id/edit',
    name: 'users.edit',
    component: Form,
    meta: {
      editPage: true,
      requiresAuth: true,
    },
  },
];

export default usersRoutes;
