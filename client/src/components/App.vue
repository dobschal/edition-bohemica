<template>
    <transition name="fade" mode="out-in" >
        <router-view class="slow-fade"></router-view>
    </transition>
</template>

<!-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --  -- -- -- -- -- -- -- -- -->

<script>
    export default {};
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

    body
    {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

</style>
