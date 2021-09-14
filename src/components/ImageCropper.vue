<template>
    <div class="container-image">
        <div 
            v-if="myState.cutButton === false" 
            class="edit-image-box"
            @click="handleClickEditImage($event, myState)"
        >
            <img ref="image" :src="src" :alt="alt" draggable="true">
        </div>
        <div v-else class="new-image">
            <img 
                :src="myState.destination" 
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
                this.myState.cropper.canvas.style.display = 'none';
                this.myState.cropper.cropper.style.display= 'none';
                this.myState.image.style.display='';
            } else {
                this.myState.cropper.canvas.style.display = '';
                this.myState.cropper.cropper.style.display= '';
                this.myState.cropper.canvas.parentElement.style.background='#FFFFFF';
                this.myState.image.style.display='none';
            }
        },

        methods: {
            croppedCanvas() {
                this.myState.image = this.$refs.image;
                this.myState.cropper = new Cropper( this.myState.image, {
                    zoomable: false,
                    scalable: false,
                    aspectRatio: 61/80,
                    crop: () => {
                        const canvas = this.myState.cropper.getCroppedCanvas();
                        this.myState.destination = canvas.toDataURL('image/png');
                        this.myState.cropper.canvas.parentElement.style.background='#FFFFFF';
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

    .edit-image-box,
    .new-image {
        width: 100%;
        margin: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .new-image {
        cursor: pointer;
    }

    .third-image {
        width: 100%;
        display: flex;
    }
</style>