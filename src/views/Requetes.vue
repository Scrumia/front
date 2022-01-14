<template>
  <div>
    <ul class="liste">
      <li v-for="quest in dataRequetes" :key="quest.name" @click="openModal(quest)">
        <div class="requete">
          <!--<img class="image-quete" src="/assets/quete-bg.png" alt="image d'aventure">-->
          <div class="titreRequete">
            {{ quest.name }}
          </div>
          <div class="dateRequete">
            {{ quest.created_at }}
          </div>
        </div>
      </li>
    </ul>
  </div>

  <div v-if="isModalVisible" class="modal">
    <div @click="closeModal">X</div>
    <div class="modalQuestTitle"> {{modalTitle}} </div>  
    {{ modalDesc }}

    <div>
      Durée: {{ duration }} jours
    </div>
    <div>
      Date d'expiration: {{ expiration }}
    </div>

    <RechercheAventurier :showSearchBar="false" :addAdventurer="true" @displaySearchBar="isSearchVisible = true;">
    </RechercheAventurier>

    <RechercheAventurier v-if="isSearchVisible">
    </RechercheAventurier>

  </div>
</template>

<script>
import RechercheAventurier from "../views/Aventurier.vue";
export default {
  name: "Requetes",
  components: { RechercheAventurier },
  component: { RechercheAventurier },
  methods: {
    openModal(quest) {
      this.isModalVisible = true;
      console.log(quest);
      this.modalDesc = quest.description;
      this.modalTitle = quest.name;
      this.duration = quest.duration;
      this.expiration = `${quest.expiration_date.substring(8, 10)}/${quest.expiration_date.substring(5, 7)}/${quest.expiration_date.substring(0, 4)}`;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  data() {
    return {
      dataRequetes: [],
      modalDesc: "test",
      modalTitle: "",
      duration: "",
      expiration: "",
      isModalVisible: false,
      isSearchVisible: false,
    };
  },
  created: async function() {
    const response = await this.axios.get(`https://api-capuche-dopale.herokuapp.com/requests`);
    if(response.status === 200){
      for(let game of response.data){
        console.log(game.name);
        game.created_at = `${game.created_at.substring(8, 10)}/${game.created_at.substring(5, 7)}/${game.created_at.substring(0, 4)}`;
        this.dataRequetes.push(game);
      }
    }
  }
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
