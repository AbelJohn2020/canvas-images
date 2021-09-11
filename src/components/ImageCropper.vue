<template>
    <div class="container-image">
        <div 
            v-if="myState.cutButton === false" 
            :class="className"
            @click="handleClickEditImage($event, myState)"
        >
            <img ref="image" :src="src" :alt="alt">
        </div>
        <div v-else class="new-image">
            <img :src="destination" :alt="destinationalt" :class="editedImg" @dblclick="dobleClickEditImage($event, myState)">
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
            };
        },

        computed: {
            myState() {
                return this.$store.state;
            },
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
        },
        methods: {
            handleClickEditImage: (event, state) => {
                const e = event.target;
                if(e) {
                    return state.cutButton = true;
                }
            },

            dobleClickEditImage: (event, state) => {
                const e = event.target;
                if(e) {
                    return state.cutButton = false, state.editImage = false ;
                }
            },
        },
    }
</script>

<style>
    .container-image {
        overflow: hidden;
    }
    .new-image {
        width: 100%;
        margin: 100% 0 0 0;
        box-sizing: border-box;
    }
</style>