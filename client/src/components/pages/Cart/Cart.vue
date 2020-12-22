<template>
    <div class="page-wrapper">
        <ul class="list-group cart-list">
            <li class="list-group-item header">
                <div class="row">
                    <div class="col-6 col-md-4">
                        {{ $t("general.title") }}
                    </div>
                    <div class="col-3 d-none d-md-block">
                        ISBN
                    </div>
                    <div class="col-2 d-none d-sm-block">
                        {{ $t("general.price") }}
                    </div>
                    <div class="col-3 col-sm-2">
                        {{ $t("general.amount") }}
                    </div>
                    <div class="col-2 col-sm-1"></div>
                </div>
            </li>
            <li v-if="!cart.length"
                class="list-group-item list-group-item-warning">
                {{ $t("cart.error.empty") }}
            </li>
            <li class="list-group-item" v-for="product in cart"
                :key="product._id">
                <div class="row">
                    <div class="col-6 col-md-4">
                        {{ product.title }}
                    </div>
                    <div class="col-3 d-none d-md-block">
                        {{ product.isbn }}
                    </div>
                    <div class="col-2 d-none d-sm-block">
                        {{ product.price | price }}
                    </div>
                    <div class="col-3 col-sm-2">
                        <input type="number" v-model="product.amount"
                               class="form-control"
                               @change="amountChanged( product )">
                    </div>
                    <div class="col-2 col-sm-1">
                        <div class="button-remove"
                             @click="remove(product)"></div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="row total">
            <div class="col-md-4  col-xs-6 porto">
                <div class="caption">{{ $t('general.porto') }}</div>
                <div class="value" :class="{ 'is-loading': isCalculating }">{{
                    totalPorto | price }}
                </div>
            </div>
            <div class="col-md-4  col-xs-6 total-price">
                <div class="caption">{{ $t('general.totalPrice') }}</div>
                <div class="value" :class="{ 'is-loading': isCalculating }">{{
                    totalPrice | price }}
                </div>
            </div>
            <div class="col-md-4 col-xs-6 mt-2 submit">
                <router-link to="/cart/checkout" class="btn btn-primary"
                             v-if="cart.length">
                    {{ $t("product.checkout.submit") }}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

    import {HTTP} from "../../../util";
    import swal from "sweetalert";
    import toastr from "toastr";

    export default {
        computed:
            {
                cart() {
                    console.log("[Cart]", this.$store.getters.cart);
                    let cart = this.$store.getters.cart;
                    return cart;
                }
            },
        data() {
            return {
                totalPorto: null,
                totalPrice: null,
                isCalculating: false,
                isSmallScreen: false
            };
        },
        created() {
            this.$emit("change-title", this.$t("cart.title"));
            this.calcTotalPrice();
        },
        mounted() {
            window.onresize = () => {
                this.isSmallScreen = window.innerWidth < 768;
            };
            this.isSmallScreen = window.innerWidth < 768;
        },
        methods:
            {
                async calcTotalPrice() {
                    this.totalPorto = 0;
                    this.totalPrice = 0;
                    if (!this.cart.length) return;
                    this.isCalculating = true;
                    let totalWeight = 0;
                    try {
                        for (let i = 0; i < this.cart.length; i++) {
                            let product = this.cart[i];
                            this.totalPrice += product.price * product.amount;
                            totalWeight += product.hasPorto ? product.weight * product.amount : 0;
                        }
                        console.log("[Cart] Calculated weight for: ", totalWeight);
                        if (totalWeight) {
                            const portoResponse = await HTTP().get(`/porto/${totalWeight}`);
                            this.totalPorto = portoResponse.data.price;
                            this.totalPrice += this.totalPorto;
                        }
                    } catch (e) {
                        toastr.error(this.$t("cart.error.calc"));
                        console.error("[Cart] Error on calculating price: ", e);
                    }
                    this.isCalculating = false;
                },
                async amountChanged(product) {
                    console.log("[Cart] Amount changed...", product.amount);
                    if (!product.amount || product.amount === "0") {
                        let willDelete = await swal({
                            text: this.$t("cart.realyDelete"),
                            icon: "warning",
                            buttons: [this.$t("general.cancel"), this.$t("general.delete")]
                        });
                        if (willDelete) {
                            this.$store.commit("removeFromCart", product._id);
                        } else {
                            product.amount = 1;
                            this.$store.commit("setAmountInCart", product, 1);
                        }
                    } else if (!isNaN(product.amount)) {
                        this.$store.commit("setAmountInCart", product, parseInt(product.amount));
                    }
                    this.calcTotalPrice();
                },
                async remove(product) {
                    let willDelete = await swal({
                        text: this.$t("cart.realyDelete"),
                        icon: "warning",
                        buttons: [this.$t("general.cancel"), this.$t("general.delete")]
                    });
                    if (willDelete) {
                        this.$store.commit("removeFromCart", product._id);
                        this.calcTotalPrice();
                    }
                }
            }
    }
</script>

<style lang="scss" scoped>

    @import "../../../styles/variables.scss";

    .page-wrapper {
        padding: 24px 0;

        ul.list-group.cart-list {
            li.list-group-item {
                border-radius: 0;
                border: none;
                box-shadow: 0 -1px 0 $gray1;
                border-bottom: solid 1px $gray1;

                &.header {
                    div {
                        @include font2($fontWeight: bold);
                    }
                }

                div {
                    @include font2($lineHeight: 38px);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    input {
                        width: 100%;
                    }

                    .button-remove {
                        @include iconButton("../../../assets/button-remove.svg");
                        float: right;
                    }
                }
            }
        }

        .total {
            margin-top: 32px;

            > div {
                @include font4($fontWeight: bold);

                .caption {
                    @include font5();
                }

                &.submit {
                    button {
                        margin-top: 16px;
                    }
                }
            }

            @keyframes rotate {
                from {
                    transform: rotate(0);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            .is-loading {
                font-size: 0;
                line-height: 0;

                &::after {
                    content: "x";
                    margin: 8px 0 0 0;
                    height: 16px;
                    width: 16px;
                    border: solid transparent 2px;
                    border-bottom-color: $darkBlue;
                    border-top-color: $darkBlue;
                    border-right-color: $darkBlue;
                    border-radius: 50%;
                    font-size: 0;
                    line-height: 0;
                    vertical-align: text-top;
                    display: inline-block;
                    animation-name: rotate;
                    animation-duration: 1s;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            }
        }
    }

    @media(min-width: 768px) {
        .page-wrapper {
            padding: 48px;
        }
    }

</style>
