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
    website:'Webサイト',
    auth: {
      welcome: 'Grune Laravel Starter Kit (SPA version)',
      signInMessage: 'アカウントにサインイン',
      email: 'メールアドレス',
      password: 'パスワード',
      showPassword: 'パスワード表示',
      rememberMe: 'ログイン状態を保持する',
      login: 'ログイン',
      adminLogin: 'Adminログイン',
      logout: 'ログアウト',
      register: '登録',
      moveToUserLogin: 'ユーザーログインへ',
    },
    form: {
      reset: '検索フォームをリセットする',
      search: '検索する',
      searchHistory: '検索履歴',
    },
    hint: {
      partial: '※部分一致検索',
    },
    user: {
      list: 'ユーザー一覧',
      name: '名前',
      firstName: '姓',
      lastName: '名',
      fullName: '名前',
      profPic: 'プロフィール画像',
      deleteModal: {
        text: '{name}を削除します。削除されたデータは元に戻りません。よろしいですか？'
      },
      deleteSuccess: 'ユーザーの削除に成功しました',
      createSuccess: '正常にユーザーを作成しました',
    },
    role: {
      role: '役割',
      admin: '管理者',
      user: 'ユーザー',
    },
    validation: {
      required: '必須',
      optional: '任意',
      confirm: 'はい',
      cancel: 'いいえ',
      greaterThan: '下限より大きくする必要があります',
      lessThan: '上限未満である必要があります',
      positiveInteger: '正の整数を入力してください',
      emailValid: 'メールは有効である必要があります',
    },
    demo: {
      dummyMeetings: '打ち合わせ',
      dummyFilterColumn: 'フィルターカラム',
      dummyImportUser: 'ダミーインポートユーザー ',
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
      list: '会議一覧',
      location: '場所',
      registrant: '登録者',
      createSuccess: '正常に打ち合わせを作成しました ({customer}: {meeting})',
      deleteSuccess: '打ち合わせの削除に成功しました',
      deleteModal: {
        text: 'アイテム({customer_name}: {meeting_date})が削除されると、元に戻すことはできません。',
      },
      selectLocation: {
        internal: '社内',
        external: '社外',
      }
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
      confirmDelete: 'を削除します。削除されたデータは元に戻りません。よろしいですか？',
    },
    action:{
      backToList: '一覧に戻る',
      csvDownload: 'CSVダウンロード',
      search: '捜索',
      filterColumn: 'フィルターカラム',
      importUser: 'ユーザーのインポート'
    },
    customers:{
      success: 'リクエストを正常に処理する',
      createSuccess: '正常にお客様を作成しました ({customer})',
      deleteSuccess: 'お客様の削除に成功しました',
      deleteModal: {
        text: 'アイテム({customer_name})が削除されると、元に戻すことはできません。',
      },
      list: '顧客一覧',
    },
    noDataAvailable: '利用可能なデータがありません '
  },
};

export default ja;
