<template>
    <div class="page-wrapper">
        <div class="row" v-if="!submitted">
            <div class="col-sm-8">
                <form @submit.prevent="checkout">
                    <div class="form-group">
                        <label>{{ $t("product.checkout.name") }}</label>
                        <input class="form-control" type="text" placeholder="Name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.email") }}</label>
                        <input class="form-control" type="email" placeholder="jemand@irgendwo.de" v-model="email">
                        <div class="alert alert-info">{{ $t("product.checkout.emailInfo") }}</div>
                    </div>
                    <div class="row">                                                
                        <div class="col-sm-8">
                            <div class="form-group">
                                <label>{{ $t("product.checkout.street") }}</label>
                                <input class="form-control" type="text" placeholder="Hauptstraße" v-model="street">
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label>{{ $t("product.checkout.houseNumber") }}</label>
                                <input class="form-control" type="text" placeholder="17" v-model="houseNumber">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.zipCode") }}</label>
                        <input class="form-control" type="text" placeholder="01234" v-model="zipCode">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("product.checkout.city") }}</label>
                        <input class="form-control" type="text" placeholder="Beispielhaußen" v-model="city">
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
                <ul class="list-group product-list">
                    <!-- <li 
                        :style="{ backgroundImage: `url('${product.image}')` }" 
                        v-for="product in cart" 
                        :key="product._id" 
                        class="list-group-item list-group-item-action flex-column align-items-start product-list-item" > -->
                    <li 
                        v-for="product in cart" 
                        :key="product._id" 
                        class="list-group-item list-group-item-action flex-column align-items-start product-list-item" >

                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">{{ product.title }}</h5>
                            <!--<small>3 days ago</small>-->
                        </div>
                        <p class="mb-1">{{ product.subtitle }}</p>
                        <small>
                            <b>ISBN: </b> {{ product.isbn }}<br> 
                            <b>{{ $t("general.amount") }}</b>: {{ product.amount }}
                        </small>
                    </li>
                </ul>
                <h4 class="total-price">{{ $t("general.totalPrice") }}<br><small>{{ totalPrice | price }}</small></h4>
                <div class="alert alert-info">
                    {{ $t("cart.info") }}
                </div>
                <!--<div v-if="product" class="row product">
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
                </div>-->
            </div>
        </div>
        <div class="row" v-if="submitted">
            <div class="col-sm-12">
                <div class="alert alert-success">
                    {{ $t("product.checkout.submitMessage") }}<br>
                    <b>{{ orderNumber }}</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../../util";
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
            orderNumber: "",
            totalPrice: 0,
            totalPorto: 0,
            country: "Deutschland", // lokalisiert
            name: "",
            city: "",
            street: "",
            houseNumber: "",
            zipCode: "",
            email: "",
            submitted: false
        };
    },
    created()
    {
        if(this.$route.params.productId)
        {
            this.makeSingleProductCart();
        }
        this.$emit("change-title", this.$t("product.checkout.title") );
        this.calcTotalPrice();
    },
    methods:
    {
        /**
         *  If the user clicks on "Jetzt bestellen" we remove the
         *  current cart and add only the select product to it.
         *  --> Instead of the cart page, the checkout page is shown.
         */
        async makeSingleProductCart()
        {            
            try
            {
                //  Empty the cart
                this.$store.commit("emptyCart");

                //  Get selected product from API
                const response = await HTTP().get(`/products/${this.$route.params.productId}`);
                let product = response.data;

                //  Set amount to one and store in local storage
                product.amount = 1;
                this.$store.commit("addToCart", product);

                //  Show toast for customer with feedback
                toastr.success( this.$t("product.checkout.addedToCart") );

                this.calcTotalPrice();
            }
            catch(e)
            {
                console.error("[Product] Error on loading data: ", e);
                toastr.error( this.$t("general.error.load") );
            }
        },
        async checkout()
        {
            if( !this.email || !this.name || !this.zipCode )
            {
                return toastr.error( $t("general.missingInput") );
            }
            try
            {
                const response = await HTTP().post("/cart/submit", {
                    cart: this.cart,
                    totalPrice: this.totalPrice,
                    totalPorto: this.totalPorto,
                    country: this.country,
                    name: this.name,
                    city: this.city,
                    street: this.street,
                    houseNumber: this.houseNumber,
                    zipCode: this.zipCode,
                    email: this.email
                });
                console.log("[Checkout] Response: ", response);
                this.orderNumber = response.data.orderId;
                this.$store.commit("emptyCart");
                this.submitted = true;
            } catch(e)
            {
                console.error("[Checkout] Error on checkout: ", e);
                toastr.error( this.$t("product.checkout.submitError") );
            }
        },
        async calcTotalPrice()
        {                        
            this.totalPorto = 0;   
            this.totalPrice = 0;
            if( !this.cart.length ) return;
            this.isCalculating = true;
            let totalWeight = 0;
            try
            {
                for( let i = 0; i < this.cart.length; i++)
                {
                    let product = this.cart[i];                    
                    this.totalPrice += product.price * product.amount;
                    totalWeight += product.hasPorto ? product.weight * product.amount : 0;
                }
                console.log("[Cart] Calculated weight for: ", totalWeight);
                if( totalWeight )
                {
                    const portoResponse = await HTTP().get(`/porto/${totalWeight}`);                
                    this.totalPorto = portoResponse.data.price;
                    this.totalPrice += this.totalPorto;
                }
            }
            catch(e)
            {
                toastr.error( this.$t("cart.error.calc") );
                console.error("[Cart] Error on calculating price: ", e);
            }
            this.isCalculating = false;
        },
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

.product-list
{
    margin-top: 24px;
}

.total-price
{
    margin-top: 24px;
    text-align: right;
    small
    {
        font-size: 70%;
    }
}

.product-list-item
{
    background-size: cover;
    background-position: 50% 0%;
    box-shadow: inset 50px 50px 500px rgba(255,255,255,0.95);
    color: black !important;
    border-color: $gray1;
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
