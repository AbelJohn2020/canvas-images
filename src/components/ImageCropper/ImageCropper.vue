<template>
    <div class="container-image">
        <div class="cropper">
            <img ref="image" :src="src" :alt="alt">
        </div>
    </div>
</template>

<script>
    import Cropper from 'cropperjs';

    export default {
        name: 'ImageCropper',
        props: {
            src: String,
            alt: String,
        },
        data() {
            return {
                cropper: {},
                destination: {},
                image: {},
            };
        },
    }
</script>