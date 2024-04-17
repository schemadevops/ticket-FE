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
                  <h1 class="h2">Tambah Tiket</h1>
                  <a href="/dashboard" class="btn btn-success"><i class="fas fa-arrow-left"></i> Kembali</a>
                </div>
                <form @submit.prevent="submitForm">
                  <div class="mb-3">
                    <label for="subject" class="form-label">Subject</label>
                    <input type="text" class="form-control" id="subject" aria-describedby="emailHelp" v-model="data.subject" required>
                  </div>
                  <div class="mb-3">
                    <label for="category" class="form-label">Category</label>
                    <select id="category" class="form-select" v-model="data.category">
                      <option value="1" selected>Kategori 1</option>
                      <option value="2">Kategori 2</option>
                      <option value="3">Kategori 3</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="assign" class="form-label">Assign Division</label>
                    <select id="assign" class="form-select" v-model="data.assign">
                      <option v-for="division in divisions" :key="division.id" :value="division.id">{{ division.fullname }}</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="priority" class="form-label">Priority</label>
                    <select id="priority" class="form-select" v-model="data.priority">
                      <option value="low" selected>Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <br/>
                    <textarea cols="30" rows="10" id="description" v-model="data.description"></textarea>
                  </div>
                  <div class="mb-3">
                    <label for="attachment" class="form-label">Attachment</label>
                    <input type="file" class="form-control" id="attachment" @change="handleFileChange">
                  </div>
              
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </main>
            </div>
          </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Tambah',
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
      divisions : []
    };
  },
  mounted() {
    this.get_assign()
  },
  methods: {
    async get_assign(){
        let accessToken = localStorage.getItem('token');
        console.log(accessToken);
            // Konfigurasi Axios
            const config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/ticket/assign',
            maxBodyLength: Infinity,
            headers: {
                'Authorization': accessToken ? 'Bearer ' + accessToken : ''
            }
            
        };
        await axios(config)
            .then(response => {
                console.log(response.data);
              this.divisions = response.data.data;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },
      handleFileChange(event) {
          // Mengambil file yang diunggah
          this.data.attachment = event.target.files[0];
        },
      async submitForm() {
        let accessToken = localStorage.getItem('token');
        let data = new FormData();
        data.append('subject', this.data.subject);
        data.append('id_category', this.data.category);
        data.append('id_assign', this.data.assign);
        data.append('priority', this.data.priority);
        data.append('description', this.data.description);
        data.append('attachment', this.data.attachment);

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/ticket/create',
          headers: { 
            'Authorization': 'Bearer ' + accessToken, 
            
          },
          data : data
        };
        try {
          const response = await axios(config);
          console.log(response.data);
          // Tampilkan notifikasi SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Form submitted successfully'
          }).then(() => {
            // Alihkan ke dashboard setelah notifikasi ditutup
            this.$router.push('/dashboard');
          });
        } catch (error) {
          console.error('Error fetching data:', error.response.data.message);
        }
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
