<template>
    <div class="page-wrapper">
        <div class="content" v-if="content" v-html="content">
        </div>
    </div>    
</template>

<script>

export default
{
    computed:
    {
        content()
        {
            let content = this.$store.getters.content("news-content");
            return content.replace(new RegExp("---", 'g'), "<hr>");
        }
    },
    mounted()
    {
        this.$emit("change-title", this.$t("news.title"));
    }
}
</script>

<style lang="scss" scoped>

@import "../../styles/variables.scss";

.content
{
    @include font2();
    margin-bottom: 16px;
    margin-top: -1rem;
    padding: 48px;
}


</style>
