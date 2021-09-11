<template>
    <div class="container">
        <div 
            class="first-zone"
            @drop="onDrop($event, 1)"
            @dragenter.prevent
            @dragover.prevent
        >
            <div
                v-for="saint in getList(1)"
                :key="saint.id"
                class="drag"
                draggable="true"
                @dragstart="startDrag($event, saint)"
            >
                <img :src="saint.url" :alt="saint.name" class="first-image">
            </div>
        </div>
        <div 
            class="second-zone"
            @drop="onDrop($event, 2)"
            @dragenter.prevent
            @dragover.prevent
        >
            <div
                v-for="saint in getList(2).slice(getList(2).length -1, getList(2).length)"
                :key="saint.id"
                class="drag"
                draggable="true"
                @dragstart="startDrag($event, saint)"
            >
                <div class="normal-image" v-if="myStore.state.editImage === false"> 
                        <img 
                            class="default-image" 
                            ref='secondImage' 
                            :src="saint.url"
                            :alt="saint.name"
                            @click="handleMouseDown($event, myStore)"
                        >
                </div>
                <ImageCropper
                    :src="saint.url"
                    :alt="saint.name"
                    :destinationalt="saint.name"
                    :editedImg="'third-image'"
                    v-else
                />
            </div>
        </div>
    </div>
</template>

<script>
// import saintseiya from '../data/data.json';
import ImageCropper from '../components/ImageCropper.vue'

export default {
    name: 'OtherWay',
    components: {
        ImageCropper
    },

    computed: {
        saintseiya() {
            return this.$store.state.data;
        },
        myStore() {
            return this.$store;
        },
    },
    
    methods: {
        getList: function (list) {
            return this.saintseiya.filter(saint => saint.list === list)
        },
        startDrag: (event, saint) => {
            event.dataTransfer.dropEffect='move';
            event.dataTransfer.effectAllowed='move';
            event.dataTransfer.setData('saintID', saint.id)
        },
        onDrop: function (event, list) {
            const saintID = event.dataTransfer.getData('saintID');
            const saint = this.saintseiya.find( saint => saint.id === saintID )
            saint.list = list
        },
        handleMouseDown: (event, store) => {
            const e = event.target;
            console.log(store.state.editImage, e)
            if(e) {
                return store.state.editImage = true;
            } else {
                console.log(store.state.editImage, 'else')
            }
            console.log(store.state.editImage, 'out')
        }
    }
}
</script>


<style>
    .container {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0;
    }

    .first-zone,
    .second-zone {
        background: #343434;
        max-height: 100vh;
    }

    .first-zone {
        width: 16%;
        padding: 16px;
        overflow-y: scroll;
    }

    .second-zone {
        width: 84%;
        padding: 2% 26%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .drag {
        width: 100%;
        background: #EEEEEE;
        padding: 0;
        margin: 0 0 8px 0;
        box-sizing: border-box;
    }

    .drag img {
        width: 100%;
        box-sizing: border-box;
    }

    .first-image {
        cursor: pointer;
    }

    .third-image {
        opacity: 0.7;
    }

    .default-image {
        cursor: pointer;
    }
</style>