<template>
    <div class="container-image">
        <div class="cropper">
            <img ref="image" :src="src" :alt="alt">
        </div>
        <div class="new-image">
            <img :src="destination" :alt="destinationalt">
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
            destinationalt:String
        },
        data() {
            return {
                cropper: {},
                destination: {},
                image: {},
            };
        },
        mounted() {
            this.image = this.$refs.image;
            this.cropper = new Cropper( this.image, {
                zoomable: false,
                scalable: false,
                aspectRatio: 61/80,
                crop: () => {
                    const canvas = this.cropper.getCroppedCanvas();
                    this.destination = canvas.toDataURL('image/png');
                }
            })
        }
    }
</script>

<style>
    .new-image {
        width: 16%;
        top: 5%;  
    }
</style>