import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEdit, faTrash);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
