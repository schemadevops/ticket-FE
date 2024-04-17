// import './assets/main.css'

import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

const app = createApp(App)

app.use(router)
app.mount('#app')