<template>
    <div class="page-wrapper">
        <div class="info mb-4">
            {{ $t("comingSoon.info") }}
        </div>
        <div class="product-list">
            <div class="product" v-for="product in products" :key="product._id">
                <h3 class="product-headline">{{ product.title }}</h3>
                <h3 class="product-subtitle">{{ product.subtitle }}</h3>
                <div class="product-description" v-html="product.description"></div>
                <div class="product-additional-info" v-html="product.additionalInfo"></div>                
            </div>
        </div>
    </div>
</template>

<script>

import toastr from "toastr";
import { HTTP } from "../../util";

export default {
    data()
    {
        return {
            products: []
        };
    },
    mounted()
    {
        this.$emit("change-title", this.$t("navigation.comingSoon") );
    },
    created()
    {
        this.loadProducts();
    },
    methods:
    {
        async loadProducts()
        {            
            try
            {
                const response = await HTTP().get("/products");
                this.products = response.data.filter( product => {
                    return product.public && product.isInPreparation;
                });
                console.log("[Products] Response: ", this.products);
            }
            catch(e)
            {
                toastr.error( this.$t("general.error.load") );   
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../styles/variables.scss";

.info
{
    @include font2();
    background-image: url("../../assets/banner-in-preparation.png");
    background-color: rgba($darkBlue, 0.1);
    padding: 137px 48px 0 48px;
    margin: 0 -48px;
    border-radius: 0;
    background-size: 100% auto;
    background-position: 50% 50%;
    /* color: white; */
    height: 160px;
    /* line-height: 50px; */
    box-shadow: inset 0 -32px 0 0px rgba(255, 255, 255, 1);
    font-weight: 400;
    vertical-align: middle;
    font-style: italic;
}

.product-list
{
    .product
    {
        margin-bottom: 20px;
        border-bottom: solid 1px rgba($darkBlue, 0.1);
        padding-bottom: 10px;
        .product-headline
        {
            @include font4();
            margin: 0;
        }
        .product-subtitle
        {
            @include font2();
            font-weight: bold;
            margin: 0;
        }
        .product-description, .product-additional-info
        {
            @include font2();
            margin: 0;
        }
    }
}

</style>
