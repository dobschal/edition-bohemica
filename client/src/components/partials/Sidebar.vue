<template>
    <div>
        <router-link to="/" class="brand"></router-link>
        <nav>
            <ul>
                <li>
                    <router-link to="/">{{ $t("navigation.start") }}</router-link>
                </li>
                <li></li>
                <li>
                    <a href="" @click.prevent="openPDF('program')">{{ $t("navigation.program") }}</a>
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
            </ul>
            <ul v-if="isAuthenticated" class="admin-navigation">
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
                    <router-link to="/admin/porto">{{ $t("navigation.porto") }}</router-link>
                </li>
                 <li>
                    <router-link to="/admin/program">{{ $t("navigation.program") }}</router-link>
                </li>
            </ul>
        </nav>
        <div class="wappen"></div>
        <nav>
            <ul>
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
        </nav>
        <div class="banner"></div>
        <div class="footer">
            <router-link to="/login" class="button-settings" v-if="!isAuthenticated"></router-link>
            <a href="#" class="button-logout" v-if="isAuthenticated" @click.prevent="logout"></a>
            <div class="version-number">{{ version }}</div>
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../util";

export default {
    created()
    {
        this.getBuildNumber();
    },
    computed:
    {   
        /**
         *  @returns {Boolean} isAuthenticated
         */
        isAuthenticated()
        {
            return this.$store.getters.token ? true : false;
        },

        version()
        {
            return `1.0.0 (${this.buildNumber})`;
        }
    },
    data()
    {
        return {
            language: "de",
            buildNumber: 0
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
        },
        async openPDF( id )
        {
            const response = await HTTP().get(`/pdfpage/${id}`);
            const pdfPage = response.data;
            const win = window.open( pdfPage.pdf, '_blank');
            win.focus();
        },
        async getBuildNumber()
        {
            const response = await HTTP().get("https://edition-bohemica.dobschal.eu/build-number.txt");
            console.log("[Sidebar]", response.data);
            this.buildNumber = response.data;
        }
    }
}
</script>


<style lang="scss" scoped>

@import "../../styles/variables.scss";

.brand
{
    background-image: url("../../assets/logo.jpg");
    width: 150px;
    height: 166px;
    background-size: 130px auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 32px 50px 32px 50px;
    border: solid 10px white;
    display: block;
    box-shadow: 0px 10px 15px -10px rgba(0, 0, 38, 0.15);
}

.wappen
{
    background-image: url("../../assets/wappen.png");
    width: 150px;
    height: 180px;
    background-size: 130px auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 32px 50px;
    display: block;
    box-shadow: 0px 10px 15px -10px rgba(0, 0, 38, 0.15);
    background-color: white;
    border: solid 10px white;
}

.banner
{
    background-image: url("../../assets/banner.png");
    width: 250px;
    height: 39px;
    background-size: 350px auto;
    background-repeat: no-repeat;
    background-position: -82px 50%;
    margin: 32px 0 0 0;
    display: block;
}

ul
{
    margin: 0;
    padding: 0;

    &.admin-navigation
    {
        background-color: $darkBlue;
        margin-top: 24px;
        padding: 8px 0px;
        a:link, a:visited, a:hover, a:active
        {
            color: white;
        }
    }

    li
    {
        list-style: none;
        min-height: 16px;
        a:link, a:visited
        {
            @include font2();            
            text-decoration: none;
            display: block;
            width: 150px;
            padding: 0px;
            transition: padding 0.5s cubic-bezier(0.1, 0.5, 0.2, 1);
            position: relative;
            margin: 0 auto 0 60px;
            white-space: nowrap;                
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
    padding: 16px 8px;
    .button-settings
    {
        background-image: url("../../assets/button-settings.svg");
        background-size: 28px 28px;
        height: 28px;
        width: 28px;
        display: inline-block;
        vertical-align: middle;
        &:hover
        {
            cursor: pointer;
        }
    }
    .button-logout
    {
        background-image: url("../../assets/button-logout.svg");
        background-size: 28px 28px;
        height: 28px;
        width: 28px;
        display: inline-block;
        vertical-align: middle;
        &:hover
        {
            cursor: pointer;
        }
    }  
    .version-number
    {
        @include font5( $color: rgba($darkBlue, 0.9), $fontWeight: 400, $fontSize: 10px, $lineHeight: 28px );
        display: inline-block;
        margin-left: 16px;
        vertical-align: middle;
    }
}

</style>
