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
    website: 'Website',
    auth: {
      welcome: 'Grune Laravel Starter Kit (SPA version)',
      signInMessage: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      showPassword: 'Show Password',
      rememberMe: 'Remember Me',
      login: 'Login',
      adminLogin: 'Admin Login',
      logout: 'Logout',
      register: 'Register',
      moveToUserLogin: 'Move to user login',
    },
    form: {
      reset: 'Reset Form',
      search: 'Search',
      searchHistory: 'Search History',
    },
    hint: {
      partial: 'Partial matching search',
    },
    user: {
      list: 'User List',
      name: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      fullName: 'Fullname',
      profPic: 'Profile Picture',
      deleteModal: {
        text: 'Once the item ({name}) is deleted, we cannot get it back for you.'
      },
      deleteSuccess: 'Successfully deleted the user',
      createSuccess: 'Successfully created a user',
    },
    role: {
      role: 'Role',
      admin: 'Administrator',
      user: 'User',
    },
    validation: {
      required: 'Required',
      optional: 'Optional',
      confirm: 'Yes',
      cancel: 'No',
      greaterThan: 'Must be greater than the lower limit',
      lessThan: 'Must be less than the upper limit',
      positiveInteger: 'Please enter a positive integer',
      emailValid: 'Email must be valid!',
    },
    demo: {
      dummyMeetings: 'Meetings',
      dummyFilterColumn: 'Filter Column',
      dummyImportUser: 'Dummy Import User',
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
      list: 'Meeting List',
      location: 'Location',
      registrant: 'Registrant',
      createSuccess: 'Successfully created a meeting ({customer}: {meeting})',
      deleteSuccess: 'Successfully deleted the meeting',
      deleteModal: {
        text: 'Once the item ({customer_name}: {meeting_date}) is deleted, we cannot get it back for you',
      },
      selectLocation: {
        internal: 'Internal',
        external: 'External',
      },
      postcodeNotFound: 'Postcode {postcode} not found'
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
    action:{
      backToList: 'Back To List',
      csvDownload: 'Download CSV',
      search: 'Search',
      filterColumn: 'Filter Column',
      importUser: 'Import User'
    },
    customers:{
      success: 'Successfully process the requests',
      createSuccess: 'Successfully created a customer ({customer})',
      deleteSuccess: 'Successfully deleted the customer',
      deleteModal: {
        text: 'Once the item ({customer_name}) is deleted, we cannot get it back for you',
      },
      list: 'Customer List',
    },
    noDataAvailable: 'No data available',
    apply: 'Apply'
  },
};

export default en;
