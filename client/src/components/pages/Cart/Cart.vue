<template>
    <div class="page-wrapper">        
        <ul class="list-group cart-list">
             <li class="list-group-item header">
                <div class="row">
                    <div class="col-4">
                        {{ $t("general.title") }}
                    </div>
                    <div class="col-4">
                        ISBN
                    </div>
                    <div class="col-2">
                        {{ $t("general.price") }}
                    </div>
                    <div class="col-2">
                        {{ $t("general.amount") }}
                    </div>
                </div>
            </li>
            <li v-if="!cart.length" class="list-group-item list-group-item-warning">
                {{ $t("cart.error.empty") }}
            </li>
            <li class="list-group-item" v-for="product in cart" :key="product._id">
                <div class="row">
                    <div class="col-4">
                        {{ product.title }}
                    </div>
                    <div class="col-4">
                        {{ product.isbn }}
                    </div>
                    <div class="col-2">
                        {{ product.price | price }}
                    </div>
                    <div class="col-2">
                        <input type="number" v-model="product.amount" class="form-control" @change="amountChanged( product )">
                    </div>
                </div>
            </li>
        </ul>    
        <div class="row total">
            <div class="col-4 porto">
                <div class="caption">{{ $t('general.porto') }}</div>
                <div class="value" :class="{ 'is-loading': isCalculating }">{{ totalPorto | price }}</div>
            </div>
            <div class="col-4 total-price">
                <div class="caption">{{ $t('general.totalPrice') }}</div>
                <div class="value" :class="{ 'is-loading': isCalculating }">{{ totalPrice | price }}</div>
            </div>
            <div class="col-4 submit">
                <button class="btn btn-primary">
                    {{ $t("product.checkout.submit") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../../util";
import swal from "sweetalert";
import toastr from "toastr";

export default {
    computed:
    {        
        cart()
        {
            console.log("[Cart]", this.$store.getters.cart);
            let cart = this.$store.getters.cart;            
            return cart;
        }
    },
    data()
    {
        return {
            totalPorto: null,
            totalPrice: null,
            isCalculating: false
        };
    },
    created()
    {
        this.$emit("change-title", this.$t("cart.title") );
        this.calcTotalPrice();
    },
    methods:
    {
        async calcTotalPrice()
        {
            this.isCalculating = true;
            this.totalPorto = 0;   
            this.totalPrice = 0;         
            try
            {
                for( let i = 0; i < this.cart.length; i++)
                {
                    let product = this.cart[i];
                    const portoResponse = await HTTP().get(`/porto/${product.weight}`);
                    let porto = portoResponse.data;    
                    this.totalPorto += porto.price;
                    this.totalPrice += product.price;
                }
                this.totalPrice += this.totalPorto;
            }
            catch(e)
            {
                toastr.error( this.$t("cart.error.calc") );
                console.error("[Cart] Error on calculating price: ", e);
            }
            this.isCalculating = false;
        },
        async amountChanged( product )
        {
            console.log("[Cart] Amount changed...", product.amount );
            if( !product.amount || product.amount === "0" )
            {
                let willDelete = await swal({
                    text: this.$t("cart.realyDelete"),
                    icon: "warning",
                    buttons: [this.$t("general.cancel"), this.$t("general.delete")],
                    dangerMode: true,
                });
                if( willDelete )
                {
                    this.$store.commit( "removeFromCart", product._id );
                }
                else
                {
                    product.amount = 1;
                    this.$store.commit( "setAmountInCart", product, 1 );
                }
            }
            else if( !isNaN( product.amount ) )
            {
                this.$store.commit( "setAmountInCart", product, parseInt(product.amount) );
            }
        }
    }    
}
</script>

<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.page-wrapper
{
    ul.list-group.cart-list
    {
        li.list-group-item
        {
            &.header
            {
                div
                {
                    @include font2( $fontWeight: bold );
                }
            }
            div
            {
                @include font2( $lineHeight: 38px );
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                input
                {
                    width: 100%;
                }
            }
        }
    }

    .total
    {
        margin-top: 32px;
        > div
        {
            @include font4( $fontWeight: bold );
            .caption
            {
                @include font5();
            }
            &.submit
            {
                button
                {
                    margin-top: 16px;
                }
            }
        }

        @keyframes rotate
        {
            from { transform: rotate(0); }
            to { transform: rotate(360deg); }
        }

        .is-loading
        {
            font-size: 0;
            line-height: 0;
            &::after
            {            
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

</style>
