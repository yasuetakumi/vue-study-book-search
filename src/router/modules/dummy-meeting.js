import Form from '@views/main/dummy-meeting/Form';
import Datatable from '@views/main/dummy-meeting/Datatable';

const dummyMeetings = [
  {
    path: 'dummy-meeting',
    name: 'dummy-meeting',
    component: Datatable,
  },
  {
    path: 'dummy-meeting/create',
    name: 'dummy-meeting.create',
    component: Form,
  },
  {
    path: 'dummy-meeting/:id/edit',
    name: 'dummy-meeting.edit',
    component: Form,
    meta: {
      editPage: true,
    },
  },
];

export default dummyMeetings;
