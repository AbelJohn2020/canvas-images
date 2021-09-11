<template>
    <div class="container-image">
        <div class="edit-image">
            <div v-if="this.$store.state.cutButton === false" class="cropper">
                <img :class="className" ref="image" :src="src" :alt="alt">
            </div>
            <div v-else class="new-image">
                <img :src="destination" :alt="destinationalt" :class="editedImg">
            </div>
        </div>
    </div>
</template>

<script>
    import Cropper from 'cropperjs';

    export default {
        name: 'ImageCropper',
        props: {
            className: String,
            src: String,
            alt: String,
            editedImg: String,
            destinationalt:String,
        },
        data() {
            return {
                cropper: {},
                destination: {},
                image: {},
                secondImage: {},
            };
        },

        mounted() {
            console.log(this.$store.state.editImage, 'cropper')
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
        },
    }
</script>

<style>
    .new-image {
        width: 16%;
        top: 5%;  
    }
</style>