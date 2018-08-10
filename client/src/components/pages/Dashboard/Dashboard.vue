<template>
    <div>
        Hier kommt Inhalt..
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
