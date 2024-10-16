// import Hammer from "hammerjs";
// import {isMobileDevice} from "../../../util";

export default {
    computed:
        {
            cartNotEmpty() {
                return this.$store.getters.cart.length ? true : false;
            }
        },
    data() {
        return {
            sidebarToggled: false,
            isSmallScreen: false,
            title: "",
            userAmount: 305100 + this.$store.getters.userAmount // old amount plus real one
        };
    },
    watch: {
        '$route'(to, from) {
            console.log("[MainLayout] The route changed...", to, from);
        }
    },
    mounted() {
        window.onresize = () => {
            this.sidebarToggled = window.innerWidth >= 768;
            this.isSmallScreen = window.innerWidth < 768;
        };
        this.sidebarToggled = window.innerWidth >= 768;
        this.isSmallScreen = window.innerWidth < 768;

        // if (isMobileDevice()) {
        //     var hammertime = new Hammer(document.getElementById("wrapper"));
        //     hammertime.get('pan').set({threshold: 300});
        //     hammertime.on('panleft', e => {
        //         console.log("[Main] User is swiping.", e);
        //         this.sidebarToggled = false;
        //     });
        //     hammertime.on('panright', e => {
        //         console.log("[Main] User is swiping.", e);
        //         this.sidebarToggled = true;
        //     });
        // }
    },
    methods:
        {
            toggleSidebar() {
                this.sidebarToggled = !this.sidebarToggled;
            },
            changeTitle(title) {
                this.title = title;
            },
            goToCart() {
                this.$router.push("/cart");
            }
        }
};
