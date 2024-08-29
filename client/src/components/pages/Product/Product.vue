<template>
    <div class="page-wrapper">
        <div v-if="product" class="row">
            <div class="col-sm-4">
                <img :src="product.image || '/static/placeholder-image.jpg'">
            </div>
            <div class="col-sm-8 info-area top">
                <h3>{{ product.title }}<br><small>{{ product.subtitle}}</small></h3>
                <div class="group">
                    <div class="caption">{{ $t("general.price") }}</div>
                    {{ product.price | price }}
                </div>
                <div class="group">
                    <div class="caption">{{ $t("general.porto") }}</div>
                    <span v-if="product.hasPorto && porto">{{ porto.price | price }}</span>
                    <span v-if="!product.hasPorto || !porto">{{ $t('general.portoFree') }}</span>
                </div>
                <div class="group">
                    <router-link :to="'/cart/checkout/' + product._id" class="btn btn-primary order-button">{{ $t("product.orderNow") }}</router-link>
                    <button class="btn btn-secondary cart-button" @click="addToCart">{{ $t("general.addToCart") }}</button>
                </div>
            </div>
        </div>
        <div class="row" v-if="product">
            <div class="col-sm-12 info-area">
                <div class="group">
                    <div class="caption">{{ $t("general.description") }}</div>
                    <div v-html="product.description"></div>
                </div>
                <div class="group">
                    <div class="caption">ISBN</div>
                    {{ product.isbn }}
                </div>
                <div class="group">
                    <div class="caption">{{ $t("general.weight") }}</div>
                    {{ product.weight }}
                </div>
                <div class="group" v-if="product.additionalInfo">
                    <div class="caption">{{ $t("general.additionalInfo") }}</div>
                    <div v-html="product.additionalInfo"></div>
                </div>
                <!--<div class="group">
                    <button class="btn btn-secondary" @click="$router.go(-1)">{{ $t("general.back") }}</button>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>

import { HTTP, deepCopy } from "../../../util";
import toastr from "toastr";

export default {
    data()
    {
        return {
            product: null,
            porto: null
        };
    },
    created()
    {
        this.load();
        this.$emit("change-title", "edition bohemica" );
    },
    methods:
    {
        async load()
        {
            try
            {
                const response = await HTTP().get(`/products/${this.$route.params.productId}`);
                this.product = response.data;
                if( this.product.hasPorto && this.product.weight )
                {
                    const portoResponse = await HTTP().get(`/porto/${this.product.weight}`);
                    this.porto = portoResponse.data;
                    console.log("[Product] Got porto for product...", portoResponse);
                }
            }
            catch(e)
            {
                console.error("[Product] Error on loading data: ", e);
                toastr.error( this.$t("general.error.load") );
            }
        },
        addToCart()
        {
            const currentCart = this.$store.getters.cart;
            if( currentCart.find( product => product._id === this.product._id ))
            {
                toastr.info( this.$t("product.checkout.amountInfo"), "", { timeOut: 6000 });
                return console.log("[Product] Product is already in cart...");
            }
            let productForCart = deepCopy(this.product);
            productForCart.amount = 1;
            this.$store.commit("addToCart", productForCart);
            toastr.success( this.$t("product.checkout.addedToCart") );
        }
    }
}
</script>


<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.order-button, .cart-button
{
    vertical-align: middle;
    margin: 0 8px 8px 0;
}

.row
{
    //padding-bottom: 16px;
    .col-sm-4
    {
        padding: 0 0 24px 0;
        img
        {
            width: 100%;
        }
    }

    .info-area
    {
        border-top: solid 1px rgba( $darkBlue, 0.1 );
        padding: 24px 0 0 0;
        h3
        {
            @include font4( $color: rgba($darkBlue, 0.8), $lineHeight: 24px );
            margin: 0 0 16px 0;

            small
            {
                @include font2( $color: rgba($darkBlue, 0.8) );
            }
        }

        .group
        {
            @include font2( $color: rgba($darkBlue, 0.8) );
            padding-bottom: 24px;
            .caption
            {
                @include font5( $color: rgba($darkBlue, 0.5), $lineHeight: 12px );
            }
        }

        &.top
        {
            border-top: none;
            padding: 0 0 0 32px;
            .group
            {
                padding-bottom: 16px;
            }
        }
    }
}

@media(max-width:575px)
{
   .row
    {
        .info-area.top
        {
            padding: 0 0 0 0;
        }
    }
}
</style>
