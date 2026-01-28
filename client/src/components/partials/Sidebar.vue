<template>
    <div>
        <router-link to="/" class="brand"></router-link>
        <nav>
            <ul class="public-nav">
                <li>
                    <router-link to="/">
                        {{ $t("navigation.start") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/cart">{{ $t("cart.title") }}</router-link>
                </li>
                <li>
                    <router-link to="/content/news-content">{{
                        $t("contentId.news-content") }}
                    </router-link>
                </li>
                <li></li>
                <li v-if="pdfLinks && pdfLinks.correspondence">
                    <a :href="pdfLinks.correspondence" target="_blank">{{
                        $t("navigation.correspondence") }}</a>
                </li>
                <li v-if="pdfLinks && pdfLinks.program">
                    <a :href="pdfLinks.program" target="_blank">{{
                        $t("navigation.program") }}</a>
                </li>
                <li>
                    <router-link to="/content/trader-content">{{
                        $t("navigation.trader") }}
                    </router-link>
                </li>
                <li></li>
                <li>
                    <router-link to="/content/travel-content">{{
                        $t("navigation.travel") }}
                    </router-link>
                </li>
                <li v-if="pdfLinks && pdfLinks.images">
                    <a :href="pdfLinks.images" target="_blank">{{
                        $t("navigation.images") }}</a>
                </li>
                <li>
                    <router-link to="/content/portrait-content">{{
                        $t("navigation.portrait") }}
                    </router-link>
                </li>
            </ul>
            <ul v-if="isAuthenticated" class="admin-navigation">
                <li>
                    <router-link to="/admin">{{ $t("navigation.admin") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/product/new">{{
                        $t("navigation.newProduct") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/content">{{
                        $t("navigation.contents") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/porto">{{ $t("navigation.porto")
                        }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/admin/pdf">{{ $t("navigation.pdf") }}
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="wappen"></div>
        <nav>
            <ul>
                <li>
                    <router-link to="/content/agb-content">{{
                        $t("navigation.agb") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/content/data-security-content">{{
                        $t("navigation.data") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/content/imprint-content">{{
                        $t("navigation.imprint") }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/contact">{{ $t("general.contact") }}
                    </router-link>
                </li>
            </ul>
        </nav>
        <div class="banner"></div>
        <div class="footer">
            <router-link to="/login" class="button-settings"
                         v-if="!isAuthenticated"></router-link>
            <a href="#" class="button-logout" v-if="isAuthenticated"
               @click.prevent="logout"></a>
            <div class="version-number">{{ versionText }}</div>
        </div>
    </div>
</template>

<script>

    import {HTTP} from "../../util";
    import config from "../../config";

    export default {
        created() {
            this.getVersionInfo();
            this.getPDFLinks(["images", "correspondence", "program"]);
        },
        computed:
            {
                /**
                 *  @returns {Boolean} isAuthenticated
                 */
                isAuthenticated() {
                    return this.$store.getters.token ? true : false;
                },

                versionText() {
                    return `${this.version} (${this.buildNumber})`;
                }
            },
        data() {
            return {
                language: "de",
                buildNumber: "?",
                version: "?",
                pdfLinks: {
                    images: "",
                    correspondence: "",
                    program: ""
                }
            }
        },
        methods: {
            changeLanguage() {
                console.log("[Sidebar] Change Language", this.language);
            },
            logout() {
                this.$store.commit("deleteToken");
                this.$router.push("/");
            },
            async getPDFLinks(ids) {
                ids.forEach(async id => {
                    try {
                        const response = await HTTP().get(`/pdfpage/${id}`);
                        this.$set(this.pdfLinks, id, response.data.pdf);
                    } catch (error) {
                        console.error("[Sidebar] Unable to load pdf link.", error);
                    }
                    ;
                });
            },
            async getVersionInfo() {
                try {
                    const response = await HTTP().get("/version");
                    const {version: buildVersion, author, buildNumber} = response.data;
                    this.buildNumber = buildNumber;
                    this.version = buildVersion;
                    console.log(`\n...got version info from server:\n\n    API: ${config.ROOT_API}\n    Version: ${buildVersion}\n    Build: ${buildNumber}\n    Author: ${author}\n\n`);
                } catch (e) {
                    console.error("[Sidebar] Cannot get server info: ", e);
                }
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import "../../styles/variables.scss";

    .brand {
        background-image: url("../../assets/logo.jpg");
        width: 150px;
        height: 166px;
        background-size: 130px auto;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        margin: 32px 50px 32px 50px;
        //border: solid 10px white;
        display: block;
        box-shadow: 0 10px 50px -10px rgba(0, 0, 0, .3);
    }

    .wappen {
        background-image: url("../../assets/wappen.png");
        width: 150px;
        height: 180px;
        background-size: 130px auto;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        margin: 32px 50px;
        display: block;
        box-shadow: 0 10px 50px -10px rgba(0, 0, 0, .3);
        //background-color: white;
        //border: solid 10px white;
    }

    .banner {
        width: 250px;
        height: 39px;
        background-size: 350px auto;
        background-repeat: no-repeat;
        background-position: -82px 50%;
        margin: 32px 0 0 0;
        display: block;
    }

    ul {
        margin: 0;
        padding: 0;

        &.public-nav {
            padding: 8px 0px;
        }

        &.admin-navigation {
            background-color: $darkBlue;
            margin-top: 24px;
            padding: 8px 0px;

            a:link,
            a:visited,
            a:hover,
            a:active {
                color: white;
            }
        }

        li {
            list-style: none;
            min-height: 16px;

            a:link,
            a:visited {
                @include font2();
                text-decoration: none;
                display: block;
                width: 150px;
                padding: 0px;
                transition: padding 0.5s cubic-bezier(0.1, 0.5, 0.2, 1);
                position: relative;
                margin: 0 auto 0 60px;
                white-space: nowrap;

                &::before {
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

                &.router-link-exact-active {
                    font-weight: bold;

                    &::before {
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

                &:hover {
                    &::before {
                        content: "Aktiv";
                        position: absolute;
                        top: 10px;
                        left: -10px;
                        width: 4px;
                        height: 4px;
                        background: rgba($darkBlue, 0.5);
                        display: block;
                        font-size: 0;
                        line-height: 0;
                    }
                }
            }

            a:hover,
            a:active {
                text-decoration: none;
                padding-left: 10px;
            }
        }
    }

    .language-switch {
        width: 146px;
        margin: 20px auto;
    }

    .footer {
        padding: 16px 8px;

        .button-settings {
            background-image: url("../../assets/button-settings.svg");
            background-size: 28px 28px;
            height: 28px;
            width: 28px;
            display: inline-block;
            vertical-align: middle;

            &:hover {
                cursor: pointer;
            }
        }

        .button-logout {
            background-image: url("../../assets/button-logout.svg");
            background-size: 28px 28px;
            height: 28px;
            width: 28px;
            display: inline-block;
            vertical-align: middle;

            &:hover {
                cursor: pointer;
            }
        }

        .version-number {
            @include font5(
                    $color: rgba($darkBlue, 0.9),
                    $fontWeight: 400,
                    $fontSize: 10px,
                    $lineHeight: 28px
            );
            display: inline-block;
            margin-left: 16px;
            vertical-align: middle;
        }
    }
</style>
