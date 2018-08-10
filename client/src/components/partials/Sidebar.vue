<template>
    <div>
        <div class="brand my-5"></div>
        <nav>
            <ul v-if="!isAuthenticated">
                <li>
                    <router-link to="/">{{ $t("navigation.shop") }}</router-link>
                </li>
                <li>
                    <router-link to="/news">{{ $t("navigation.news") }}</router-link>
                </li>
                <li>
                    <router-link to="/program">{{ $t("navigation.program") }}</router-link>
                </li>
                <li>
                    <router-link to="/images">{{ $t("navigation.images") }}</router-link>
                </li>
                <li>
                    <router-link to="/travel">{{ $t("navigation.travel") }}</router-link>
                </li>
                <li>
                    <router-link to="/portrait">{{ $t("navigation.portrait") }}</router-link>
                </li>
                <li>
                    <router-link to="/imprint">{{ $t("navigation.imprint") }}</router-link>
                </li>
                <li><hr></li>
                <li >
                    <router-link to="/login">{{ $t("navigation.login") }}</router-link>
                </li>
            </ul>
            <ul v-if="isAuthenticated">
                <li>
                    <router-link to="/admin">{{ $t("navigation.admin") }}</router-link>
                </li>
                <li>
                    <router-link to="/admin/product/new">{{ $t("navigation.newProduct") }}</router-link>
                </li>
                <li><hr></li>
                <li>
                    <a href="#" @click.prevent="logout">{{ $t("navigation.logout") }}</a>
                </li>
            </ul>
        </nav>
        <div class="language-switch">
            <select class="form-control" v-model="language" @change="changeLanguage">
                <option value="de">Deutsch</option>
                <option value="en">English</option>
                <option value="cs">český</option>
            </select>
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
            language: "de"
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
    background-image: url("../../assets/brand.svg");
    height: 40px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}

ul
{
    margin: 0;
    padding: 0;
    li
    {
        list-style: none;
        a:link, a:visited
        {
            text-decoration: none;
            @include font1();
            text-decoration: none;           
            display: block;
            width: 146px;
            padding: 4px 0px 4px 0px;
            margin: 0 auto;
            transition: padding 0.5s $transitionEasing;
        }
        a:hover, a:active
        {
            text-decoration: none;
            padding: 4px 0px 4px 10px;
        }
    }
}

.language-switch
{
    width: 146px;
    margin: 20px auto;
}

</style>
