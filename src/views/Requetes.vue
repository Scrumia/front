<template>
  <div class="content">
    <div class="cards">
      <div v-for="quest in dataRequetes"  :key="quest.name" @click="openModal(quest)" class="card">
        <a class="card-click">
          <div class="cont">
          </div>
          <div class="details">
            <div class="title">{{ quest.name }}</div>
            <div class="date">{{ quest.created_at }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>

  <div v-if="isModalVisible" class="modal">
    <div class="icon-delete">
      <img 
        class="image-delete"
        alt="delete"
        src="/assets/icon_delete.png"
        @click="closeModal"
      />
    </div>
    <div v-if="questStatus === 'pending'">
      Cette quête est en attente !
    </div>
    <div v-else> 
      Cette quête n'est plus en attente, et l'équipe ne peut pas être altérée.
    </div>
    <div class="modalQuestTitle"> {{modalTitle}} </div>  
    {{ modalDesc }}

    <div>
      Durée: {{ duration }} jours
    </div>
    <div>
      Date d'expiration: {{ expiration }}
    </div>

    <RechercheAventurier 
      :showSearchBar="false" 
      :canDelete="true" 
      :addAdventurer="true" 
      @displaySearchBar="isSearchVisible = true;" 
      :byQuest="questId"
      :canCrudToQuest="questId"
    >
    </RechercheAventurier>

    <RechercheAventurier 
      :showAddButton="false" 
      v-if="isSearchVisible && questStatus === 'pending'" 
      :canCrudToQuest="questId" 
      @closeSearch="isSearchVisible = false;"
    >
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
      console.log("open");
      this.isModalVisible = true;
      console.log(quest);
      this.modalDesc = quest.description;
      this.modalTitle = quest.name;
      this.duration = quest.duration;
      this.questId = quest.id;
      this.questStatus = quest.status;
      this.expiration = `${quest.expiration_date.substring(8, 10)}/${quest.expiration_date.substring(5, 7)}/${quest.expiration_date.substring(0, 4)}`;
    },
    closeModal() {
      this.isModalVisible = false;
      this.isSearchVisible = false;
    },
    refreshModal() {
      this.isModalVisible = false;
      this.isModalVisible = true;
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

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.modal {
  background-color: white;
  border-radius: 12px 12px 12px 12px;
  border-color: black;
  position: fixed;
  top: 20%;
  bottom: 20%;
  left: 20%;
  right: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
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

body {
    background: #e3eeff;
}

.content {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: #fdfdfd;
    border-radius: 30px;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    height: 90%;
    
}

.card-click {
    width: 100%;
    height: 100%;
    text-decoration: none;
}

.card:hover {
    box-shadow: 6px 6px 30px -10px rgba(0,0,0,0.4);
    transition: 0.5s ease-in-out;
}

.card {
    background: #fee4cb;
    width: 220px;
    height: 280px;
    border-radius: 20px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cont {
    width: 100%;
    height: 60%;
    border-radius: 20px 20px 0 0;
    background: url(https://cdn.discordapp.com/attachments/368485601688944640/933567530201649192/quete-bg.png);
    background-size: cover;
}

.details {
    width: 100%;
    height: 40%;
    background: #fee4cb;
    border-radius: 20px;
    padding: 10px;
    color: rgb(136, 136, 136);
}

.image-delete {
  height: 3em;
  width: 3em;
}

</style>