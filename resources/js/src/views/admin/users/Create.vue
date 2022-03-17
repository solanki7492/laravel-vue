<template>
  <div class="container-fluid admin-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <div class="row">
            <div class="col-md-12 mb-4">
              <div class="perfomance-bx gen-bx w-100 p-3">
                <h3>Create User</h3>
                <div class="stock-box-outer">
                  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
                    <form name="user_frm" id="user_frm" novalidate @submit.prevent="handleSubmit(onSubmit)">
                      <div class="form-row">
                          <div class="form-group col-md-5">
                            <ValidationProvider vid="name" name="Name" rules="required" v-slot="{ errors }">
                                <label for="nameInput">Name</label>
                                <input
                                  type="text"
                                  :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                  id="nameInput"
                                  v-model="user.name"
                                  placeholder="Enter name"
                                  required
                                />
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                          </div>
                          <div class="form-group col-md-5">
                            <ValidationProvider vid="surname" name="surname" rules="required" v-slot="{ errors }">
                                <label for="surnameInput">Surname</label>
                                <input
                                  type="text"
                                  :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                  id="surnamenput"
                                  v-model="user.surname"
                                  placeholder="Enter surname"
                                  required
                                />
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                          </div>
                          <div class="form-group col-md-5">
                            <ValidationProvider vid="email" name="E-mail" rules="required|email" v-slot="{ errors }">
                                <label for="emailInput">Email address</label>
                                <input
                                  type="email"
                                  :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                  id="emailInput"
                                  v-model="user.email"
                                  placeholder="Enter email"
                                  required
                                />
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                          </div>
                          <div class="form-group col-md-5">
                              <ValidationProvider vid="phone" name="phone" rules="required" v-slot="{ errors }">
                                  <label for="passwordInput">Phone</label>
                                  <input
                                    type="text"
                                    :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                    id="phoneInput"
                                    v-model="user.phone"
                                    placeholder="Enter contact no"
                                    required
                                  />
                                  <div class="invalid-feedback">
                                    <span>{{ errors[0] }}</span>
                                  </div>
                              </ValidationProvider>
                          </div>
                          <div class="form-group col-md-5">
                            <ValidationProvider vid="company" name="Company" rules="required" v-slot="{ errors }">
                                <label for="emailInput">Company</label>
                                <input
                                  type="text"
                                  :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                  id="companyInput"
                                  v-model="user.company"
                                  placeholder="Enter company"
                                  required
                                />
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                          </div>
                          <div class="form-group col-md-5">
                            <ValidationProvider vid="address" name="address" rules="max:30" v-slot="{ errors }">
                                <label for="addressInput">Address</label>
                                <textarea
                                  type="textarea"
                                  :class="'form-control mb-0' +(errors.length > 0 ? ' is-invalid' : '')"
                                  id="addressInput"
                                  v-model="user.address"
                                  placeholder="Enter address"
                                  required
                                />
                                <div class="invalid-feedback">
                                  <span>{{ errors[0] }}</span>
                                </div>
                            </ValidationProvider>
                          </div>
                          <div class="form-group col-md-5">
                                <label for="imageInput">Upload photo </label><br>
                                <input type="file" id="imageInput" :class="'mb-0'" v-on:change="onChange">
                          </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Create</button>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style type="text/css">
  .vs__dropdown-toggle{
    height: 47px;
  }
</style>
<script>
import user from "../../../services/user";  
import { mapGetters } from "vuex";
export default {
  name: "AdminUsersCreate",
  props: ["email", "password","name"],
  components: {},
  computed: {
    ...mapGetters({
      //users: "User/usersState"
    })
  },
  mounted() {
    this.$store.dispatch('Setting/activePageAction', { name : "Users"})
    this.user.email = this.$props.email;
    this.user.password = this.$props.password;
    this.user.name = this.$props.name;
  },
  data () {
    return {
      general_error:'',
      general_success:'',
      disableSubmit : false,
      user: {
        email: "",
        password: "",
        name: "",
        photo: ""
      }
    }
  },
  methods: {
    onChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.onload = (e) => {
        vm.user.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onSubmit () {
        
      this.general_error   = "";
      this.general_success = "";
      this.disableSubmit   = true;
      
      user
        .createUser(this.user)
        .then(response => {
          var result = response.data;
          if (response.status == 200 && result.code == 200) {
            this.user    = result.data.user;
            this.general_success = (typeof result.message !== 'undefined') ? result.message : "User Added Successfully!";
            this.disableSubmit   = false;
            this.$router.push({ name: "website.users.list" }).catch(()=>{});
          } else {
            this.$refs.form.setErrors(result.errors);
            this.general_error = (typeof result.message !== 'undefined') ? result.message : "";
          }
        })
        .finally(() => {
          this.loading = false;
          this.disableSubmit = false;
        });
    },
  }
};
</script>