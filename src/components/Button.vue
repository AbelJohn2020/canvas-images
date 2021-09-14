<template>
    <div>
        <button
            :class="className"
            v-if="myState.cutButton === true && myState.editImage === true"
        >
            <slot />
        </button>

        <button
            :class="classNameDisable"
            v-else
            disabled
        >
            <slot />
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            className: String,
            classNameDisable: String,
        },
        computed: {
            myState() {
                return this.$store.state;
            }
        }
    }
</script>