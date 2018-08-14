<template>
    <div>
         <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
                <h2>{{ $t("product.checkout.title") }}</h2>
            </div>
            <div class="col-sm-3"></div>
         </div>
        <div v-if="product" class="row product">
            <div class="col-sm-3"></div>
            <div class="col-sm-2 image">
                <img :src="product.image">
            </div>
            <div class="col-sm-4 product-content">
                <h3>{{ product.title }}<br><small>{{ product.subtitle}}</small></h3>
                <div class="group">
                    <div class="caption">ISBN</div>
                    {{ product.isbn }}
                </div>
                <div class="group">
                    <div class="caption">{{ $t("general.price") }}</div>
                    {{ product.price | price }}
                </div>
            </div>
            <div class="col-sm-3"></div>
        </div>
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
                <form @submit.prevent="checkout">
                    <div class="form-group">
                        <label>{{ $t("product.checkout.name") }}</label>
                        <input class="form-control" type="text" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.street") }}</label>
                        <input class="form-control" type="text" placeholder="Straße 5">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.zipCode") }}</label>
                        <input class="form-control" type="text" placeholder="01234">
                    </div>
                      <div class="form-group">
                        <label>{{ $t("product.checkout.city") }}</label>
                        <input class="form-control" type="text" placeholder="Beispielhaußen">
                    </div>
                </form>
            </div>
            <div class="col-sm-3"></div>
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../../util";
import toastr from "toastr";

export default {
    data()
    {
        return {
            product: null
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
            }
            catch(e)
            {
                console.error("[Product] Error on loading data: ", e);
                toastr.error( this.$t("general.error.load") );
            }
        },
        async checkout()
        {
            console.log("[Product Checkout] Checkout: ", this.product);
        }
    }
}
</script>


<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.row.product
{
    padding: 40px 48px;
    .image
    {
        padding: 0;
        img
        {
            width: 100%;
        }
    }

    .product-content
    {
        padding: 0 0 0 40px;

        h3
        {
            @include font4( $color: rgba($darkBlue, 0.8), $lineHeight: 24px );
            margin: 0 0 24px 0;

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
    }
}

@media(max-width:575px) {
    .row.product
    {
        padding: 40px 48px;
        .image
        {
            padding: 0;
            img
            {
                width: 100%;
            }
        }

        .product-content
        {
            padding: 40px 0 0 0;
        }
    }
}

</style>
