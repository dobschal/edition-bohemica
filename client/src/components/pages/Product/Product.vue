<template>
    <div v-if="product" class="row product">
        <div class="col-sm-4">
            <img :src="product.image">
        </div>
        <div class="col-sm-8">
            <h3>{{ product.title }}<br><small>{{ product.subtitle}}</small></h3>
            <div class="group">
                <div class="caption">ISBN</div>
                {{ product.isbn }}
            </div>
            <div class="group">
                <div class="caption">{{ $t("general.description") }}</div>
                {{ product.description }}
            </div>
            <div class="group">
                <div class="caption">{{ $t("general.price") }}</div>
                {{ product.price | price }}
            </div>
            <div class="group">
                <router-link :to="'/product/' + product._id + '/checkout'" class="btn btn-primary">{{ $t("product.orderNow") }}</router-link>
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
        }
    }
}
</script>


<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.row.product
{
    padding: 40px 48px;
    .col-sm-4
    {
        padding: 0;
        img
        {
            width: 100%;
        }
    }

    .col-sm-8
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
        .col-sm-4
        {
            padding: 0;
            img
            {
                width: 100%;
            }
        }

        .col-sm-8
        {
            padding: 40px 0 0 0;
        }
    }
}

</style>
