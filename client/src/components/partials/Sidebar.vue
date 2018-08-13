<template>
    <div>
        <router-link to="/" class="brand"></router-link>
        <nav>
            <ul v-if="!isAuthenticated">
                <li>
                    <router-link to="/program">{{ $t("navigation.program") }}</router-link>
                </li>
                <li>
                    <router-link to="/coming-soon">{{ $t("navigation.comingSoon") }}</router-link>
                </li>
                <li>
                    <router-link to="/trader">{{ $t("navigation.trader") }}</router-link>
                </li>
                <li></li>
                <li>
                    <router-link to="/portrait">{{ $t("navigation.portrait") }}</router-link>
                </li>
                <li>
                    <router-link to="/travel">{{ $t("navigation.travel") }}</router-link>
                </li>
                <li>
                    <router-link to="/images">{{ $t("navigation.images") }}</router-link>
                </li>
                <li></li>
                <li>
                    <router-link to="/agb">{{ $t("navigation.agb") }}</router-link>
                </li>
                <li>
                    <router-link to="/data">{{ $t("navigation.data") }}</router-link>
                </li>
                <li>
                    <router-link to="/imprint">{{ $t("navigation.imprint") }}</router-link>
                </li>
                
            </ul>
            <ul v-if="isAuthenticated">
                <li>
                    <router-link to="/admin">{{ $t("navigation.admin") }}</router-link>
                </li>
                <li>
                    <router-link to="/admin/product/new">{{ $t("navigation.newProduct") }}</router-link>
                </li>
                 <li>
                    <router-link to="/admin/content">{{ $t("navigation.contents") }}</router-link>
                </li>
                <li>
                    <a href="#" @click.prevent="logout">{{ $t("navigation.logout") }}</a>
                </li>
            </ul>
        </nav>
        <div class="wappen"></div>
        <div class="footer">
            <router-link to="/login" class="cog-wheel"></router-link>
            <div class="version-number">{{ version }}</div>
        </div>
    </div>
</template>

<script>
export default {
    computed:
    {   
        /**
         *  @returns {Boolean} isAuthenticated
         */
        isAuthenticated()
        {
            return this.$store.getters.token ? true : false;
        }
    },
    data()
    {
        return {
            language: "de",
            version: "1.0.0 (123)"
        }
    },
    methods: {
        changeLanguage()
        {
            console.log("[Sidebar] Change Language", this.language);
        },
        logout()
        {
            this.$store.commit("deleteToken");
            this.$router.push("/");
        }
    }
}
</script>


<style lang="scss" scoped>

@import "../../styles/variables.scss";

.brand
{
    background-image: url("../../assets/logo.jpg");
    width: 170px;
    height: 190px;
    background-size: 150px auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 40px 40px;
    border: solid 10px white;
    display: block;
}

.wappen
{
    background-image: url("../../assets/wappen.png");
    width: 170px;
    height: 190px;
    background-size: 170px auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 40px 40px;
    display: block;
}

ul
{
    margin: 0;
    padding: 0;
    li
    {
        list-style: none;
        min-height: 16px;
        a:link, a:visited
        {
            @include font2();
            text-decoration: none;
            text-decoration: none;           
            display: block;
            width: 150px;
            padding: 0px;
            margin: 0 auto;
            transition: padding 0.5s $transitionEasing;
            position: relative;
            &.router-link-exact-active
            {
                font-weight: bold;
                &::before
                {
                    content: "Aktiv";
                    position: absolute;
                    top: 10px;
                    left: -10px;
                    width: 4px;
                    height: 4px;
                    background: $darkBlue;
                    display: block;
                    font-size: 0;
                    line-height: 0;
                }
            }
            &:hover
            {
                &::before
                {
                    content: "Aktiv";
                    position: absolute;
                    top: 10px;
                    left: -10px;
                    width: 4px;
                    height: 4px;
                    background: rgba($darkBlue, 0.2);
                    display: block;
                    font-size: 0;
                    line-height: 0;
                }
            }
        }
        a:hover, a:active
        {
            text-decoration: none;
            padding-left: 10px;
        }
    }
}

.language-switch
{
    width: 146px;
    margin: 20px auto;
}

.footer
{
    .cog-wheel
    {
        background: url("../../assets/icon-wheel.svg");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        margin: 16px;
        height: 24px;
        width: 24px;
        display: inline-block;
            vertical-align: bottom;
        &:hover
        {
            cursor: pointer;
        }
    }

    .version-number
    {
        @include font5( $color: rgba($darkBlue, 0.5) );
        display: inline-block;
        margin: 16px;
    }
}

</style>
