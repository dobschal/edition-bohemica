<template>
    <div>
        <div class="row">
            <div class="header-content">
                <h2 v-html="headerTitle"></h2>
                <div class="content" v-html="headerContent">
                </div>                
                <div>
                    <button class="btn btn-primary">{{ $t("dashboard.toNews") }}</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-lg-4" v-for="product in products" :key="product._id">
                <div class="card">
                    <img class="card-img-top" :src="product.image" :alt="product.title">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.title }}</h5>
                        <p class="card-text">{{ product.subtitle }}</p>
                        <a href="#" class="btn btn-primary">Kaufen :D</a>
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
    data()
    {
        return {
            products: [],
            errors: [],
            headerTitle: this.$store.getters.content("dashboard-title"),
            headerContent: this.$store.getters.content("dashboard-content")
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

.card
{

}

.header-content
{
    padding-left: 48px;
    padding-top: 24px;
    padding-bottom: 48px;

    h2
    {
        @include font4();
        margin: 0;
    }

    .content
    {
        @include font2();
        margin-bottom: 24px;
    }
}

</style>
