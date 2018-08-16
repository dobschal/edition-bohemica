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

@import "../../styles/variables.scss";

.content
{
    @include font2();
    margin-bottom: 16px;
    margin-top: -1rem;
    padding: 48px;
}


</style>
