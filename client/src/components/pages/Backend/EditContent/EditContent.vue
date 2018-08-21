<template>
    <div class="page-wrapper">
        <div class="row">
            <div class="col-12">
                <form @submit.prevent="save" class="mt-4">
                    <vue-editor :editorToolbar="customToolbar" v-model="contentItem.text"></vue-editor>
                    <button type="submit" class="btn btn-primary mt-4">{{ $t("general.save") }}</button>
                    <router-link to="/admin/content" class="btn btn-secondary mt-4">{{ $t("general.cancel") }}</router-link>
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
    components: {
        VueEditor
    },
    data()
    {
        return {
            contentItem: "",
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ["table"]
            ]
        };
    },
    created()
    {
        const { contentId } = this.$route.params;
        this.loadContent();
        this.$emit("change-title", this.$t("backend.editContent.title") );
    },
    methods:
    {
        async save()
        {
            try
            {
                const response = await HTTP().put(`/content/${this.$route.params.contentId}`, this.contentItem);
                toastr.success( this.$t("general.saveSuccessful") );
                this.$router.push("/admin/content");
            }
            catch(e)
            {
                console.error("[EditContent] Unable to save content.", e);   
                toastr.error( this.$t("general.error.save") );
            }
        },
        async loadContent()
        {
            try
            {
                const response = await HTTP().get(`/content/${this.$route.params.contentId}`);
                this.contentItem = response.data;
            }
            catch(e)
            {
                console.error("[EditContent] Unable to load content", e);
                toastr.error( this.$t("general.error.load") );
            }
        }
    }
}
</script>

<style lang="scss" scoped>


</style>

