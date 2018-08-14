<template>
    <div>        
        <div class="row wrapper">
            <div class="col-sm-8 form-wrapper">
                <form @submit.prevent="checkout">
                    <div class="form-group">
                        <label>{{ $t("product.checkout.name") }}</label>
                        <input class="form-control" type="text" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.email") }}</label>
                        <input class="form-control" type="email" placeholder="jemand@irgendwo.de">
                        <div class="alert alert-info">{{ $t("product.checkout.emailInfo") }}</div>
                    </div>
                    <div class="row">                                                
                        <div class="col-sm-8">
                            <div class="form-group">
                                <label>{{ $t("product.checkout.street") }}</label>
                                <input class="form-control" type="text" placeholder="Hauptstraße">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>{{ $t("product.checkout.houseNumber") }}</label>
                                <input class="form-control" type="text" placeholder="17">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.zipCode") }}</label>
                        <input class="form-control" type="text" placeholder="01234">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.city") }}</label>
                        <input class="form-control" type="text" placeholder="Beispielhaußen">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.country") }}</label>
                        <input class="form-control" type="text" placeholder="Deutschland" v-model="country">
                        <div class="alert alert-danger" v-if="country.toLowerCase() !== 'deutschland' && country.toLowerCase() !== 'germany'">
                            {{ $t("product.checkout.countryInfo") }}
                        </div>
                    </div>
                    <button class="btn btn-primary">{{ $t("product.checkout.submit") }}</button>
                    <button class="btn btn-secondary" @click="$router.go(-1)">{{ $t("general.cancel") }}</button>
                </form>
            </div>
            <div class="col-sm-4">
                <div v-if="product" class="row product">
                    <div class="col-sm-12 image">
                        <img :src="product.image">
                    </div>
                    <div class="col-sm-12 product-content">
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
                </div>
            </div>
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
            product: null,
            country: "Deutschland"
        };
    },
    created()
    {
        this.load();
        this.$emit("change-title", this.$t("product.checkout.title") );
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

.alert
{
    @include font2();
    padding: 8px 16px;
    margin-top: 16px;
}

.row.wrapper
{
    padding-right: 32px;
}

.form-wrapper
{
    padding: 32px 24px 32px 48px;
}

.row.product
{
    padding: 32px 0px;
    .image
    {
        padding: 16px;
        img
        {
            width: 100%;
        }
    }

    .product-content
    {
        padding: 16px;

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
