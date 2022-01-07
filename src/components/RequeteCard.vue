<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title"> {{requestName}} </div>
            </md-card-header>

            <md-card-content>
                <div class="card-footer"> {{requestDate}} </div>
            </md-card-content>
        </md-card>
    </div>
</template>

<style lang="scss" scoped>
    .md-card {
        width: 186px;
        height: 250px;
        vertical-align: top;
        background-color: white;
        border-radius: 12px;
        margin: 1.5em;
        border: none;
        box-shadow: 3px 5px 5px #b5b5b5;
        list-style: none;
        display: flex;
        position: relative;
    }

    .card-footer {
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>

<script>
export default{
    name: "RequeteCard",
    props: {
        requestName: {
            type: String,
            default: "",
        },
        requestDate: {
            type: String,
            default: "",
        }
    },
    created() {

    }
}
</script>
