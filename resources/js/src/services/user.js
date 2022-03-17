import axios from './index'

export default {
  getUsers (search) {
    return axios.get('/api/users',{params: search})
  },
  getCommonData () {
    return axios.get('/api/common_data',{})
  },
  createUser (userData) {
    return axios.post('/api/users/create', userData, {})
  },
  editUser (id) {
    return axios.get('/api/users/'+id+'/edit')
  },
  saveUser (id,userData) {
    return axios.post('/api/users/'+id+'/save', userData, {})
  },
  deleteUser (id) {
    return axios.delete('/api/users/'+id+'/delete')
  }
}
