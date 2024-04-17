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
                  <h1 class="h2">Reply Tiket</h1>
                  <a href="/dashboard" class="btn btn-success"><i class="fas fa-arrow-left"></i> Kembali</a>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="card my-2">
                      <div class="card-header">
                        <div class="d-flex justify-content-between">
                          <h4>{{ tiket.uniq_id }} - {{ tiket.user }} <span class="text-success">assign to</span> {{ tiket.assigned }}</h4>
                          <h4>{{ tiket.category }}</h4>
                        </div>
                        
                      </div>
                      <div class="card-body">
                        <div class="d-flex justify-content-between">
                          <h3 class="card-title">{{ tiket.subject }}</h3>
                          <h6 class="card-title">{{ tiket.created_at }}</h6>
                        </div>
                        <h6 class="card-subtitle mb-2 text-muted">{{ tiket.priority }} - {{ tiket.status }}</h6>
                        <p class="card-text">{{ tiket.description }}</p>
                        <div v-if="tiket.attachment">
                          <a :href="`http://127.0.0.1:8000/upload_manual/${tiket.attachment}`" target="_blank" rel="noopener noreferrer">{{ tiket.attachment }}</a>
                        </div>                        
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12 p-2" v-for="message in messages" :key="message.id">
                    <div class="card" style="margin-left: 10%;">
                      <div class="card-body">
                        <h5 class="card-title">{{ message.user }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ message.created_at }}</h6>
                        <p class="card-text">{{ message.reply }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <form @submit.prevent="sendMessage">
                      <div class="row">
                        <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="newMessage" placeholder="Masukkan balasan...">
                        </div>
                        <div class="col-sm-2">
                          <button type="submit" class="btn btn-xs btn-success">Kirim</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            </div>
          </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Reply',
    data() {
    return {
      tikers: [],
      data: {
        subject: '',
        category: '1', // Memastikan Kategori 1 dipilih secara default
        assign: '1',
        priority: 'low',
        description: '',
        attachment: null, // File attachment
      },
      divisions : [],
      messages: [],
      tiket:[],
      newMessage: ''
    };
  },
  mounted() {
    this.get_reply()
  },
  methods: {
    async get_reply(){
      let accessToken = localStorage.getItem('token');
      let id_tiket = localStorage.getItem('id_tiket');
            // Konfigurasi Axios
            const config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/ticket/reply/'+ id_tiket,
            maxBodyLength: Infinity,
            headers: {
                'Authorization': accessToken ? 'Bearer ' + accessToken : ''
            }
            
        };
        await axios(config)
            .then(response => {
                console.log(response.data);
                this.messages = response.data.data?.reply;
                this.tiket = response.data.data?.ticket;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
      },
      async sendMessage() {
        if (this.newMessage.trim() != ''){

          let data = {
            id_ticket : this.tiket.id,
            reply : this.newMessage
          }
          let accessToken = localStorage.getItem('token');
            // Konfigurasi Axios
            const config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/ticket/reply',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': accessToken ? 'Bearer ' + accessToken : ''
            },
            data : data
        };
        await axios(config)
            .then(response => {
                console.log(response.data);
                this.get_reply()
                this.newMessage = ''
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        }else{
          alert('Masukan pesan untuk membalas!')
        }
      },
     
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
