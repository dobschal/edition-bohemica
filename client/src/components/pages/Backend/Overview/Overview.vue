<template>
    <div class="mt-4">
        <table class="table">
            <thead>
                <tr>
                    <th>{{ $t("general.title") }}</th>
                    <th>{{ $t("general.subtitle") }}</th>
                    <th>ISBN</th>
                    <th>{{ $t("general.public") }}</th>
                    <th>{{ $t("general.actions") }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product._id">
                    <td>{{ product.title }}</td>
                    <td>{{ product.subtitle }}</td>
                    <td>{{ product.isbn }}</td>
                    <td>
                        <span v-if="product.public" class="text-success">{{ $t("general.yes") }}</span>
                        <span v-else  class="text-danger">{{ $t("general.no") }}</span>
                    </td>
                    <td>
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
                    </td>
                </tr>
            </tbody>
        </table>
        <router-link to="/admin/product/new" class="float-right btn btn-secondary">
            <span class="action add"></span>
            {{ $t("backend.overview.addProduct") }}
        </router-link>
    </div>
</template>

<script>

import { HTTP } from "../../../../util";

export default {
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
        async loadProducts()
        {            
            try
            {
                const response = await HTTP.get("/products");
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
            const response = await HTTP.put(`/products/${product._id}`, product);
        },
        edit( product )
        {
            this.$router.push(`/admin/product/${product._id}`);
        }
    }
}
</script>

<style lang="scss" scoped>

.action
{
    height: 24px;
    width: 24px;
    display: inline-block;
    margin-left: 5px; 
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

    &:hover
    {
        cursor: pointer;
    }
}

</style>

