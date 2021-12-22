import Form from '@views/main/dummy-meeting/Form';
import Datatable from '@views/main/dummy-meeting/Datatable';

const dummyMeetingsRoutes = [
  {
    path: 'dummy-meetings',
    name: 'dummy_meetings',
    component: Datatable,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
  },
  {
    path: 'dummy-meetings/create',
    name: 'dummy_meetings.create',
    component: Form,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
  },
  {
    path: 'dummy-meetings/:id/edit',
    name: 'dummy_meetings.edit',
    component: Form,
    meta: {
      requiresAuth: true,
      editPage: true,
    },
  },
];

export default dummyMeetingsRoutes;
