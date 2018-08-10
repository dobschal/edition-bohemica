
/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 07/16/2018
 * Entry of the javascript application. 
 */

import 'jquery';
import 'babel-polyfill';
import 'bootstrap';
import "./interceptors";
import "./filters";

import App from './components/App.vue';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import VTooltip from 'v-tooltip'

import toastr from 'toastr';

import dictionary from "./config/dictionary";
import routes from "./config/routes";
import store from "./store";
import config from './config';
import { addComponents } from "./config/components";

console.log(`\n[Main] Application started.\n               API: ${config.ROOT_API}\n               Version: ${config.VERSION}\n               Build number: ${config.BUILD_NUMBER}\n\n`);

toastr.options.closeButton = true;
toastr.options.closeMethod = 'fadeOut';
toastr.options.closeDuration = 300;
toastr.options.hideDuration = 300;
toastr.options.closeEasing = 'swing';

Vue.use(VTooltip);

//  Language switch works as follow:
//  http://kazupon.github.io/vue-i18n/guide/locale.html
Vue.use(VueI18n);
export const i18n = new VueI18n({
    fallbackLocale: "de",
    locale: "de",
    messages: dictionary
});

//  See the docs for more details:
//  https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
Vue.use(VueRouter);
export const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
    if( to.meta.secured && !store.getters.token )
    {        
        toastr.error(i18n.t("general.error.unauthorized"));
        return next("/login");
    }
    return next();
});

//  Add all in config/components declared 
//  components to the project
addComponents();

export default new Vue({
    el: '#app',
    router,
    i18n,
    store,
    render: h => h(App)
});
