<template>
    <div class="row">
        <div class="col-12 content" v-if="content">
            {{ content.text }}
        </div>
    </div>    
</template>

<script>

import { HTTP } from "../../../util";

export default
{
    computed:
    {
        content()
        {
            return this.$store.getters.content("news-content");
        }
    },
    mounted()
    {
        this.$emit("change-title", this.$t("news.title"));
    }
}
</script>

<style lang="scss" scoped>

@import "../../../styles/variables.scss";

.content
{
    @include font2();
    margin-bottom: 16px;
    margin-top: -1rem;
}


</style>
