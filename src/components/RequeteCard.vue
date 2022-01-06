<template>
    <div>
        <md-card>
            <md-card-header>
                <div class="md-title"> {{requestName}} </div>
            </md-card-header>

            <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
            </md-card-content>
        </md-card>
    </div>
</template>

<style lang="scss" scoped>
    .md-card {
        width: 186px;
        height: 250px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }
</style>

<script>
export default{
    name: "RequeteCard",
    props: {
        requestName: {
            type: String,
            default: "",
        }
    }
}
</script>
