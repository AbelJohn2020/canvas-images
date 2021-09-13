<template>
    <div class="container-image">
        <div 
            v-if="myState.cutButton === false" 
            :class="className"
            @click="handleClickEditImage($event, myState)"
        >
            <img ref="image" :src="src" :alt="alt" draggable="true">
        </div>
        <div v-else class="new-image">
            <img 
                :src="destination" 
                :alt="destinationalt" 
                class="third-image"
                draggable="true"
                @dblclick="dobleClickEditImage($event, myState)"
            >
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
            this.croppedCanvas();
        },

        updated() {
            if(this.myState.cutButton === true){
                this.cropper.canvas.style.display = 'none';
                this.cropper.cropper.style.display='none';
                this.image.style.display='';
            } else {
                this.cropper.canvas.style.display = '';
                this.cropper.cropper.style.display='';
                this.image.style.display='none';
            }
        },

        methods: {
            croppedCanvas() {
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

            handleClickEditImage: (event, state) => {
                const e = event.target;
                if(e) {
                    return state.cutButton = true, state.editImage = true;
                }
            },

            dobleClickEditImage: (event, state) => {
                const e = event.target;
                if(e) {
                    return state.cutButton = false, state.editImage = true ;
                }
            },
        },
    }
</script>

<style>
    .container-image {
        width: 100%;
        overflow: hidden;
    }

    .new-image {
        width: 100%;
        margin: 0;
        box-sizing: border-box;
        cursor: pointer;
    }

    .third-image {
        width: 100%;
        display: flex;
    }
</style>