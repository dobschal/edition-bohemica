<template>
    <div class="content">

        <div class="content-table">
            <div class="row table-head">
                <div class="col-1">#</div>
                <div class="col">{{ $t("general.title") }}</div>
            </div>
            <router-link :to="'/admin/content/' + content.id" class="row content" v-for="(content, index) in contents" :key="content.id">
                <div class="col-1">{{ index }}</div>
                <div class="col-4">{{ $t( "contentId." + content.id ) }}</div>
            </router-link>
        </div>

    </div>
</template>

<script>

import { HTTP } from "../../../../util";
import toastr from "toastr";

export default {
    data()
    {
        return {
            errors: [],
            contents: []
        };
    },
    mounted()
    {
        this.$emit("change-title",  this.$t("backend.contents.title") );        
    },
    created()
    {
        this.loadContents()
    },
    methods:
    {        
        async loadContents()
        {            
            try
            {
                const response = await HTTP().get("/content");
                this.contents = response.data;
            }
            catch(e)
            {
                this.errors.push(this.$t("general.error.load"));
            }
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../../../styles/variables.scss";

.add-button
{
    margin: 32px 48px 0px 0px;
}

.content-table
{
    margin-top: 32px;
    .table-head
    {
        font-weight: bold;
        border-bottom: solid 1px rgba($darkBlue, 0.1);
        margin: 0px 48px;
        height: 48px;
        line-height: 48px;
    }

    .row.content
    {
        height: 48px;
        line-height: 48px;
        border-bottom: solid 1px rgba($darkBlue, 0.1);
        margin: 0px 48px;
        &:hover
        {
            background: rgba( $darkBlue, 0.05);
            cursor: pointer;
        }
        > div
        {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

</style>

