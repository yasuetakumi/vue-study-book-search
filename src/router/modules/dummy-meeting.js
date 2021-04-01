import Form from '@views/main/dummy-meeting/Form';
import Datatable from '@views/main/dummy-meeting/Datatable';

const dummyMeetingsRoutes = [
  {
    path: 'dummy-meetings',
    name: 'dummy-meetings',
    component: Datatable,
  },
  {
    path: 'dummy-meetings/create',
    name: 'dummy-meetings.create',
    component: Form,
  },
  {
    path: 'dummy-meetings/:id/edit',
    name: 'dummy-meetings.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default dummyMeetingsRoutes;
