<template>
    <div v-if="product" class="row">
        <div class="col-sm-4">
            <img :src="product.image">
        </div>
        <div class="col-sm-8">
            <h3>{{ product.title }}</h3>
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
        }
    }
}
</script>


<style lang="scss" scoped>

.row
{
    .col-sm-4
    {
        img
        {
            width: 100%;
        }
    }

    .col-sm-4
    {
        padding: 4px;
    }
}

</style>
