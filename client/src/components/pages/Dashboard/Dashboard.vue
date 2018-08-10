<template>
    <div>
        
    </div>
</template>

<script>
export default
{
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
                const response = await HTTP.get("/products");
                this.products = response.data;
                console.log("[Products] Response: ", this.products);
            }
            catch(e)
            {
                this.errors.push(this.$t("backend.overview.error.load"));
            }
        }
    }
}
</script>
