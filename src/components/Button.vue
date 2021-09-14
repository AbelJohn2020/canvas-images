<template>
    <div>
        <button
            :class="className"
            v-if="myState.cutButton === true && myState.editImage === true"
            @click="download"
        >
            <slot />
        </button>

        <button
            :class="classNameDisable"
            v-else
            disabled
        >
            <slot />
        </button>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        props: {
            className: String,
            classNameDisable: String,
        },
        computed: {
            myState() {
                return this.$store.state;
            }
        },

        methods: {
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
                    url: this.myState.destination,
                    responseType: 'blob',
                })
                    .then(res => {
                        this.fileDownload(res, this.myState.image);
                        this.myState.editImage = false;
                        this.myState.cutButton = false;
                    })
                    .catch( e => console.log(e))
            }
        }
    }
</script>