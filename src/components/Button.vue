<template>
    <div>
        <button
            :class="className"
            v-if="conditional"
            @click="handleClick"
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
            handleClick: Function,
            conditional: Boolean,
        },
        computed: {
            myState() {
                return this.$store.state;
            }
        },
    }
</script>