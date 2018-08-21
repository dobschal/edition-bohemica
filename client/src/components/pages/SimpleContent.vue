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
            let content = this.$store.getters.content( this.$route.params.contentId );
            return content.replace(new RegExp("---", 'g'), "<hr>");
        }
    },
    watch:
    {
        "$route"( from, to )
        {
            this.$emit("change-title", this.$t(`contentId.${this.$route.params.contentId}`));
        }
    },
    mounted()
    {
        this.$emit("change-title", this.$t(`contentId.${this.$route.params.contentId}`));
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
