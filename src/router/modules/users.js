import Form from "@views/main/modules/users/Form";
import Datatable from "@views/main/modules/users/Datatable";

const users = [
  {
    path: "users",
    name: "users",
    component: Datatable
  },
  {
    path: "users/create",
    name: "users.create",
    component: Form
  },
  {
    path: "users/:id/edit",
    name: "users.edit",
    component: Form,
    meta: {
      editPage: true
    }
  }
];

export default users;
