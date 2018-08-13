<template>
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
                    <textarea class="form-control" v-model="description"></textarea>
                </div>
                <div class="form-group">
                    <label>{{ $t("general.price") }}</label>
                    <input type="number" placeholder="9,99" class="form-control" v-model="price">
                </div>
                <div class="form-group">
                    <label>{{ $t("general.image") }}</label>
                    <input accept="image/*" type="file" class="form-control" @change="imageChanged($event)">
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
            isSendingRequest: false,
            percentCompleted: 0
        }
    },
    mounted()
    {
        this.$emit("change-title", this.$t("backend.newProduct.title") );
    },
    methods:
    {
        imageChanged( e )
        {
            if( e.target.files[0] )
            {
                this.image = e.target.files[0];
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

            data.append( "title", this.title );
            data.append( "subtitle", this.subtitle );
            data.append( "description", this.description );
            data.append( "isbn", this.isbn );
            data.append( "price", this.price );
            data.append( "image", this.image );
            
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
            HTTP().post("/products", formData, config).then( response => {
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

.col-12
{
    padding: 24px 48px;
}

</style>

