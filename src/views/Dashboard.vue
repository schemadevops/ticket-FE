<template>
    <div>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
            <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <div class="navbar-nav">
              <div class="nav-item text-nowrap">
                <a class="nav-link px-3" href="/">Sign out</a>
              </div>
            </div>
          </header>
          
          <div class="container-fluid">
            <div class="row">
              <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                <div class="position-sticky pt-3">
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a class="nav-link text-white" aria-current="page" href="/dashboard">
                        <span data-feather="home"></span>
                        Dashboard
                      </a>
                    </li>
                    
                  </ul>
          
         
                </div>
              </nav>
          
              <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 class="h2">All Tiket</h1>
                  <a href="/tambah" class="btn btn-success"><i class="fas fa-plus-circle"></i> Add Tiket</a>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tiket ID</th>
                            <th>User</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Category</th>
                            <th>Last Reply</th>
                            <th>Status</th>
                            <th>Assigned</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(user, index) in tikers" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.uniq_id }}</td>
                            <td>{{ user.user }}</td>
                            <td>{{ user.subject }}</td>
                            <td>{{ user.priority }}</td>
                            <td>{{ user.category }}</td>
                            <td>{{ user.last_reply }}</td>
                            <td><span class="badge rounded-pill bg-info">{{ user.status }}</span></td>
                            <td><span class="badge rounded-pill bg-primary">{{ user.assigned }}</span></td>
                            <td>
                              <button type="button" class="btn btn-primary" @click="reply(user.id)"><i class="fa fa-reply mr-4" aria-hidden="true"></i></button>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                </div>
              </main>
            </div>
          </div>
    </div>
   
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'Dashboard',
    data() {
    return {
      tikers: []
    };
  },
  mounted() {
    this.get_all()
  },
  methods: {
    async get_all(){
        let accessToken = localStorage.getItem('token');
            // Konfigurasi Axios
            const config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/ticket/get_all',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': accessToken ? 'Bearer ' + accessToken : ''
            }
            
        };
        await axios(config)
            .then(response => {
                console.log(response.data);
              this.tikers = response.data.data;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
    },

    async reply(id){
      localStorage.setItem('id_tiket', id);
      
      // Redirect ke halaman dashboard
      this.$router.push('/reply');
    }
  }
  };
  </script>
  
  <style scoped>
/* Styling for the component */
#sidebar {
  position: fixed;
  top: 20;
  left: 0;
  height: 100vh; /* Set tinggi sidebar hingga 100% tinggi viewport */
  width: 250px; /* Atur lebar sidebar sesuai kebutuhan */
  z-index: 1000; /* Set z-index agar sidebar di atas konten */
  overflow-y: auto; /* Aktifkan overflow jika konten melebihi tinggi sidebar */
  background-color: aliceblue;
  color: black;
}

@media (max-width: 991.98px) {
  #sidebar {
    position: static; /* Sidebar statis di layar kecil */
    height: auto; /* Set tinggi sidebar menjadi otomatis */
  }
}
</style>
