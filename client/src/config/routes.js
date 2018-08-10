
/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 04/16/2018
 * Define which components to load on which route.
 */

//  Layouts
import MainLayout from '../components/layouts/Main/Main.vue';

//  Pages
import DashboardPage from "../components/pages/Dashboard/Dashboard.vue";
import LoginPage from "../components/pages/Login.vue";
import NotFoundPage from "../components/pages/NotFound.vue";
import BackendPage from "../components/pages/Backend/Overview/Overview.vue";
import BackendProductNewPage from "../components/pages/Backend/NewProduct/NewProduct.vue";
import BackendProductEditPage from "../components/pages/Backend/EditProduct/EditProduct.vue";

// Partials

export default [
    { 
        path: "/admin/product/new", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendProductNewPage }, meta: { secured: true } }]        
    },    
    { 
        path: "/admin/product/:productId", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendProductEditPage }, meta: { secured: true } }]        
    },    
    { 
        path: "/admin", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendPage }, meta: { secured: true } }]
    },   
    { 
        path: "/login", 
        component: MainLayout,  
        children: [{ path: "", components: { default: LoginPage } }]
    },   
    { 
        path: "/", 
        component: MainLayout,  
        children: [{ path: "", components: { default: DashboardPage } }]
    },
    {   // 404
        path: "*", 
        component: MainLayout,  
        children: [{ path: "", components: { default: NotFoundPage } }]
    }
];