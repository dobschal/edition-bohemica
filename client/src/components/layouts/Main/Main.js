import Hammer from "hammerjs";
import { isMobileDevice } from "../../../util";

export default {
    data() 
    {
        return {
            sidebarToggled: true,
            title: ""
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
            if( window.innerWidth < 768 )
            {
                this.sidebarToggled = false;
            }
            else
            {
                this.sidebarToggled = true;
            }
        }; 
        
        if( isMobileDevice() )
        {
            
            // Uncomment this to enable text selection and swipe to toggle menu at same time.
            // delete Hammer.defaults.cssProps.userSelect;
    
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