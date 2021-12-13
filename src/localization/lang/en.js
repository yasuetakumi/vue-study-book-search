/*
 * [Vuei18n feature] In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
 */
const en = {
  localeLabel: 'English',
  general: {
    attendee: 'Attendee',
    customer: 'Customer',
    name: 'Name',
    title: 'Title',
    image_location: 'Image Location',
    address: 'Address',
    postcode: 'Postcode',
    phone_number: 'Phone Number',
    auth: {
      welcome: 'Welcome',
      signInMessage: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      showPassword: 'Show Password',
      rememberMe: 'Remember Me',
      login: 'Login',
      adminLogin: 'Admin Login',
      logout: 'Logout',
      register: 'Register',
    },
    user: {
      firstName: 'First Name',
      lastName: 'Last Name',
      fullName: 'Fullname',
      profPic: 'Profile Picture',
    },
    role: {
      role: 'Role',
      admin: 'Administrator',
      user: 'User',
    },
    validation: {
      required: 'Required',
      optional: 'Optional',
      confirm: 'Confirm',
    },
    demo: {
      dummyMeetings: 'Dummy Meetings',
    },
    crud: {
      createNew: 'Create New',
      list: 'List',
      add: 'Add New',
      edit: 'Edit',
      update: 'Update',
      change: 'Change',
      delete: 'Delete',
      search: 'Search',
      all: 'All',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      action: 'Action',
      submit: 'Submit',
    },
    meeting: {
      location: 'Location',
      registrant: 'Registrant',
    },
    time: {
      date: 'Date',
      time: 'Time',
    },
    nav: {
      projectName: 'Vue Starter Kit',
      grune: 'Grune',
      dashboard: 'Dashboard',
      users: 'Users',
      customers: 'Customers',
    },
    placeholder: {
      email: 'sample@email.com',
      firstName: 'Abdul',
      lastName: 'Ali',
      fullName: 'Abdul Ali',
    },
    alert: {
      youSure: 'Are you sure?',
      confirmDelete: 'Once the item is deleted, we cannot get it back for you.',
    },
    action: {
      backToList: 'Back To List',
    },
  },
};

export default en;
