<template>
    <div>
        <div class="row">
            <div class="header-content">
                <h2 class="header-title" v-html="headerTitle"></h2>
                <div class="content" v-html="headerContent"></div>                
                <div>
                    <router-link to="/news" class="btn btn-primary">{{ $t("dashboard.toNews") }}</router-link>
                </div>
            </div>
        </div>
        <h2 class="product-title">{{ $t("dashboard.productTitle") }}</h2>
        <div class="row products">
            <div class="col-sm-6 col-md-4 col-lg-3 product d-flex" v-for="product in products" :key="product._id">
                <div class="card">
                    <img class="card-img-top" :src="product.image" :alt="product.title">
                    <div class="card-body d-flex align-items-end flex-column">
                        <h5 class="align-self-start card-title">{{ product.title }}</h5>
                        <p class="align-self-start card-text">{{ product.subtitle }}</p>
                        <router-link :to="'/product/' + product._id" class="mt-auto prduct-action">Zum Produkt</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>

import { HTTP } from "../../../util";

export default
{
    computed:
    {
        headerTitle()
        { 
            return this.$store.getters.content("dashboard-title");
        },
        headerContent()
        {
            return this.$store.getters.content("dashboard-content");
        }
    },
    data()
    {
        return {
            products: [],
            errors: []            
        }  
    },
    mounted()
    {
        this.$emit("change-title", this.$t("dashboard.title"));
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
                this.products = response.data;
                console.log("[Products] Response: ", this.products);
            }
            catch(e)
            {
                console.error("[Products] Unable to load products...", e);
                this.errors.push(this.$t("backend.overview.error.load"));
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.product-title
{
    @include font4();
    margin: 0px 48px 24px 32px;
}

.products
{
    padding-left: 32px;
    padding-right: 32px;
    .product
    {
        padding: 0px 16px 32px 16px;
        .card
        {
            background: rgba( $gray1, 0.25 );
            border-radius: 0px;
            border: solid 1px rgba( $darkBlue, 0.1 );        
            .card-img-top
            {
                width: calc( 100% - 32px );
                margin: 16px 16px 0px 16px;
                border-radius: 0;
            }
            .card-body
            {
                padding: 16px;
                h5.card-title
                {
                    @include font2( $fontWeight: bold, $fontSize: 14px );
                    margin: 0;
                }
                .card-text
                {
                    @include font5();  
                    margin: 0 0 16px 0;                  
                }
                .prduct-action
                {
                    background: url("../../../assets/button-product.svg");
                    width: 24px;
                    height: 24px;
                    font-size: 0;
                    line-height: 0;
                }
            }
        }
    }
}

.header-content
{
    padding-left: 48px;
    padding-top: 48px;
    padding-bottom: 48px;    

    >>> h2.header-title
    {
        @include font4();
        margin: 0;

        >>> p
        {
            margin: 0;
        }
    }

    >>> div.content
    {
        @include font2( $fontSize: 14px );
        margin-bottom: 16px;

        // https://medium.com/@brockreece/scoped-styles-with-v-html-c0f6d2dc5d8e
        >>> p
        {
            margin: 0;
        }
    }
}

</style>
