<template>
    <div>
        <button class="btn" :type="type" @click="fire" :class="[loadingIndicator, 'btn-' + buttonStyle]">{{ text }}</button>
    </div>
</template>

<script>
export default
{
    props: {
        text: String, 
        isLoading: Boolean,
        buttonStyle: String,
        type: String
    },
    computed:
    {        
        loadingIndicator()
        {
            return this.isLoading ? "disabled is-loading" : "";
        }
    },
    methods:
    {
        fire()
        {
            this.$emit("clicked", null);
        }
    }
}
</script>

<style lang="scss" scoped>

    @keyframes rotate {
        from { transform: rotate(0); }
        to { transform: rotate(360deg); }
    }

    div
    {
        display: inline-block;
    }

    button:focus, button:active
    {
        outline: none !important;
        box-shadow: none !important;
    }

    .is-loading::after
    {
        content: "X";
        margin: 0 0 0 10px;
        height: 15px;
        width: 15px;
        border: solid transparent 2px;
        border-bottom-color: white;
        border-top-color: white;
        border-right-color: white;
        border-radius: 50%;
        font-size: 0;
        line-height: 0;
        vertical-align: text-top;
        display: inline-block;
        animation-name: rotate;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

</style>



