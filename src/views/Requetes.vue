<template>
  <div>
    <ul class="liste">
      <li v-for="quest in dataRequetes" :key="quest.title" @click="openModal(quest)">
        <div class="requete">
          <!--<img class="image-quete" src="/assets/quete-bg.png" alt="image d'aventure">-->
          <div class="titreRequete">
            {{ quest.title }}
          </div>
          <div class="dateRequete">
            {{ quest.date }}
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div v-if="isModalVisible" class="modal">
    <div @click="closeModal">X</div>
    {{ modalDesc }}

    <RechercheAventurier :showSearchBar="false" :addAdventurer="true" @displaySearchBar="isSearchVisible = true;">
    </RechercheAventurier>

    <RechercheAventurier v-if="isSearchVisible">
    </RechercheAventurier>

  </div>
</template>

<script>
import RechercheAventurier from "../views/Aventurier.vue";
import { Quest } from "@/model/quest.model";
export default {
  name: "Requetes",
  components: { RechercheAventurier },
  component: { RechercheAventurier },
  methods: {
    openModal(quest) {
      this.isModalVisible = true;
      console.log(quest);
      this.modalDesc = quest.desc;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  data() {
    return {
      dataRequetes: [
        new Quest("Titre requête n°1", "01/01/01", "Desc1"),
        new Quest("Titre requête n°2", "02/02/02", "Desc2"),
        new Quest("Titre requête n°3", "03/03/03", "Desc3"),
      ],
      modalDesc: "test",
      isModalVisible: false,
      isSearchVisible: false,
    };
  },
};
</script>

<style scoped>
li {
  list-style: none;
  height: 250px;
  width: 185px;
  margin: 1.5em;
}
.requete {
  background-color: white;
  background-image: url("/assets/quete-bg.png");
  border-radius: 12px 12px 12px 12px;
  border: none;
  box-shadow: 3px 5px 5px #b5b5b5;
  height: 80%;
  width: 100%;
  display: flex;
  z-index: 0;
  position: relative;
  color: white;
}
.titreRequete {
  font-weight: bold;
  position: absolute;
  top: 2px;
  left: 5px;
}
.dateRequete {
  position: absolute;
  bottom: 2px;
  right: 5px;
}
.liste {
  display: flex;
}
</style>
