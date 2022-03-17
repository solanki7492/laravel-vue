<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <div class="row">
            <div class="col-md-12 mb-4">
              <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-10">
                  <div class="btn-group btn-group-sm" role="group">
                    <div class="form-group form-group-sm">
                        <input class="form-control" v-model="search.name" type="text" placeholder="Search User" value="">
                    </div>
                    <div class="form-group form-group-sm ml-3">
                        <input class="form-control" v-model="search.company" type="text" placeholder="Filter company" value="">
                    </div>
                    <div class="form-group form-group-sm ml-3">
                        <button class="btn btn-secondary my-2 my-sm-0" @click="searchRecords" type="button"><i class="fa fa-search"></i></button>
                    </div>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-2">
                    <router-link :to="{ path: '/users/create'}">
                        <button type="button" class="button btn btn-secondary btn-xsmall float-right"><i class="fa fa-plus"></i></button>
                    </router-link>
                </div>
              </div>
              <div class="perfomance-bx gen-bx w-100 p-3">
                <h3>Users</h3>
                <div class="stock-box-outer table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Email</th>
                          <th scope="col">Name</th>
                          <th scope="col">Surname</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Company</th>
                          <th scope="col">Address</th>
                          <th scope="col">Photo</th>
                          <th scope="col">Created At</th>
                          <th scope="col">Action</th>
                        </tr>  
                      </thead>
                      <tbody>
                        <tr v-for="user in users.data">
                          <td>{{user.id}}</td>
                          <td>{{user.email}}</td>
                          <td>{{user.name}}</td>
                          <td>{{user.surname}}</td>
                          <td>{{user.phone}}</td>
                          <td>{{user.company}}</td>
                          <td>{{user.address}}</td>
                          <td v-if="user.photo"><img :src="'/storage/'+user.photo" width="50" height="50"></img></td>
                          <td v-else="user.photo">-</td>
                          <td>{{user.created_at}}</td>
                          <td>
                            <router-link :to="{ path: '/users/'+user.id+'/edit'}">
                                <i class="fa fa-edit"></i>
                            </router-link>
                            <a @click="deleteUser(user.id)">
                                <i class="fa fa-trash"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                <div class="row mt-4">
                    <div class="col-md-12 text-center">
                        <div class="pagination-links d-inline-block" v-if="(users.data.length > 0)">
                            <paginate
                                :page-count="users.paginate.last_page"
                                :page-range="3"
                                :margin-pages="2"
                                :click-handler="nextPage"
                                :prev-text="'Prev'"
                                :next-text="'Next'"
                                :container-class="'pagination'"
                                :page-class="'page-item'"
                                :page-link-class="'page-link'"
                                :prev-class="'page-item'"
                                :prev-link-class="'page-link'"
                                :next-class="'page-item'"
                                :next-link-class="'page-link'"
                                >
                            </paginate>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Paginate from 'vuejs-paginate'  
import user from "../../../services/user";  
import { mapGetters } from "vuex";
export default {
  name: "AdminUsersList",
  props: [],
  components: {Paginate},
  computed: {
    ...mapGetters({
      users: "User/usersState"
    })
  },
  mounted() {
    this.$store.dispatch('Setting/activePageAction', { name : "Users"})
    this.getRecords();
  },
  data: () => ({
    search: {
      name: "",
      company: "",
      page:""
    }
  }),
  methods: {
    searchRecords () {
      this.getRecords();
    },
    nextPage(pageNum, nextPageUrl) {
        this.search.page = pageNum;
        this.getRecords();
    },
    getRecords() {
      user
        .getUsers(this.search)
        .then(response => {
          if (response.status) {
            this.$store.dispatch('User/addUsersAction', response.data)
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteUser(id)  {
      if(confirm("are you sure you want to delete?")) {
        user
          .deleteUser(id)
          .then(response => {
            if (response.status) {
              this.$bvToast.toast((typeof response.data.message !== 'undefined') ? response.data.message : "User Deleted Successfully!", {
                  title: `Success!`,
                  variant: 'success',
                  solid: true,
                  noAutoHide: false
                });
            }
          })
          .finally(() => {
            this.getRecords();
          });
      }
    }
  }
};
</script>