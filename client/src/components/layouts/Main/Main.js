import Hammer from "hammerjs";
import { isMobileDevice } from "../../../util";

export default {
    data() 
    {
        return {
            sidebarToggled: false,
            title: "",
            userAmount: this.$store.getters.userAmount
        };
    },
    watch: {
        '$route'(to, from)
        {
            console.log("[MainLayout] The route changed...", to, from);           
        }
    },
    mounted()
    {
        window.onresize = () => {
            this.sidebarToggled = window.innerWidth >= 768;
        }; 
        this.sidebarToggled = window.innerWidth >= 768;
        
        if( isMobileDevice() )
        {   
            var hammertime = new Hammer( document.getElementById("wrapper") );
            hammertime.get('pan').set({ threshold: 100 });
            hammertime.on('panleft', e => {
                console.log("[Main] User is swiping.", e);
                this.sidebarToggled = false;      
            });
            hammertime.on('panright', e => {
                console.log("[Main] User is swiping.", e);
                this.sidebarToggled = true;
            });    
        }
    },
    methods:
    {
        toggleSidebar()
        {
            this.sidebarToggled = !this.sidebarToggled;
        },
        changeTitle( title )
        {
            this.title = title;
        }
    }
};