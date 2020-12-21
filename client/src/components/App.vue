<template>
    <transition name="fade" mode="out-in" >
        <router-view class="slow-fade"></router-view>
    </transition>
</template>

<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- -- -- -- -- -- -- -->

<script>

    import { HTTP } from "../util";
    import toastr from "toastr";

    export default {
        created()
        {
            this.loadContent();
            this.sendStats();
            this.getStats();
        },
        methods:
        {
            async getStats()
            {
                try
                {
                    const response = await HTTP().get("/statistic/count");
                    console.log("[App] Got statistics: ", response.data);
                    this.$store.commit("storeUserAmount", response.data.amount);
                }
                catch(e)
                {
                    console.error("[App] Unable to get stats: ", e);
                }
            },
            async sendStats()
            {
                try
                {
                    const response = await HTTP().post("/statistic", {
                        userAgent: window.navigator.userAgent
                    });
                }
                catch(e)
                {
                    console.error("[App] Unable to send stats: ", e);
                }
            },
            async loadContent()
            {
                try
                {
                    const response = await HTTP().get("/content");
                    let contents = {};
                    response.data.forEach(contentItem => {
                        contents[ contentItem.id ] = contentItem.text;
                    });
                    this.$store.commit("storeContent", contents);
                }
                catch(e)
                {
                    console.error("[App] Error on loading content.", e);
                    toastr.error( this.$t("general.error.load") );
                }
            }
        }
    };
</script>

<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- -- -- -- -- -- -- -->

<style lang="scss">

    @import "../styles/breakpoint-toggle.scss";
    @import "../styles/variables.scss";
    @import "../styles/bootstrap-theme.scss";
    @import "../../node_modules/bootstrap/scss/bootstrap.scss";
    @import "../styles/animation.scss";
    @import "../../node_modules/toastr/build/toastr.css";
    @import "../styles/toasts.scss";
    @import "../styles/tooltips.scss";
    @import "../styles/buttons.scss";

    body
    {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    //  Inside the container-fluid is a default 15px padding
    //  remove this with a page-wrapper class and add a margin
    //  to the sidebar and the topbar
    .page-wrapper
    {
        margin: 0 -15px;
        padding: 24px 48px;

        > .row
        {
            margin: 0;
        }
    }

    p
    {
        margin: 0;
    }

    .alert {
        border-radius: 0;

        &.alert-info {
            background-color: #c1e7da;
        }
    }

</style>
