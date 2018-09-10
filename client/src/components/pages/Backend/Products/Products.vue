<template>
    <div class="page-wrapper">
        <h2>{{ $t("backend.overview.publicProducts") }}</h2>
        <div class="product-table">
            <div class="row table-head">
                <div class="col-1">#</div>
                <div class="col-5">{{ $t("general.title") }}</div>
                <div class="col-2">{{ $t("general.public") }}</div>
                <div class="col-4">{{ $t("general.actions") }}</div>
            </div>
            <draggable v-model="products" @update="sortChanged">
                <transition-group>
                    <div class="row product" v-for="(product, index) in products" :key="product._id" v-show="!product.isInPreparation">
                        <div class="col-1">{{ index }}</div>
                        <div class="col-5">{{ product.title }}</div>
                        <div class="col-2">
                            <span v-if="product.public" class="text-success">{{ $t("general.yes") }}</span>
                            <span v-else  class="text-danger">{{ $t("general.no") }}</span>
                        </div>
                        <div class="col-4">
                            <div 
                                @click="publish(product)"
                                v-tooltip="product.public ? $t('general.unpublish') : $t('general.publish')" 
                                class="action" 
                                :class="{ 'hide': product.public, 'publish': !product.public}" >
                            </div>

                            <div 
                                @click="edit(product)" 
                                v-tooltip="$t('general.edit')" 
                                class="action edit" >
                            </div>

                            <div 
                                @click="remove(product)" 
                                v-tooltip="$t('general.delete')" 
                                class="action remove" >
                            </div>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>

        <h2 class="mt-4">{{ $t("backend.overview.productsInPreparation") }}</h2>
        <div class="product-table">
            <div class="row table-head">
                <div class="col-1">#</div>
                <div class="col-5">{{ $t("general.title") }}</div>
                <div class="col-2">{{ $t("general.public") }}</div>
                <div class="col-4">{{ $t("general.actions") }}</div>
            </div>
            <draggable v-model="products" @update="sortChanged">
                <transition-group>
                    <div class="row product" v-for="(product, index) in products" :key="product._id" v-show="product.isInPreparation">
                        <div class="col-1">{{ index }}</div>
                        <div class="col-5">{{ product.title }}</div>
                        <div class="col-2">
                            <span v-if="product.public" class="text-success">{{ $t("general.yes") }}</span>
                            <span v-else  class="text-danger">{{ $t("general.no") }}</span>
                        </div>
                        <div class="col-4">
                            <div 
                                @click="publish(product)"
                                v-tooltip="product.public ? $t('general.unpublish') : $t('general.publish')" 
                                class="action" 
                                :class="{ 'hide': product.public, 'publish': !product.public}" >
                            </div>

                            <div 
                                @click="edit(product)" 
                                v-tooltip="$t('general.edit')" 
                                class="action edit" >
                            </div>

                            <div 
                                @click="remove(product)" 
                                v-tooltip="$t('general.delete')" 
                                class="action remove" >
                            </div>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>

        <router-link to="/admin/product/new" class="float-right btn btn-primary add-button">
            <span class="action add"></span>
            {{ $t("backend.overview.addProduct") }}
        </router-link>

    </div>
</template>

<script>

import { HTTP } from "../../../../util";
import draggable from 'vuedraggable';
import toastr from "toastr";

export default {
    components:
    {
        draggable
    },
    data()
    {
        return {
            errors: [],
            products: []
        };
    },
    mounted()
    {
        this.$emit("change-title",  this.$t("backend.overview.products") );        
    },
    created()
    {
        this.loadProducts()
    },
    methods:
    {
        async sortChanged(event)
        {         
            try
            {
                this.products = this.products.map( (product, index) => {
                    product.sortIndex = index;
                    return product;
                });
                const response = await HTTP().put(`/products/`, this.products);
                toastr.success(this.$t("backend.overview.sort"));
            }
            catch(e)
            {
                toastr.error(this.$t("backend.overview.error.sort"));
            }
        },
        async loadProducts()
        {            
            try
            {
                const response = await HTTP().get("/products");
                this.products = response.data;
            }
            catch(e)
            {
                this.errors.push(this.$t("backend.overview.error.load"));
            }
        },
        async publish( product )
        {
            product.public = !product.public;
            try
            {
                const response = await HTTP().put(`/products/${product._id}`, product);
            }
            catch(e)
            {
                toastr.error(this.$t("backend.overview.error.publish"));
            }
        },
        async remove( product )
        {
            try
            {
                const response = await HTTP().delete(`/products/${product._id}`);
                console.log("[Products] Deleted");
                for(let i = this.products.length - 1; i >= 0; i--)
                {
                    if( this.products[i]._id === product._id )
                    {
                        this.products.splice(i, 1);
                    }
                }
            }
            catch(e)
            {
                toastr.error(this.$t("backend.overview.error.delete"));
            }
        },
        edit( product )
        {
            this.$router.push(`/admin/product/${product._id}`);
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../../../styles/variables.scss";

h2
{
    @include font4();
}

.add-button
{
    margin: 32px 0 0 0;
    .action
    {
        margin-left: -10px;
        margin-top: 3px;
        height: 20px;
        width: 20px;
        background-size: 20px 20px;
    }
}

.product-table
{
    .table-head
    {
        @include font2();
        font-weight: bold;
        border-bottom: solid 1px rgba($darkBlue, 0.1);
        margin: 0;
        height: 48px;
        line-height: 48px;
    }

    .row.product
    {
        @include font2();
        height: 48px;
        line-height: 48px;
        border-bottom: solid 1px rgba($darkBlue, 0.1);
        margin: 0;
        &:hover
        {
            background: rgba( $darkBlue, 0.05);
            cursor: grab;
        }
        > div
        {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.action
{
    height: 24px;
    width: 24px;
    display: inline-block;
    margin: 12px 8px 0px 0px;
    &.publish
    {
        background-image: url("../../../../assets/icon-visible.svg");
    }

    &.hide
    {
        background-image: url("../../../../assets/icon-invisible.svg");
    }

    &.edit
    {
        background-image: url("../../../../assets/icon-edit.svg");
    }

    &.add
    {
        background-image: url("../../../../assets/icon-add.svg");
    }
    &.remove
    {
        background-image: url("../../../../assets/icon-remove.svg");
    }

    &:hover
    {
        cursor: pointer;
    }
}

</style>

