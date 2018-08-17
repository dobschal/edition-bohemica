
/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 04/16/2018
 * Define which components to load on which route.
 */

//  Layouts
import MainLayout from '../components/layouts/Main/Main.vue';

//  Pages
import DashboardPage from "../components/pages/Dashboard/Dashboard.vue";
import CartPage from "../components/pages/Cart/Cart.vue";
import CartCheckoutPage from "../components/pages/Cart/Checkout.vue";
import ProductPage from "../components/pages/Product/Product.vue";
import LoginPage from "../components/pages/Login.vue";
import NewsPage from "../components/pages/News.vue";
import PDFPage from "../components/pages/PDFPage.vue";

import NotFoundPage from "../components/pages/NotFound.vue";

import BackendPage from "../components/pages/Backend/Overview/Overview.vue";
import BackendProductNewPage from "../components/pages/Backend/NewProduct/NewProduct.vue";
import BackendProductEditPage from "../components/pages/Backend/EditProduct/EditProduct.vue";
import BackendContentEditPage from "../components/pages/Backend/EditContent/EditContent.vue";
import BackendContentsPage from "../components/pages/Backend/Contents/Contents.vue";
import BackendPortoPage from "../components/pages/Backend/Porto.vue";
import BackendProgramPage from "../components/pages/Backend/Program.vue";

// Partials

export default [
    { 
        path: "/cart", 
        component: MainLayout,  
        children: [{ path: "", components: { default: CartPage } }]        
    }, 
    { 
        path: "/admin/program", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendProgramPage }, meta: { secured: true } }]        
    },
    { 
        path: "/admin/porto", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendPortoPage }, meta: { secured: true } }]        
    }, 
    { 
        path: "/admin/content", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendContentsPage }, meta: { secured: true } }]        
    }, 
    { 
        path: "/admin/content/:contentId", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendContentEditPage }, meta: { secured: true } }]        
    }, 
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
        path: "/pdfpage/:id", 
        component: MainLayout,  
        children: [{ path: "", components: { default: PDFPage } }]        
    }, 
    { 
        path: "/news", 
        component: MainLayout,  
        children: [{ path: "", components: { default: NewsPage } }]        
    }, 
    { 
        path: "/cart/checkout/:productId", 
        component: MainLayout,  
        children: [{ path: "", components: { default: CartCheckoutPage } }]        
    },
    { 
        path: "/product/:productId", 
        component: MainLayout,  
        children: [{ path: "", components: { default: ProductPage } }]        
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