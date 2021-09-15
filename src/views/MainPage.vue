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
                                id="edition-image"
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
                <Button 
                    :className="'cut-button btn'" 
                    :classNameDisable="'cut-button'"
                    :handleClick="download"
                    :conditional="downloadConditional(myStore)"
                >
                    <Icon type="download" class="cut-button__icon"/>
                </Button>

                <Button 
                    :className="'rotate-button btn'" 
                    :classNameDisable="'rotate-button'"
                    :handleClick="handleRotateDeg"
                    :conditional="rotateConditional(getList(2))"
                >
                    {{ myStore.state.position + '°' }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    import ImageCropper from '../components/ImageCropper.vue';
    import Button from '../components/Button.vue';
    import { Icon } from 'ant-design-vue';
    import axios from 'axios';

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
                        return store.state.cutButton = false, store.state.editImage = false ;
                    }
                }
            },

            downloadConditional: (myStore) => {
                if(myStore.state.cutButton === true && myStore.state.editImage === true){
                    return true;
                }
            },
            rotateConditional: (getList) => {
                if( getList.length > 0) {
                    return true
                }
            },

            fileDownload: ( response, item ) => {
                    const headers = response.headers;
                    const dataType = response.data.type.split('/');
                    const extension = dataType[0] === 'image' ? dataType[1] : 'png';
                    const blob = new Blob([response.data], {type: headers['content-type']});
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${item.alt}.${extension}`;
                    link.click();
                    link.remove();
                },
            download() {
                axios({
                    method: 'get',
                    url: this.myStore.state.destination,
                    responseType: 'blob',
                })
                    .then(res => {
                        this.fileDownload(res, this.myStore.state.image);
                        this.myStore.state.editImage = false;
                        this.myStore.state.cutButton = false;
                    })
                    .catch( e => console.log(e))
            },

            handleRotateDeg: function() {
                if ( this.myStore.state.position >= 270 ) {
                    this.myStore.state.position = 0;
                    document.getElementById('edition-image').style.transform = `rotate(0deg)`;
                } else {
                    this.myStore.state.position += 90;
                    document.getElementById('edition-image').style.transform = `rotate(${this.myStore.state.position}deg)`;
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

    .rotate-button,
    .cut-button {
        background: transparent;
        margin: 0 8px 0 0;
        outline: none;
        border-radius: 8px;
    }

    .cut-button {
        padding: 4px 8px;
    }

    .rotate-button {
        padding: 6px 10px;
    }

    .btn {
        border: #7F7F7F solid 2px;
        color: #7F7F7F;
        cursor: pointer;
    }

    .btn:hover {
        background: #7F7F7F;
        color: #F0F0F0;
    }

    .cut-button__icon {
        background: transparent;
        font-size: 16px;
    }
</style>