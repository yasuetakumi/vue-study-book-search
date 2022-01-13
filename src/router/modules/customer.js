import Form from '@views/main/customer/Form';
import Datatable from '@views/main/customer/Datatable';

const customersRoutes = [
  {
    path: 'customers',
    name: 'customers',
    component: Datatable,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: 'customers/create',
    name: 'customers.create',
    component: Form,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: 'customers/:id/edit',
    name: 'customers.edit',
    component: Form,
    meta: {
      editPage: true,
      requiresAuth: true,
    },
  },
];

export default customersRoutes;
