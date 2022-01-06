<template>
    <div>
        <ul class="liste">
            <li v-for="quest in dataRequetes" :key="quest.title">
                <div class="requete">
                    <div class="titreRequete">
                        {{quest.title}}
                    </div>
                    <div class="dateRequete">
                        {{quest.date}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {Quest} from "@/model/quest.model";
export default {
    name: "Requetes",
    data() {
        return {
            dataRequetes: [
                new Quest('Titre requête n°1', '01/01/01'),
                new Quest('Titre requête n°2', '02/02/02'),
                new Quest('Titre requête n°3', '03/03/03'),
            ]
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
    height: 10em;
    width: 7.5em;
    margin: 1.5em;
}
.requete {
    background-color: white;
    border-radius: 12px 12px 0px 0px;
    border: none;
    box-shadow: 3px 5px 5px #b5b5b5;
    height: 80%;
    width: 100%;
    display: flex;
    z-index: 0;
    position: relative;
}
.titreRequete {
    font-weight: bold;
}
.dateRequete {
    position: absolute;
    bottom: 0;
    right: 0;
}
.liste {
    display: flex;
}
</style>