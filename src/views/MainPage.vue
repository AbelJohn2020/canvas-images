<template>
    <div class="container">
        <div
            class="first-zone"
        >
            <div
                v-for="saint in getList(1)"
                :key="saint.id"
                class="drag"
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
</style>