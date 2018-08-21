<template>
    <div class="page-wrapper">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="save">
                    <div class="form-group">
                        <label>PDF auswählen:</label>
                        <select v-model="pdfId" @change="load" class="form-control">
                            <option disabled value="">Welche PDF soll geändert werden?</option>
                            <option value="program">Verlagsprogramm</option>
                            <option value="images">Bilderschatztruhe</option>
                        </select>
                    </div>
                    <div v-if="entity">
                        <div class="form-group">
                            <label>{{ $t("general.title") }}</label>
                            <input type="text" placeholder="Title" class="form-control" v-model="entity.title">
                        </div>
                        <div class="form-group">
                            <label>{{ $t("backend.pdf.pdfUpload") }}</label>
                            <input type="file" class="form-control" @change="fileChanged( $event )">
                        </div>
                        <div class="form-group">
                            <div class="badge badge-info float-right mt-2" v-if="isSendingRequest">
                                {{ $t("general.upload") }} {{ percentCompleted }}%
                            </div>
                            <tds-button type="submit" :is-loading="isSendingRequest" button-style="success" :text="$t('general.save')"></tds-button>
                        </div>
                    </div>
                </form>
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
            pdfId: "",
            entity: null,
            title: "",
            file: null,
            isSendingRequest: false,
            percentCompleted: 0
        };
    },
    created()
    {        
        this.$emit("change-title", this.$t("backend.pdf.title") );
    },
    methods:
    {
        async load()
        {
            try
            {
                const response = await HTTP().get(`/pdfpage/${this.pdfId}`);
                this.entity = response.data;
            }
            catch(e)
            {
                console.error("[PDF] Unable to load PDF", e);
                toastr.error( this.$t("general.error.load") );
            }
        },
        fileChanged( e )
        {
            if( e.target.files[0] )
            {
                this.file = e.target.files[0];            
            }
        },
        save()
        {            
            if( this.isSendingRequest ) 
            {
                toastr.info( this.$t("general.saveInProgress") );
                return;
            }
            
            let data = new FormData();

            data.append( "_id", this.entity._id );
            data.append( "title", this.entity.title );            
            data.append( "pdf", this.entity.pdf );                      
            if( this.file ) data.append( "new_pdf", this.file );
            
            this.sendRequest( data );
        },

        sendRequest( formData )
        {
            this.isSendingRequest = true;
            let config =
            {
                onUploadProgress: progressEvent =>
                {
                    this.percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
                }
            }
            HTTP().put(`/pdfpage/${this.pdfId}`, formData, config).then( response => {
                console.log("[PDFPage] Response: ", response);
                this.isSendingRequest = false;
                toastr.success(this.$t("general.saveSuccessful"));
            }).catch( error => {
                console.error("[PDFPage] Error: ", error);
                toastr.error( this.$t("general.error.save") );
                this.isSendingRequest = false;
            });            
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../../styles/variables.scss";


</style>

