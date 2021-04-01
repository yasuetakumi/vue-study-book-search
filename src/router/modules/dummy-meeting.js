import Form from '@views/main/dummy-meeting/Form';
import Datatable from '@views/main/dummy-meeting/Datatable';

const dummyMeetingsRoutes = [
  {
    path: 'dummy-meetings',
    name: 'dummy_meetings',
    component: Datatable,
  },
  {
    path: 'dummy-meetings/create',
    name: 'dummy_meetings.create',
    component: Form,
  },
  {
    path: 'dummy-meetings/:id/edit',
    name: 'dummy_meetings.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default dummyMeetingsRoutes;
