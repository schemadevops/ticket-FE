<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center vh-100">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('http://127.0.0.1:8000/api/user/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        console.log(response);
        // Simpan token atau data login lainnya di sini
        // Misalnya, menyimpan token ke localStorage
        localStorage.setItem('token', response.data.data);

        // Redirect ke halaman dashboard
        this.$router.push('/dashboard');
      })
      .catch(error => {
        console.error('Login error:', error.data);
      });
    }
  }
};
</script>
