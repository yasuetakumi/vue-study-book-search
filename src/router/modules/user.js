import Form from '@views/main/user/Form';
import Datatable from '@views/main/user/Datatable';

const usersRoutes = [
  {
    path: 'users',
    name: 'users',
    component: Datatable,
  },
  {
    path: 'users/create',
    name: 'users.create',
    component: Form,
  },
  {
    path: 'users/:id/edit',
    name: 'users.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default usersRoutes;
