<template>
    <div
        :class="className"
        :@drop="boardDrop"
        @dragenter.prevent
        @dragover.prevent
    >
        <slot />
    </div>
</template>

<script>
export default {
    
}
</script>