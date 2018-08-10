import Vue from "vue";

import TDSButtonComponent from '../components/partials/TDSButton.vue';
import SidebarComponent from "../components/partials/Sidebar.vue";

export function addComponents()
{
    Vue.component("tds-button", TDSButtonComponent);
    Vue.component("sidebar", SidebarComponent);
}