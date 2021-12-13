/*
 * In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
 */
const ja = {
  localeLabel: '日本語',
  general: {
    attendee: '出席者',
    customer: '顧客',
    name: '名前',
    title: 'タイトル',
    image_location: '位置画像',
    address: '住所',
    postcode: '郵便番号',
    phone_number: '電話番号',
    auth: {
      welcome: 'ようこそ',
      signInMessage: 'アカウントにサインイン',
      email: 'メールアドレス',
      password: 'パスワード',
      showPassword: 'パスワード表示',
      rememberMe: 'ログイン状態を保持する',
      login: 'ログイン',
      adminLogin: 'Adminログイン',
      logout: 'ログアウト',
      register: '登録',
    },
    user: {
      firstName: '姓',
      lastName: '名',
      fullName: '名前',
      profPic: 'プロフィール画像',
    },
    role: {
      role: '役割',
      admin: '管理者',
      user: 'ユーザー',
    },
    validation: {
      required: '必須',
      optional: '任意',
      confirm: '確認',
    },
    demo: {
      dummyMeetings: '打ち合わせ',
    },
    crud: {
      createNew: '新規作成',
      list: '一覧',
      add: '新規作成',
      edit: '編集',
      update: '更新',
      change: '変更',
      delete: '削除',
      search: '検索',
      all: '全部',
      createdAt: '作成日',
      updatedAt: '更新日',
      action: '編集',
      submit: '登録',
    },
    meeting: {
      location: '場所',
      registrant: '登録者',
    },
    time: {
      date: '日付',
      time: '時間',
    },
    nav: {
      projectName: 'SPA-Vue2 starter',
      grune: 'Grune',
      dashboard: 'ダッシュボード',
      users: 'ユーザー',
      customers: 'お客様',
    },
    placeholder: {
      email: 'sample@email.com',
      firstName: '山下',
      lastName: '太郎',
      fullName: '山下太郎',
    },
    alert: {
      youSure: '削除確認',
      confirmDelete: '選択したデータを削除します。削除されたデータは元に戻せません。',
    },
    action: {
      backToList: '一覧に戻る',
    },
  },
};

export default ja;
