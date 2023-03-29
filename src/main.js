import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

// main css
import './assets/scss/index.scss'
/* add icons to the library */
library.add(fas,fab,far);

createApp(App)
.use(store)
.use(router)
.use(VueAxios,axios)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
