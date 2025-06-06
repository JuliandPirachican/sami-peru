// Cargar Globalize antes de cualquier otro componente que lo necesite
import 'jqwidgets-scripts/jqwidgets/globalization/globalize.js';

// Evitar errores si otros scripts esperan que Globalize exista
window.Globalize = window.Globalize || {};

import App from '@/App.vue';
import { registerPlugins } from '@core/utils/plugins';
import { createApp } from 'vue';

// Styles
import '@core/scss/template/index.scss';
import '@styles/styles.scss';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material.css';
import 'sweetalert2/dist/sweetalert2.min.css';

// Create vue app
const app = createApp(App)


// Register plugins
registerPlugins(app)

// Mount vue app
app.mount('#app')
