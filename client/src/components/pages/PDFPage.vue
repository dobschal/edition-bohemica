<template>
    <div class="page-wrapper">
        <div class="row">
            <div class="col-12">
                <span v-if="entity">
                    <div class="button-group">
                        <div v-tooltip="$t('general.zoomOut')" class="zoom-out-button" @click="zoomOut"></div>
                        <div v-tooltip="$t('general.zoomIn')" class="zoom-in-button" @click="zoomIn"></div>
                        <a v-tooltip="$t('general.download')" :href="entity.pdf" target="_blank" class="download-button"></a>
                    </div>
                    <div class="pdf-wrapper">
                        <pdf class="pdf-viewer" :style="{ width: viewerWidth }" :src="entity.pdf"></pdf>
                    </div>
                </span>
            </div>           
        </div>
    </div>
</template>

<script>

import { HTTP } from "../../util";
import toastr from "toastr";
import pdf from 'vue-pdf';

export default {
    components:
    {
        pdf
    },
    data()
    {
        return {
            entity: null,
            viewerWidth: "100%"
        };
    },
    mounted()
    {
        this.$emit("change-title", this.$t(`${this.$route.params.id}.title`) );
        this.load();
    },
    methods: {
        async load()
        {
            try
            {
                const response = await HTTP().get(`/pdfpage/${this.$route.params.id}`);
                this.entity = response.data;
            }
            catch(e)
            {
                console.error("[PDF Page] Unable to load PDF Page", e);
                toastr.error( this.$t("general.error.load") );
            }
        },
        zoomIn()
        {
            let intVal = parseInt((this.viewerWidth + "").replace("%", ""));
            intVal += 10;
            this.viewerWidth = intVal + "%";
        },
        zoomOut()
        {
            let intVal = parseInt((this.viewerWidth + "").replace("%", ""));
            intVal -= 10;
            this.viewerWidth = intVal + "%";
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../styles/variables.scss";

.pdf-wrapper
{
    width: 100%;
    overflow: scroll;
    max-height: calc(100vh - 160px);    

    .pdf-viewer
    {
        transition: width 0.5s $transitionEasing;
    }
}

.button-group
{    
    margin-bottom: 16px;
    height: 28px;
    
    .zoom-in-button
    {
        @include iconButton("../../assets/button-zoom-in.svg");
        float: right;
        margin-left: 8px;
    }

    .zoom-out-button
    {
        @include iconButton("../../assets/button-zoom-out.svg");
        float: right;
        margin-left: 8px;
    }

    .download-button
    {
        @include iconButton("../../assets/button-download.svg");
        float: right;
        margin-left: 8px;
    }
}

</style>
