<template>
    <div class="md-layout">
        <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <RequeteCard :requestName="'test'" :requestDate="'date'"></RequeteCard>
        </div>
    </div>
</template>

<script>
import RequeteCard from './RequeteCard.vue';

export default {
    name: "Requetes",
    components: {
        RequeteCard,
    }
}
</script>
