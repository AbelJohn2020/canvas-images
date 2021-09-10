<template>
    <div class="container">
        <div
            class="first-zone"
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
        >
            <div
                v-for="saint in getList(2)"
                :key="saint.id"
                class="drag"
                draggable="true"
                @dragstart="startDrag($event, saint)"
            >
                <img :src="saint.url" :alt="saint.name">
            </div>
        </div>
    </div>
</template>

<script>
import saintseiya from '../data/data.json';

export default {
    data() {
        return {
            data: saintseiya,
        };
    },
    methods: {
        getList: function (list) {
            return this.data.filter(saint => saint.list === list)
        },
        startDrag: function(event, saint) {
            event.dataTransfer.dropEffect='move';
            event.dataTransfer.effectAllowed='move';
            event.dataTransfer.setData('saintID', saint.id);
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

    .first-zone,
    .second-zone {
        background: #343434;
        padding: 16px;
        max-height: 100vh;
    }

    .first-zone {
        width: 16%;
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
</style>