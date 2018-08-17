<template>
    <div class="page-wrapper">
        <div class="row">  
            <div class="col-12">      
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
                        <vue-editor :editorToolbar="customToolbar" v-model="description"></vue-editor>
                    </div>
                     <div class="form-group">
                        <label>{{ $t("general.additionalInfo") }}</label>
                        <vue-editor :editorToolbar="customToolbar" v-model="additionalInfo"></vue-editor>
                    </div>
                    <div class="form-group">
                        <label>{{ $t("general.weight") }}</label>
                        <input type="text" placeholder="1500" class="form-control" v-model="weight">
                    </div>
                    <div class="form-group">
                        <label>{{ $t("general.price") }}</label>
                        <input type="number" placeholder="9,99" class="form-control" v-model="price">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="portoCheck" v-model="hasPorto">
                        <label class="form-check-label" for="portoCheck">{{ $t("general.hasPorto") }}</label>
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
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../../../util";
import toastr from "toastr";
import { VueEditor } from 'vue2-editor';

export default {
    components:
    {
        VueEditor
    },
    computed:
    {
        inputValid()
        {
            return this.title && this.price;
        }
    },
    data()
    {
        return {
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }]
            ],
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
            id: "",
            hasPorto: false,
            additionalInfo: "",
            weight: 0,
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
            const { 
                description, 
                title, 
                image:imageUrl, 
                isbn, 
                modifiedAt, 
                price, 
                public:isPublic, 
                subtitle, 
                _id,
                hasPorto,
                additionalInfo,
                weight
            } = response.data;

            this.description = description;
            this.title = title;
            this.imageUrl = imageUrl;
            this.isbn = isbn;
            this.modifiedAt = modifiedAt;
            this.price = price;
            this.isPublic = isPublic;
            this.subtitle = subtitle;
            this.id = _id;
            this.hasPorto = hasPorto;
            this.additionalInfo = additionalInfo;
            this.weight = weight;

            console.log("[EditProduct] Got product from server: ", response);
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
            this.price = parseFloat( (this.price + "").replace(",", ".") );
            if( isNaN(this.price) )
            {
                toastr.error( this.$t("general.error.priceFormat") );   
                return;
            }
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
            data.append( "hasPorto", this.hasPorto );
            data.append( "additionalInfo", this.additionalInfo );
            data.append( "weight", this.weight );            
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

