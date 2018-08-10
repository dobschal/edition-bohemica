<template>
    <div>
        Hello World 2
    </div>
</template>

<script>
export default
{
    mounted()
    {
        this.$emit("change-title", this.$t("dashboard.title"));
    }
}
</script>
