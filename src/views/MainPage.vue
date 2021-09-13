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
            <div class="first-block" @dblclick="handleClickOut($event, myStore)"></div>
            <div
                v-for="saint in getList(2).slice(getList(2).length -1, getList(2).length)"
                :key="saint.id"
                class="drag"
                @dragstart="startDrag($event, saint)"
            >
                <div class="normal-image" v-if="myStore.state.editImage === false"> 
                        <img 
                            class="default-image" 
                            :src="saint.url"
                            :alt="saint.name"
                            draggable="true"
                            @dblclick="handleDobleClick($event, myStore)"
                        >
                </div>
                <ImageCropper
                    :src="saint.url"
                    :alt="saint.name"
                    :destinationalt="saint.name"
                    v-else
                />
            </div>
            <div class="second-block" @dblclick="handleClickOut($event, myStore)"></div>
        </div>
    </div>
</template>

<script>
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
        handleDobleClick: (event, store) => {
            const e = event.target;
            if(e) {
                return store.state.editImage = true;
            }
        },
        handleClickOut: (event, store) => {
            const e = event.target;
            if(e) {
                if(store.state.editImage === true && store.state.cutButton === true){
                    console.log('click out')
                    return store.state.cutButton = false, store.state.editImage = false ;
                }
            }
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
        box-sizing: border-box;
        display: grid;
        grid-template-columns: 26% 48% 26%;
    }

    .drag {
        width: 100%;
        padding: 0;
        margin: 0 0 8px 0;
        box-sizing: border-box;
        overflow: hidden;
    }

    .drag img {
        width: 100%;
        box-sizing: border-box;
    }

    .first-image {
        cursor: pointer;
    }

    .default-image {
        cursor: pointer;
    }
</style>