import Form from "@views/main/dummy-meetings/Form";
import Datatable from "@views/main/dummy-meetings/Datatable";

const dummyMeetings = [
  {
    path: "dummy-meetings",
    name: "dummy-meetings",
    component: Datatable
  },
  {
    path: "dummy-meetings/create",
    name: "dummy-meetings.create",
    component: Form
  },
  {
    path: "dummy-meetings/:id/edit",
    name: "dummy-meetings.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default dummyMeetings;
