import Form from '@views/main/customer/Form';
import Datatable from '@views/main/customer/Datatable';

const customersRoutes = [
  {
    path: 'customers',
    name: 'customers',
    component: Datatable,
  },
  {
    path: 'customers/create',
    name: 'customers.create',
    component: Form,
  },
  {
    path: 'customers/:id/edit',
    name: 'customers.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default customersRoutes;
