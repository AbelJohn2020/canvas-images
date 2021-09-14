<template>
    <div class="container">
        <div class="first-board">
            <div 
                class="first-board__first-zone"
                @drop="onDrop($event, 1)"
                @dragenter.prevent
                @dragover.prevent
            >
                <div
                    v-for="saint in getList(1)"
                    :key="saint.id"
                    class="first-board__first-zone--drag"
                    draggable="true"
                    @dragstart="startDrag($event, saint)"
                >
                    <img :src="saint.url" :alt="saint.name" class="first-image">
                </div>
            </div>
        </div>
        <div class="second-board">
            <div 
                class="second-board__second-zone"
                @drop="onDrop($event, 2)"
                @dragenter.prevent
                @dragover.prevent
            >
                <div class="second-board__second-zone--first-block" @dblclick="handleClickOut($event, myStore)"></div>
                <div
                    v-for="saint in getList(2).slice(getList(2).length -1, getList(2).length)"
                    :key="saint.id"
                    class="second-board__second-zone--second-drag"
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
                <div class="second-board__second-zone--second-block" @dblclick="handleClickOut($event, myStore)"></div>
            </div>
            <div class="edition">
                <Button :className="'cut-button btn'" :classNameDisable="'cut-button'">
                    <Icon type="download" class="cut-button__icon"/>
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import ImageCropper from '../components/ImageCropper.vue';
import Button from '../components/Button.vue';
import { Icon } from 'ant-design-vue';

export default {
    name: 'OtherWay',
    components: {
        ImageCropper,
        Button,
        Icon
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
        },
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

    .first-board {
        width: 16%;
        background: #343434;
        padding: 0 4px 0 0;
    }

    .first-board__first-zone,
    .second-board__second-zone {
        max-height: 100vh;
        box-sizing: border-box;
    }

    .first-board__first-zone {
        width: 100%;
        padding: 16px 12px 16px 16px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .first-board__first-zone::-webkit-scrollbar {
        width: 8px;
        background: #343434;
    }

    .first-board__first-zone::-webkit-scrollbar-thumb {
        background: #7F7F7F;
        border-radius: 4px;
    }
    
    .first-board__first-zone::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }

    .second-board {
        width: 84%;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 92% 8%;
    }

    .second-board__second-zone {
        width: 100%;
        background: #7F7F7F;
        display: grid;
        grid-template-columns: 26% 48% 26%;
        grid-template-rows: 100%;
    }

    .first-board__first-zone--drag {
        width: 100%;
        padding: 0;
        margin: 0 0 8px 0;
        box-sizing: border-box;
    }

    .second-board__second-zone--second-drag {
        width: 100%;
        padding: 8%;
        margin: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .second-board__second-zone--second-drag img,
    .first-board__first-zone--drag img {
        box-sizing: border-box;
    }

    .first-board__first-zone--drag img {
        width: 100%;
    }

    .second-board__second-zone--second-drag img {
        width: 80%;
    }

    .normal-image {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .first-image {
        cursor: pointer;
    }

    .default-image {
        cursor: pointer;
    }

    .edition {
        background: #F0F0F0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cut-button {
        background: transparent;
        padding: 4px 8px;
        outline: none;
        border-radius: 8px;
    }

    .btn {
        border: #7F7F7F solid 2px;
        color: #7F7F7F;
        cursor: pointer;
    }

    .btn:hover {
        background: #7F7F7F;
        color: #232323;
    }

    .cut-button__icon {
        background: transparent;
        font-size: 16px;
    }
</style>