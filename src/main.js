import { createApp } from 'vue';
import App from './App.vue';
import router from './router';



import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const VueApp = createApp(App);
VueApp.use(router).mount('#app');


