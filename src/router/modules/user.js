import Form from '@views/main/user/Form';
import Datatable from '@views/main/user/Datatable';

const user = [
  {
    path: 'user',
    name: 'user',
    component: Datatable,
  },
  {
    path: 'user/create',
    name: 'user.create',
    component: Form,
  },
  {
    path: 'user/:id/edit',
    name: 'user.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default user;
