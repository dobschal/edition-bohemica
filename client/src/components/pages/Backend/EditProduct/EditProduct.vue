<template>
    <div>
        <form @submit.prevent="save">
            <div class="form-group">
                <label>{{ $t("general.title") }}</label>
                <input type="text" placeholder="Titel des Produktes..." class="form-control" v-model="title">
            </div>
            <div class="form-group">
                <label>{{ $t("general.subtitle") }}</label>
                <input type="text" placeholder="Untertitel des Produktes..." class="form-control" v-model="subtitle">
            </div>
            <div class="form-group">
                <label>ISBN</label>
                <input type="text" placeholder="123456789" class="form-control" v-model="isbn">
            </div>
             <div class="form-group">
                <label>{{ $t("general.description") }}</label>
                <textarea class="form-control" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label>{{ $t("general.price") }}</label>
                <input type="number" placeholder="9,99" class="form-control" v-model="price">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="publicCheck1" v-model="isPublic">
                <label class="form-check-label" for="publicCheck1">Öffentlich?</label>
            </div>
            <div class="form-group">
                <label>{{ $t("general.image") }}</label>
                <div class="row">
                    <div class="col preview-image">
                        <img :src="imageUrl">
                    </div>
                    <div class="col">
                        <input accept="image/*" type="file" class="form-control" @change="imageChanged($event)">
                    </div>
                </div>                
            </div>
            <div class="inline-form">
                <tds-button type="submit" :is-loading="isSendingRequest" button-style="success" :text="$t('general.save')"></tds-button>
                <router-link to="/admin" class="btn btn-secondary">{{ $t("general.cancel") }}</router-link>
                <div class="badge badge-info float-right mt-2" v-if="isSendingRequest">
                    {{ $t("general.upload") }} {{ percentCompleted }}%
                </div>
            </div>
        </form>
    </div>
</template>

<script>

import { HTTP } from "../../../../util";
import toastr from "toastr";

export default {
    computed:
    {
        inputValid()
        {
            return true;
        }
    },
    data()
    {
        return {
            title: "",
            subtitle: "",
            description: "",
            isbn: "",
            price: 0.00,
            image: null,
            imageUrl: "",
            isSendingRequest: false,
            percentCompleted: 0,
            isPublic: false,
            id: ""
        }
    },
    created()
    {
        this.loadProduct();
    },
    mounted()
    {
        this.$emit("change-title", this.$t("backend.editProduct.title") );
    },
    methods:
    {
        async loadProduct()
        {
            const response = await HTTP().get(`/products/${this.$route.params.productId}`);
            const { description, title, image:imageUrl, isbn, modifiedAt, price, public:isPublic, subtitle, _id } = response.data;

            this.description = description;
            this.title = title;
            this.imageUrl = imageUrl;
            this.isbn = isbn;
            this.modifiedAt = modifiedAt;
            this.price = price;
            this.isPublic = isPublic;
            this.subtitle = subtitle;
            this.id = _id;

            console.log("[EditProduct] Got response: ", response);
        },
        imageChanged( e )
        {
            if( e.target.files[0] )
            {
                this.image = e.target.files[0];
                var reader = new FileReader();
                reader.onload = (e) =>
                {
                    this.imageUrl = e.target.result;
                };
                reader.readAsDataURL( this.image );
            }
        },

        save()
        {
            if( this.isSendingRequest ) 
            {
                toastr.info( this.$t("general.saveInProgress") );
                return;
            }

            if(!this.inputValid)
            {
                toastr.error( this.$t("general.error.missingInput") );                
                return;
            }
            
            let data = new FormData();

            data.append( "_id", this.id );
            data.append( "title", this.title );
            data.append( "subtitle", this.subtitle );
            data.append( "description", this.description );
            data.append( "isbn", this.isbn );
            data.append( "price", this.price );
            data.append( "image", this.imageUrl );
            data.append( "public", this.isPublic );            
            if( this.image ) data.append( "new_image", this.image );
            
            this.sendRequest( data );
        },

        sendRequest( formData )
        {
            this.isSendingRequest = true;
            let config = {
                onUploadProgress: progressEvent => {
                    this.percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                }
            }
            HTTP().put(`/products/${this.id}`, formData, config).then( response => {
                console.log("[NewProduct] Response: ", response);
                this.isSendingRequest = false;
                toastr.success(this.$t("general.saveSuccessful"));
                this.$router.push("/admin");
            }).catch( error => {
                console.error("[NewProduct] Error: ", error);
                toastr.error( this.$t("general.error.save") );
                this.isSendingRequest = false;
            });            
        }
    }
}
</script>


<style lang="scss" scoped>

.preview-image img
{
    width: 100%;
}

</style>

