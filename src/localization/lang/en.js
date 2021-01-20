/*
 * [Vuei18n feature] In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
*/
const en = {
  localeLabel: "English",
  general: {
    auth: {
      welcome: "Welcome",
      signInMessage: "Sign in to your account",
      email: "Email",
      password: "Password",
      showPassword: "Show Password",
      rememberMe: "Remember Me",
      login: "Login",
      logout: "Logout",
      register: "Register"
    },
    user: {
      firstName: "First Name",
      lastName: "Last Name",
      fullName: "Fullname",
      profPic: "Profile Picture"
    },
    role: {
      role: "Role",
      admin: "Administrator",
      user: "User"
    },
    validation: {
      required: "Required",
      optional: "Optional"
    },
    crud: {
      createNew: "Create New",
      list: "List",
      add: "Add New",
      edit: "Edit",
      update: "Update",
      change: "Change",
      delete: "Delete",
      search: "Search",
      all: "All",
      createdAt: "Created at",
      updatedAt: "Updated at",
      action: "Action"
    },
    nav: {
      projectName: "Vue Starter Kit",
      grune: "Grune",
      dashboard: "Dashboard",
      users: "Users"
    },
    placeholder: {
      email: "sample@email.com",
      firstName: "Abdul",
      lastName: "Ali",
      fullName: "Abdul Ali",
    }
  }
};

export default en;
