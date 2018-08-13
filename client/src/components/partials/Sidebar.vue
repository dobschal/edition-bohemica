<template>
    <div>
        <router-link to="/" class="brand"></router-link>
        <nav>
            <ul v-if="!isAuthenticated">
                <li>
                    <router-link to="/">{{ $t("navigation.shop") }}</router-link>
                </li>
                <li>
                    <router-link to="/news">{{ $t("navigation.news") }}</router-link>
                </li>
                <li></li>
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
    height: 28.12px;
    background-size: 250px auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 32px 0 0 0;
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
    background: #181823;
    .cog-wheel
    {
        background: url("../../assets/icon-wheel.svg");
        background-position: 50% 50%;
        background-repeat: no-repeat;
        margin: 16px 0px 16px 16px;
        height: 24px;
        width: 24px;
        display: inline-block;
        vertical-align: bottom;
        opacity: 0.5;
        &:hover
        {
            opacity: 1.0;
            cursor: pointer;
        }
    }

    .version-number
    {
        @include font5( $color: rgba(white, 0.5), $fontWeight: 400, $fontSize: 10px );
        display: inline-block;
        margin-top: 17px;
        vertical-align: top;
    }
}

</style>
