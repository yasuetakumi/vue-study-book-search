(function(e){function t(t){for(var r,s,i=t[0],l=t[1],c=t[2],d=0,m=[];d<i.length;d++)s=i[d],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&m.push(o[s][0]),o[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var l=a[i];0!==o[l]&&(r=!1)}r&&(n.splice(t--,1),e=s(s.s=a[0]))}return e}var r={},o={app:0},n=[];function s(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=r,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(a,r,function(t){return e[t]}.bind(null,r));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"3f65":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"inspire"}},[a("v-container",[e.loadingPage?a("v-progress-linear",{attrs:{indeterminate:""}}):e._e(),a("router-view",{attrs:{books:e.books},on:{"add-book-list":e.addBook,"update-book-info":e.updateBookInfo,"delete-local-storage":e.deleteLocalStorage}})],1)],1)},n=[],s=(a("a4d3"),a("e01a"),a("fb6a"),a("a434"),a("2f62")),i="books",l={data:function(){return{books:[],newBook:null}},methods:{addBook:function(e){this.books.push({id:this.books.length,title:e.title,image:e.image,description:e.description,readDate:"",memo:""}),this.saveBooks(),console.log(this.books.slice(-1)[0].id),this.goToEditPage(this.books.slice(-1)[0].id)},removeBook:function(e){this.cats.splice(e,1),this.saveBooks()},saveBooks:function(){var e=JSON.stringify(this.books);localStorage.setItem(i,e)},updateBookInfo:function(e){var t={id:e.id,readDate:e.readDate,memo:e.memo,title:this.books[e.id].title,image:this.books[e.id].image,description:this.books[e.id].description};this.books.splice(e.id,1,t),this.saveBooks(),this.$router.push("/")},deleteLocalStorage:function(){var e="LocalStorageのデータを削除してもいいですか？";window.confirm(e)&&(localStorage.setItem(i,""),localStorage.removeItem(i),this.books=[],window.location.reload())},goToEditPage:function(e){this.$router.push("/edit/".concat(e))}},mounted:function(){if(localStorage.getItem(i))try{this.books=JSON.parse(localStorage.getItem(i))}catch(e){localStorage.removeItem(i)}},computed:Object(s["b"])({loadingPage:function(e){return e.global.loadingPage}})},c=l,u=a("2877"),d=a("6544"),m=a.n(d),p=a("7496"),f=a("a523"),g=a("8e36"),h=Object(u["a"])(c,o,n,!1,null,null,null),v=h.exports;m()(h,{VApp:p["a"],VContainer:f["a"],VProgressLinear:g["a"]});var b=a("2909"),w=a("8c4f"),k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-main",[a("GDebugLabel"),a("v-container",{staticClass:"login-card d-flex flex-column"},[a("v-container",{staticClass:"d-flex justify-center"},[a("v-card",{attrs:{loading:e.isLoading,width:"390"}},[a("template",{slot:"progress"},[a("v-progress-linear",{attrs:{height:"10",indeterminate:""}})],1),a("v-card-title",[e._v(e._s(e.$t("general.auth.welcome")))]),a("v-card-subtitle",[e._v(e._s(e.$t("general.auth.signInMessage")))]),a("v-form",{staticClass:"ma-3",on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[a("v-text-field",{attrs:{label:e.$t("general.auth.email"),placeholder:e.$t("general.placeholder.email"),rules:e.emailRules,outlined:"",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("v-text-field",{attrs:{label:e.$t("general.auth.password"),type:"password",placeholder:"",rules:e.passwordRules,outlined:"",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("v-card-text",{staticClass:"py-1 px-1 ",staticStyle:{"border-radius":"8px","background-color":"#ddeeff",color:"#4466aa"}},[a("div",{staticClass:"ml-3"},[a("p",[e._v("以下のログイン情報をお使いください。")]),a("p",[e._v(" Email: admin@company.com"),a("br"),e._v("Password: 12345678 "),a("v-btn",{staticClass:"ml-12",attrs:{small:""},on:{click:function(t){e.email="admin@company.com",e.password="12345678"}}},[e._v("SET")])],1)])]),a("v-card-actions",[a("v-btn",{staticClass:"pa-2",attrs:{block:"",color:"primary",type:"submit"}},[e._v(e._s(e.$t("general.auth.login")))])],1)],1)],2)],1),a("v-container",[a("locale-selector",{staticStyle:{width:"150px"}})],1)],1),e.loading_hand_shake?a("v-overlay",{attrs:{value:"Loading..."}},[a("v-progress-circular",{attrs:{indeterminate:"",size:"64"}})],1):e._e()],1)},x=[],_=a("1da1"),y=(a("96cf"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-select",{attrs:{items:e.languages,"item-text":"label","item-value":"val",solo:""},model:{value:e.locale,callback:function(t){e.locale=t},expression:"locale"}})],1)}),S=[],L=a("5530"),V={computed:Object(L["a"])({locale:{get:function(){return this.$store.state.global.locale},set:function(e){this.$store.dispatch("global/setLocale",e)}}},Object(s["b"])({languages:function(e){return e.global.languages}}))},C=V,R=a("b974"),A=Object(u["a"])(C,y,S,!1,null,null,null),O=A.exports;m()(A,{VContainer:f["a"],VSelect:R["a"]});var P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.isDebug?a("div",{staticStyle:{position:"absolute",left:"5px",top:"5px",color:"#ff00ff"}},[e._v(" apiEndpoint: "+e._s(e.apiEndPoint)),a("br"),e._v(" ["+e._s(e.getMockId(e.$route.name))+"] RouteName: "+e._s(e.$route.name)),a("br")]):e._e()},j=[],E={data:function(){return{apiEndPoint:"http://localhost:8086/api",isDebug:Object({NODE_ENV:"production",VUE_APP_API_ENDPOINT:"http://localhost:8086/api",BASE_URL:""}).IS_DEBUG}},methods:{getMockId:function(e){switch(e){case"adminLogin":return"A0";case"login":return"B0";case"users":return"A1";case"users.create":return"A2";case"users.edit":return"A3";case"dummy_meetings":return"A4";case"dummy_meetings.create":return"A5";case"dummy_meetings.edit":return"A6";default:return"-"}}}},I=E,N=Object(u["a"])(I,P,j,!1,null,null,null),M=N.exports,$={components:{LocaleSelector:O,GDebugLabel:M},data:function(){return{email:"",password:"",remember:!1,loading_hand_shake:!0,emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)||"E-mail must be valid"}],passwordRules:[function(e){return!!e||"Password is required"}]}},computed:Object(s["b"])({isLoading:function(e){return e.auth.isLoading}}),methods:{login:function(){var e={email:this.email,password:this.password,remember:this.remember};this.$store.dispatch("auth/login",{credentials:e})},initHandShake:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.loading_hand_shake){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,r["a"].axios.get("/hand-shake");case 5:if(t=e.sent,"___SUCCESS___"!=t.data.result){e.next=10;break}this.loading_hand_shake=!1,e.next=11;break;case 10:throw new Error("hand shaking is not succeed.");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](2),console.error("Hand shaking is not succeed. 1. If Request url is not correct,you can check client/.env file. 2.If file access is denied, please execute artisan config:clear in docker container, not on host. "),console.error(e.t0);case 17:case"end":return e.stop()}}),e,this,[[2,13]])})));function t(){return e.apply(this,arguments)}return t}()},created:function(){var e=Object(_["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.debug("begin:created"),this.initHandShake();case 2:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},D=$,T=(a("f0d2"),a("8336")),B=a("b0af"),U=a("99d9"),q=a("4bd4"),F=a("f6c4"),G=a("a797"),H=a("490a"),z=a("8654"),J=Object(u["a"])(D,k,x,!1,null,"60e7cde5",null);J.exports;m()(J,{VBtn:T["a"],VCard:B["a"],VCardActions:U["a"],VCardSubtitle:U["b"],VCardText:U["c"],VCardTitle:U["d"],VContainer:f["a"],VForm:q["a"],VMain:F["a"],VOverlay:G["a"],VProgressCircular:H["a"],VProgressLinear:g["a"],VTextField:z["a"]});var Z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-btn",{staticClass:"primary",attrs:{to:"/search"}},[e._v("検索する")]),a("v-btn",{attrs:{color:"error"},on:{click:e.deleteLocalStorage}},[e._v("削除する")])],1)],1),a("v-row",e._l(e.books,(function(t){return a("v-col",{key:t.id,attrs:{cols:"12",sm:"6"}},[a("v-card",[a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-img",{attrs:{src:t.image}})],1),a("v-col",{attrs:{cols:"8"}},[a("v-card-title",[e._v(" "+e._s(t.title)+" ")]),e._v(" 読んだ日:"+e._s(t.readDate)+" 感想:"+e._s(t.memo)+" "),a("v-spacer"),a("v-card-actions",[a("v-btn",{attrs:{to:{name:"edit",params:{id:t.id}},color:"indigo",fab:"",small:"",dark:""}},[a("v-icon",[e._v("mdi-pencil")])],1)],1)],1)],1)],1)],1)})),1)],1)])},K=[],W=a("b85c"),Y=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),{props:{books:Array},methods:{search:function(e){var t=this;return Object(_["a"])(regeneratorRuntime.mark((function a(){var r,o,n,s,i,l,c,u,d,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.searchResults=[],r="https://www.googleapis.com/books/v1/volumes?",o={q:"intitle:".concat(e),maxResults:40},n=new URLSearchParams(o),console.log(r+n),a.next=7,fetch(r+n).then((function(e){return e.json()}));case 7:s=a.sent,console.log(s),i=Object(W["a"])(s.items);try{for(i.s();!(l=i.n()).done;)c=l.value,u=c.volumeInfo.title,d=c.volumeInfo.imageLinks,m=c.volumeInfo.description,t.searchResults.push({title:u||"",image:d?d.thumbnail:"",description:m?m.slice(0,40):""})}catch(p){i.e(p)}finally{i.f()}case 11:case"end":return a.stop()}}),a)})))()},deleteLocalStorage:function(){this.$emit("delete-local-storage")}}}),Q=Y,X=a("62ad"),ee=a("132d"),te=a("adda"),ae=a("0fd9"),re=a("2fa4"),oe=Object(u["a"])(Q,Z,K,!1,null,null,null),ne=oe.exports;m()(oe,{VBtn:T["a"],VCard:B["a"],VCardActions:U["a"],VCardTitle:U["d"],VCol:X["a"],VIcon:ee["a"],VImg:te["a"],VRow:ae["a"],VSpacer:re["a"]});var se=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{label:"本のタイトルを検索"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"3"}},[a("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.search(e.keyword)}}},[e._v("検索する ")])],1),a("v-col",{attrs:{cols:"3"}},[a("v-btn",{attrs:{color:"secondary",to:"/"}},[e._v("一覧に戻る ")])],1)],1),a("v-row",e._l(e.searchResults,(function(t,r){return a("v-col",{key:t.index,attrs:{cols:"12",md:"6"}},[a("v-card",{staticClass:"mx-auto"},[a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-img",{attrs:{src:t.image}})],1),a("v-col",{attrs:{cols:"8"}},[a("v-card-title",[e._v(e._s(t.title))]),e._v(" "+e._s(t.description)+" "),a("v-spacer"),a("v-card-actions",[a("v-btn",{attrs:{fab:"",dark:"",color:"indigo"},on:{click:function(t){return e.addBookList(r)}}},[a("v-icon",{attrs:{dark:""}},[e._v("mdi-plus")])],1)],1)],1)],1)],1)],1)})),1)],1)])},ie=[],le={data:function(){return{keyword:"",searchResults:[],books:[],newBook:null}},methods:{addBookList:function(e){this.$emit("add-book-list",this.searchResults[e])},search:function(e){var t=this;return Object(_["a"])(regeneratorRuntime.mark((function a(){var r,o,n,s,i,l,c,u,d,m;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.searchResults=[],r="https://www.googleapis.com/books/v1/volumes?",o={q:"intitle:".concat(e),maxResults:40},n=new URLSearchParams(o),console.log(r+n),a.next=7,fetch(r+n).then((function(e){return e.json()}));case 7:s=a.sent,console.log(s),i=Object(W["a"])(s.items);try{for(i.s();!(l=i.n()).done;)c=l.value,u=c.volumeInfo.title,d=c.volumeInfo.imageLinks,m=c.volumeInfo.description,t.searchResults.push({title:u||"",image:d?d.thumbnail:"",description:m?m.slice(0,40):""})}catch(p){i.e(p)}finally{i.f()}case 11:case"end":return a.stop()}}),a)})))()}}},ce=le,ue=Object(u["a"])(ce,se,ie,!1,null,null,null),de=ue.exports;m()(ue,{VBtn:T["a"],VCard:B["a"],VCardActions:U["a"],VCardTitle:U["d"],VCol:X["a"],VIcon:ee["a"],VImg:te["a"],VRow:ae["a"],VSpacer:re["a"],VTextField:z["a"]});var me=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-card",{staticClass:"mx-auto"},[a("v-row",[a("v-col",{attrs:{cols:"4"}},[a("v-img",{attrs:{src:e.book.image}})],1),a("v-col",{attrs:{cols:"8"}},[a("v-card-title",[e._v(" タイトル:"+e._s(e.book.title)+" ")]),e._v(" 読んだ日: "),a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{readonly:""},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}},"v-text-field",o,!1),r))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{locale:"ja-ja","day-format":function(e){return new Date(e).getDate()}},on:{input:function(t){e.menu=!1}},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}})],1),e._v(" 感想: "),a("v-textarea",{staticClass:"mx-2",model:{value:e.book.memo,callback:function(t){e.$set(e.book,"memo",t)},expression:"book.memo"}},[e._v(" "+e._s(e.book.memo)+" ")]),a("v-card-actions",[a("v-btn",{attrs:{color:"secondary",to:"/"}},[e._v("一覧に戻る")]),a("v-btn",{attrs:{color:"info"},on:{click:e.updateBookInfo}},[e._v("保存する")])],1)],1)],1)],1)],1)],1)],1)},pe=[],fe={name:"BookEdit",props:{books:Array},data:function(){return{book:"",date:"",menu:!1}},methods:{updateBookInfo:function(){this.$emit("update-book-info",{id:this.$route.params.id,readDate:this.date,memo:this.book.memo})}},beforeRouteEnter:function(e,t,a){a((function(e){e.$nextTick((function(){e.book=e.books[e.$route.params.id],e.book.readDate?e.date=e.book.readDate:e.date=(new Date).toISOString().substr(0,10)}))}))}},ge=fe,he=a("2e4b"),ve=a("e449"),be=a("a844"),we=Object(u["a"])(ge,me,pe,!1,null,null,null),ke=we.exports;m()(we,{VBtn:T["a"],VCard:B["a"],VCardActions:U["a"],VCardTitle:U["d"],VCol:X["a"],VDatePicker:he["a"],VImg:te["a"],VMenu:ve["a"],VRow:ae["a"],VTextField:z["a"],VTextarea:be["a"]});var xe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-main",[a("GDebugLabel"),a("v-container",{staticClass:"login-card d-flex flex-column"},[a("v-container",{staticClass:"d-flex justify-center"},[a("v-card",{attrs:{loading:e.isLoading,width:"374"}},[a("v-alert",{attrs:{dense:"",type:"error"},model:{value:e.showAlert,callback:function(t){e.showAlert=t},expression:"showAlert"}},[e._v(" The email or password you entered are incorrect. ")]),a("template",{slot:"progress"},[a("v-progress-linear",{attrs:{height:"10",indeterminate:""}})],1),a("v-card-title",{staticClass:"d-flex justify-center"},[e._v(e._s(e.$t("general.auth.adminLogin")))]),a("v-form",{staticClass:"ma-3",on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}}},[a("v-text-field",{attrs:{label:e.$t("general.auth.email"),placeholder:"",rules:e.emailRules,outlined:"",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("v-text-field",{attrs:{label:e.$t("general.auth.password"),type:"password",placeholder:"",rules:e.passwordRules,outlined:"",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("v-card-text",{staticClass:"py-1 px-1 ",staticStyle:{"border-radius":"8px","background-color":"#ddeeff",color:"#4466aa"}},[a("div",{staticClass:"ml-3"},[a("p",[e._v("以下のログイン情報をお使いください。")]),a("p",[e._v(" Email: admin@admin.com"),a("br"),e._v("Password: 12345678 "),a("v-btn",{staticClass:"ml-12",attrs:{small:""},on:{click:function(t){e.email="admin@admin.com",e.password="12345678"}}},[e._v("SET")])],1)])]),a("v-card-actions",[a("v-checkbox",{attrs:{label:e.$t("general.auth.rememberMe")},model:{value:e.rememberMe,callback:function(t){e.rememberMe=t},expression:"rememberMe"}}),a("v-row",{staticClass:"d-flex justify-end mr-1 card-white-space"},[a("v-btn",{staticClass:"pa-2",attrs:{color:"primary",type:"submit"}},[e._v(" "+e._s(e.$t("general.auth.login"))+" ")])],1)],1)],1)],2)],1),a("v-container",{staticClass:"d-flex justify-center"},[a("v-card",{attrs:{width:"374",elevation:"0"}},[a("a",{staticClass:"text-decoration-none",attrs:{href:"#"}},[e._v(e._s(e.$t("general.auth.moveToUserLogin")))])])],1),a("v-container",[a("locale-selector",{staticStyle:{width:"150px"}})],1)],1)],1)},_e=[],ye={components:{LocaleSelector:O,GDebugLabel:M},data:function(){return{showAlert:!1,email:"",password:"",remember:!1,rememberMe:!1,emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)||"E-mail must be valid"}],passwordRules:[function(e){return!!e||"Password is required"}]}},computed:Object(s["b"])({isLoading:function(e){return e.auth.isLoading},showAlert:function(e){return e.auth.showAlert}}),methods:{login:function(){var e={email:this.email,password:this.password,remember:this.remember,rememberMe:this.rememberMe},t="admin";this.$store.dispatch("auth/login",{credentials:e,guard:t})}}},Se=ye,Le=(a("e843"),a("0798")),Ve=a("ac7c"),Ce=Object(u["a"])(Se,xe,_e,!1,null,"2688a846",null);Ce.exports;m()(Ce,{VAlert:Le["a"],VBtn:T["a"],VCard:B["a"],VCardActions:U["a"],VCardText:U["c"],VCardTitle:U["d"],VCheckbox:Ve["a"],VContainer:f["a"],VForm:q["a"],VMain:F["a"],VProgressLinear:g["a"],VRow:ae["a"],VTextField:z["a"]});var Re={login:function(e,t){return Object(_["a"])(regeneratorRuntime.mark((function a(){var o,n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return o=""!==t?"".concat(t,"/login"):"login",a.prev=1,a.next=4,r["a"].axios.get("sanctum/csrf-cookie");case 4:if(n=a.sent,!n){a.next=14;break}return a.next=8,r["a"].axios.post(o,e);case 8:if(s=a.sent,!s.data.status){a.next=13;break}return a.abrupt("return",s.data);case 13:throw new Error("Failed to login");case 14:a.next=19;break;case 16:return a.prev=16,a.t0=a["catch"](1),a.abrupt("return",{status:!1,messages:a.t0.message});case 19:case"end":return a.stop()}}),a,null,[[1,16]])})))()},logout:function(e){return Object(_["a"])(regeneratorRuntime.mark((function t(){var a,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=""!==e?"".concat(e,"/logout"):"logout",t.prev=1,t.next=4,r["a"].axios.get(a);case 4:if(o=t.sent,!o.status){t.next=10;break}return console.log(o),t.abrupt("return",{status:!0});case 10:return t.abrupt("return",{status:!1,message:"Error logging out"});case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t["catch"](1),t.abrupt("return",{status:!1,message:t.t0.message});case 16:case"end":return t.stop()}}),t,null,[[1,13]])})))()},checkAuth:function(){return Object(_["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r["a"].axios.get("/auth-check");case 3:return t=e.sent,console.log(t),e.abrupt("return",t.data);case 8:return e.prev=8,e.t0=e["catch"](0),e.abrupt("return",{status:!1,message:e.t0.message});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}},Ae=Re,Oe=function(){return{status:!1,guard:"",username:"",role:""}},Pe={default:{loginRoute:"login",homeRoute:"home"},admin:{loginRoute:"adminLogin",homeRoute:"admin_home"}},je=function(){return{isLoading:!1,info:Oe(),errorLoginMessage:""}},Ee={},Ie={login:function(e,t){return Object(_["a"])(regeneratorRuntime.mark((function a(){var r,o,n,s,i,l,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=e.commit,o=t.credentials,n=t.guard,s=void 0===n?"":n,i=""===s?Pe.default.homeRoute:Pe[s].homeRoute,a.prev=3,r("setLoading",!0),a.next=7,Ae.login(o,s);case 7:l=a.sent,l.status?(r("login",l),c=nt.currentRoute.query.redirect,"undefined"!==typeof c?nt.push(c):nt.push({name:i})):r("setErrorLoginMessage",l.messages),a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](3),console.log(a.t0);case 14:return a.prev=14,r("setLoading",!1),a.finish(14);case 17:case"end":return a.stop()}}),a,null,[[3,11,14,17]])})))()},logout:function(e){return Object(_["a"])(regeneratorRuntime.mark((function t(){var a,r,o,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.commit,r=e.state,o=r.info.guard,n=""===o?Pe.default.loginRoute:Pe[o].loginRoute,t.prev=3,t.next=6,Ae.logout(o);case 6:s=t.sent,s.status&&(a("logout"),nt.push({name:n})),t.next=13;break;case 10:throw t.prev=10,t.t0=t["catch"](3),new Error(t.t0);case 13:case"end":return t.stop()}}),t,null,[[3,10]])})))()},checkAuth:function(e){return Object(_["a"])(regeneratorRuntime.mark((function t(){var a,r,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.state,r=e.commit,a.info.status){t.next=17;break}return r("global/setLoadingPage",!0,{root:!0}),t.prev=3,t.next=6,Ae.checkAuth();case 6:o=t.sent,console.log(o.status),o.status&&r("login",o),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](3),console.log(t.t0);case 14:return t.prev=14,r("global/setLoadingPage",!1,{root:!0}),t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[3,11,14,17]])})))()}},Ne={login:function(e,t){var a=t.status,r=t.guard,o=t.username,n=t.role;e.info.status=a,e.info.username=o,e.info.guard=r,e.info.role=n},logout:function(e){var t=e.info.guard;e.info=Oe(),e.info.guard=t},setLoading:function(e,t){e.isLoading=t},setErrorLoginMessage:function(e,t){e.errorLoginMessage=t}},Me={namespaced:!0,state:je,getters:Ee,actions:Ie,mutations:Ne},$e=(a("b64b"),a("a925")),De={localeLabel:"English",general:{attendee:"Attendee",customer:"Customer",name:"Name",title:"Title",image_location:"Image Location",address:"Address",postcode:"Postcode",phone_number:"Phone Number",website:"Website",auth:{welcome:"Grune Laravel Starter Kit (SPA version)",signInMessage:"Sign in to your account",email:"Email",password:"Password",showPassword:"Show Password",rememberMe:"Remember Me",login:"Login",adminLogin:"Admin Login",logout:"Logout",register:"Register",moveToUserLogin:"Move to user login"},form:{reset:"Reset Form",search:"Search",searchHistory:"Search History"},hint:{partial:"Partial matching search"},user:{list:"User List",name:"Name",firstName:"First Name",lastName:"Last Name",fullName:"Fullname",profPic:"Profile Picture",deleteModal:{text:"Once the item ({name}) is deleted, we cannot get it back for you."},deleteSuccess:"Successfully deleted the user",createSuccess:"Successfully created a user"},role:{role:"Role",admin:"Administrator",user:"User"},validation:{required:"Required",optional:"Optional",confirm:"Yes",cancel:"No",greaterThan:"Must be greater than the lower limit",lessThan:"Must be less than the upper limit",positiveInteger:"Please enter a positive integer",emailValid:"Email must be valid!"},demo:{dummyMeetings:"Meetings",dummyFilterColumn:"Filter Column",dummyImportUser:"Dummy Import User"},crud:{createNew:"Create New",list:"List",add:"Add New",edit:"Edit",update:"Update",change:"Change",delete:"Delete",search:"Search",all:"All",createdAt:"Created at",updatedAt:"Updated at",action:"Action",submit:"Submit"},meeting:{list:"Meeting List",location:"Location",registrant:"Registrant",createSuccess:"Successfully created a meeting ({customer}: {meeting})",deleteSuccess:"Successfully deleted the meeting",deleteModal:{text:"Once the item ({customer_name}: {meeting_date}) is deleted, we cannot get it back for you"},selectLocation:{internal:"Internal",external:"External"},postcodeNotFound:"Postcode {postcode} not found"},time:{date:"Date",time:"Time"},nav:{projectName:"Vue Starter Kit",grune:"Grune",dashboard:"Dashboard",users:"Users",customers:"Customers"},placeholder:{email:"sample@email.com",firstName:"Abdul",lastName:"Ali",fullName:"Abdul Ali"},alert:{youSure:"Are you sure?",confirmDelete:"Once the item is deleted, we cannot get it back for you."},action:{backToList:"Back To List",csvDownload:"Download CSV",search:"Search",filterColumn:"Filter Column",importUser:"Import User"},customers:{success:"Successfully process the requests",createSuccess:"Successfully created a customer ({customer})",deleteSuccess:"Successfully deleted the customer",deleteModal:{text:"Once the item ({customer_name}) is deleted, we cannot get it back for you"},list:"Customer List"},noDataAvailable:"No data available",apply:"Apply"}},Te=De,Be={localeLabel:"日本語",general:{attendee:"出席者",customer:"顧客",name:"名前",title:"タイトル",image_location:"位置画像",address:"住所",postcode:"郵便番号",phone_number:"電話番号",website:"Webサイト",auth:{welcome:"Grune Laravel Starter Kit (SPA version)",signInMessage:"アカウントにサインイン",email:"メールアドレス",password:"パスワード",showPassword:"パスワード表示",rememberMe:"ログイン状態を保持する",login:"ログイン",adminLogin:"Adminログイン",logout:"ログアウト",register:"登録",moveToUserLogin:"ユーザーログインへ"},form:{reset:"検索フォームをリセットする",search:"検索する",searchHistory:"検索履歴"},hint:{partial:"※部分一致検索"},user:{list:"ユーザー一覧",name:"名前",firstName:"姓",lastName:"名",fullName:"名前",profPic:"プロフィール画像",deleteModal:{text:"{name}を削除します。削除されたデータは元に戻りません。よろしいですか？"},deleteSuccess:"ユーザーの削除に成功しました",createSuccess:"正常にユーザーを作成しました"},role:{role:"役割",admin:"管理者",user:"ユーザー"},validation:{required:"必須",optional:"任意",confirm:"はい",cancel:"いいえ",greaterThan:"下限より大きくする必要があります",lessThan:"上限未満である必要があります",positiveInteger:"正の整数を入力してください",emailValid:"メールは有効である必要があります"},demo:{dummyMeetings:"打ち合わせ",dummyFilterColumn:"フィルターカラム",dummyImportUser:"ダミーインポートユーザー "},crud:{createNew:"新規作成",list:"一覧",add:"新規作成",edit:"編集",update:"更新",change:"変更",delete:"削除",search:"検索",all:"全部",createdAt:"作成日",updatedAt:"更新日",action:"編集",submit:"登録"},meeting:{list:"会議一覧",location:"場所",registrant:"登録者",createSuccess:"正常に打ち合わせを作成しました ({customer}: {meeting})",deleteSuccess:"打ち合わせの削除に成功しました",deleteModal:{text:"アイテム({customer_name}: {meeting_date})が削除されると、元に戻すことはできません。"},selectLocation:{internal:"社内",external:"社外"},postcodeNotFound:"ポストコード{postcode}が見つかりません"},time:{date:"日付",time:"時間"},nav:{projectName:"SPA-Vue2 starter",grune:"Grune",dashboard:"ダッシュボード",users:"ユーザー",customers:"お客様"},placeholder:{email:"sample@email.com",firstName:"山下",lastName:"太郎",fullName:"山下太郎"},alert:{youSure:"削除確認",confirmDelete:"を削除します。削除されたデータは元に戻りません。よろしいですか？"},action:{backToList:"一覧に戻る",csvDownload:"CSVダウンロード",search:"捜索",filterColumn:"フィルターカラム",importUser:"ユーザーのインポート"},customers:{success:"リクエストを正常に処理する",createSuccess:"正常にお客様を作成しました ({customer})",deleteSuccess:"お客様の削除に成功しました",deleteModal:{text:"アイテム({customer_name})が削除されると、元に戻すことはできません。"},list:"顧客一覧"},noDataAvailable:"利用可能なデータがありません ",apply:"適用する"}},Ue=Be;r["a"].use($e["a"]);for(var qe={en:Te,ja:Ue},Fe=[],Ge=0,He=Object.keys(qe);Ge<He.length;Ge++){var ze=He[Ge];Fe.push({val:ze,label:qe[ze].localeLabel})}var Je=new $e["a"]({locale:"ja",messages:qe}),Ze=Je,Ke=function(){return{locale:Ze.locale,languages:Fe,loadingPage:!1,notification:{text:"",isOpen:!1,color:"success",multiLine:!1}}},We={},Ye={setLocale:function(e,t){var a=e.commit;Ze.locale=t,a("setLocale",t)}},Qe={setLocale:function(e,t){e.locale=t},setLoadingPage:function(e,t){e.loadingPage=t},setNotification:function(e,t){e.notification=t},closeNotification:function(e){e.notification.isOpen=!1}},Xe={namespaced:!0,state:Ke,getters:We,actions:Ye,mutations:Qe};r["a"].use(s["a"]);var et=new s["a"].Store({state:{},mutations:{},actions:{},modules:{auth:Me,global:Xe}}),tt=[{path:"/",name:"book",component:ne},{path:"/edit/:id",name:"edit",component:ke},{path:"/search",name:"search",component:de}],at=tt;r["a"].use(w["a"]);var rt=Object(b["a"])(at),ot=new w["a"]({mode:"history",routes:rt}),nt=ot,st=a("58ca"),it=a("f309");r["a"].use(it["a"]);var lt=new it["a"]({}),ct=a("bc3a"),ut=a.n(ct),dt=a("2106"),mt=a.n(dt),pt=(a("15fd"),a("a38e"),a("d81d"),function(e,t){var a={text:e,isOpen:!0,color:t,multiLine:!0};et.commit("global/setNotification",a)}),ft=w["a"].isNavigationFailure,gt={withCredentials:!0,crossDomain:!0,baseURL:"http://localhost:8086/api"},ht=ut.a.create(gt);ht.interceptors.response.use((function(e){return e}),(function(e){if(401!=e.response.status)throw e;et.commit("auth/logout"),nt.push({name:"login",query:{redirect:nt.currentRoute.fullPath}}).catch((function(e){ft(e)}))})),r["a"].use(mt.a,ht);var vt=function(e){this.isHandled=!1,this.response=e.response};vt.prototype.pushErrorToNotif=function(e){return!this.isHandled&&e&&this.response.data.message?(pt(this.response.data.message,"error"),this.isHandled=!0,this):this};var bt=a("a563");r["a"].component("v-text-field",z["a"]),r["a"].use(bt["a"],{locale:"pt-BR",decimalLength:2,autoDecimalMode:!0,min:null,max:null,defaultValue:0,valueAsInteger:!1,allowNegative:!0}),r["a"].config.productionTip=!1,r["a"].use(st["a"],{refreshOnceOnNavigation:!0}),new r["a"]({router:nt,store:et,vuetify:lt,i18n:Ze,render:function(e){return e(v)}}).$mount("#app")},ce48:function(e,t,a){},e843:function(e,t,a){"use strict";a("3f65")},f0d2:function(e,t,a){"use strict";a("ce48")}});
//# sourceMappingURL=app.fda783eb.js.map