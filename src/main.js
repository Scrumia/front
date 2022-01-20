import { createApp } from "vue";
import axios from 'axios'

import App from "./App.vue";
import router from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.config.globalProperties.axios = axios;
app.use(router).component("font-awesome-icon", FontAwesomeIcon).mount("#app");

