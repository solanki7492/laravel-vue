(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{21:function(e,t,r){var a=r(60);"string"==typeof a&&(a=[[e.i,a,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r(10)(a,s);a.locals&&(e.exports=a.locals)},5:function(e,t,r){"use strict";var a=r(15),s=r.n(a),n={webBaseURL:window.location.origin,firebaseConfig:{apiKey:"",authDomain:"",databaseURL:"",projectId:"",storageBucket:"",messagingSenderId:"",appId:""},auth0Config:{domain:"",clientID:"",redirectUri:"http://localhost:8080/callback",audience:"",responseType:"token id_token",scope:"openid profile"}},o=document.head.querySelector('meta[name="csrf-token"]')||"",i=s.a.create({baseURL:n.webBaseURL,headers:{"X-Requested-With":"XMLHttpRequest","X-CSRF-TOKEN":o,Authorization:"Bearer ".concat(window.localStorage.getItem("access_token"))}});t.a={getUsers:function(e){return i.get("/api/users",{params:e})},getCommonData:function(){return i.get("/api/common_data",{})},createUser:function(e){return i.post("/api/users/create",e,{})},editUser:function(e){return i.get("/api/users/"+e+"/edit")},saveUser:function(e,t){return i.post("/api/users/"+e+"/save",t,{})},deleteUser:function(e){return i.delete("/api/users/"+e+"/delete")}}},59:function(e,t,r){"use strict";r(21)},60:function(e,t,r){(e.exports=r(4)(!1)).push([e.i,"\n.vs__dropdown-toggle{\n  height: 47px;\n}\n",""])},63:function(e,t,r){"use strict";r.r(t);var a=r(5),s=r(2);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var i={name:"AdminUsersCreate",props:["email","password","name"],components:{},computed:function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Object(s.b)({})),mounted:function(){this.$store.dispatch("Setting/activePageAction",{name:"Users"}),this.user.email=this.$props.email,this.user.password=this.$props.password,this.user.name=this.$props.name},data:function(){return{general_error:"",general_success:"",disableSubmit:!1,user:{email:"",password:"",name:"",photo:""}}},methods:{onChange:function(e){var t=e.target.files||e.dataTransfer.files;this.createImage(t[0])},createImage:function(e){new Image;var t=new FileReader,r=this;t.onload=function(e){r.user.photo=e.target.result},t.readAsDataURL(e)},onSubmit:function(){var e=this;this.general_error="",this.general_success="",this.disableSubmit=!0,a.a.createUser(this.user).then((function(t){var r=t.data;200==t.status&&200==r.code?(e.user=r.data.user,e.general_success=void 0!==r.message?r.message:"User Added Successfully!",e.disableSubmit=!1,e.$router.push({name:"website.users.list"}).catch((function(){}))):(e.$refs.form.setErrors(r.errors),e.general_error=void 0!==r.message?r.message:"")})).finally((function(){e.loading=!1,e.disableSubmit=!1}))}}},u=(r(59),r(3)),l=Object(u.a)(i,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container-fluid admin-fluid"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12 col-lg-12"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12 mb-4"},[r("div",{staticClass:"perfomance-bx gen-bx w-100 p-3"},[r("h3",[e._v("Create User")]),e._v(" "),r("div",{staticClass:"stock-box-outer"},[r("ValidationObserver",{ref:"form",scopedSlots:e._u([{key:"default",fn:function(t){var a=t.handleSubmit;return[r("form",{attrs:{name:"user_frm",id:"user_frm",novalidate:""},on:{submit:function(t){return t.preventDefault(),a(e.onSubmit)}}},[r("div",{staticClass:"form-row"},[r("div",{staticClass:"form-group col-md-5"},[r("ValidationProvider",{attrs:{vid:"name",name:"Name",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("label",{attrs:{for:"nameInput"}},[e._v("Name")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.name,expression:"user.name"}],class:"form-control mb-0"+(a.length>0?" is-invalid":""),attrs:{type:"text",id:"nameInput",placeholder:"Enter name",required:""},domProps:{value:e.user.name},on:{input:function(t){t.target.composing||e.$set(e.user,"name",t.target.value)}}}),e._v(" "),r("div",{staticClass:"invalid-feedback"},[r("span",[e._v(e._s(a[0]))])])]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"form-group col-md-5"},[r("ValidationProvider",{attrs:{vid:"surname",name:"surname",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("label",{attrs:{for:"surnameInput"}},[e._v("Surname")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.surname,expression:"user.surname"}],class:"form-control mb-0"+(a.length>0?" is-invalid":""),attrs:{type:"text",id:"surnamenput",placeholder:"Enter surname",required:""},domProps:{value:e.user.surname},on:{input:function(t){t.target.composing||e.$set(e.user,"surname",t.target.value)}}}),e._v(" "),r("div",{staticClass:"invalid-feedback"},[r("span",[e._v(e._s(a[0]))])])]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"form-group col-md-5"},[r("ValidationProvider",{attrs:{vid:"email",name:"E-mail",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("label",{attrs:{for:"emailInput"}},[e._v("Email address")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],class:"form-control mb-0"+(a.length>0?" is-invalid":""),attrs:{type:"email",id:"emailInput",placeholder:"Enter email",required:""},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}}),e._v(" "),r("div",{staticClass:"invalid-feedback"},[r("span",[e._v(e._s(a[0]))])])]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"form-group col-md-5"},[r("ValidationProvider",{attrs:{vid:"phone",name:"phone",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("label",{attrs:{for:"passwordInput"}},[e._v("Phone")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.phone,expression:"user.phone"}],class:"form-control mb-0"+(a.length>0?" is-invalid":""),attrs:{type:"text",id:"phoneInput",placeholder:"Enter contact no",required:""},domProps:{value:e.user.phone},on:{input:function(t){t.target.composing||e.$set(e.user,"phone",t.target.value)}}}),e._v(" "),r("div",{staticClass:"invalid-feedback"},[r("span",[e._v(e._s(a[0]))])])]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"form-group col-md-5"},[r("ValidationProvider",{attrs:{vid:"company",name:"Company",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("label",{attrs:{for:"emailInput"}},[e._v("Company")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.user.company,expression:"user.company"}],class:"form-control mb-0"+(a.length>0?" is-invalid":""),attrs:{type:"text",id:"companyInput",placeholder:"Enter company",required:""},domProps:{value:e.user.company},on:{input:function(t){t.target.composing||e.$set(e.user,"company",t.target.value)}}}),e._v(" "),r("div",{staticClass:"invalid-feedback"},[r("span",[e._v(e._s(a[0]))])])]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"form-group col-md-5"},[r("ValidationProvider",{attrs:{vid:"address",name:"address",rules:"max:30"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("label",{attrs:{for:"addressInput"}},[e._v("Address")]),e._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.user.address,expression:"user.address"}],class:"form-control mb-0"+(a.length>0?" is-invalid":""),attrs:{type:"textarea",id:"addressInput",placeholder:"Enter address",required:""},domProps:{value:e.user.address},on:{input:function(t){t.target.composing||e.$set(e.user,"address",t.target.value)}}}),e._v(" "),r("div",{staticClass:"invalid-feedback"},[r("span",[e._v(e._s(a[0]))])])]}}],null,!0)})],1),e._v(" "),r("div",{staticClass:"form-group col-md-5"},[r("label",{attrs:{for:"imageInput"}},[e._v("Upload photo ")]),r("br"),e._v(" "),r("input",{class:"mb-0",attrs:{type:"file",id:"imageInput"},on:{change:e.onChange}})])]),e._v(" "),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Create")])])]}}])})],1)])])])])])])}),[],!1,null,null,null);t.default=l.exports}}]);