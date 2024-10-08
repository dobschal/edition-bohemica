
/**
 * @author Sascha Dobschal <s.dobschal@tdsoftware.de>
 * date 04/16/2018
 * Define which components to load on which route.
 */

//  Layouts
import MainLayout from '../components/layouts/Main/Main.vue';

//  Pages
import DashboardPage from "../components/pages/Dashboard/Dashboard.vue";
import InPreparationPage from "../components/pages/InPreparation.vue";
import CartPage from "../components/pages/Cart/Cart.vue";
import CartCheckoutPage from "../components/pages/Cart/Checkout.vue";
import ProductPage from "../components/pages/Product/Product.vue";
import LoginPage from "../components/pages/Login.vue";
import SimpleContentPage from "../components/pages/SimpleContent.vue";
import ContactPage from "../components/pages/Conact.vue";

import NotFoundPage from "../components/pages/NotFound.vue";

import BackendProductsPage from "../components/pages/Backend/Products/Products.vue";
import BackendProductNewPage from "../components/pages/Backend/NewProduct/NewProduct.vue";
import BackendProductEditPage from "../components/pages/Backend/EditProduct/EditProduct.vue";
import BackendContentEditPage from "../components/pages/Backend/EditContent/EditContent.vue";
import BackendContentsPage from "../components/pages/Backend/Contents/Contents.vue";
import BackendPortoPage from "../components/pages/Backend/Porto.vue";
import BackendPdfPage from "../components/pages/Backend/PDFPage.vue";

// Partials

export default [
    { 
        path: "/contact", 
        component: MainLayout,  
        children: [{ path: "", components: { default: ContactPage } }]        
    },
    { 
        path: "/cart", 
        component: MainLayout,  
        children: [{ path: "", components: { default: CartPage } }]        
    }, 
    { 
        path: "/admin/pdf", 
        component: MainLayout,  
        children: [{ path: "", components: { default: BackendPdfPage }, meta: { secured: true } }]        
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
        children: [{ path: "", components: { default: BackendProductsPage }, meta: { secured: true } }]
    },   
    { 
        path: "/login", 
        component: MainLayout,  
        children: [{ path: "", components: { default: LoginPage } }]
    },   
    { 
        path: "/content/:contentId", 
        component: MainLayout,  
        children: [{ path: "", components: { default: SimpleContentPage } }]        
    }, 
    { 
        path: "/cart/checkout", 
        component: MainLayout,  
        children: [{ path: "", components: { default: CartCheckoutPage } }]        
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
        path: "/inpreparation", 
        component: MainLayout,  
        children: [{ path: "", components: { default: InPreparationPage } }]        
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