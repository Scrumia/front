<template>
  <div class="block">
    <div v-show="showSearchBarLocal" class="top-page">
      <div class="block-filtre">
        <div class="saisi-filtre">
          <input v-model="nom" placeholder="nom" />
          <input v-model="specialite" placeholder="spécialité" />
          <input v-model="exp" placeholder="niveau d'expérience" />
        </div>
        <i class="fas fa-search logo"></i>
      </div>
      <button v-show="showAddButton" class="ajout">+</button>
    </div>
    <ul class="liste">
      <li v-for="aventurier in dataAventuriers" :key="aventurier.fullName">
        <div class="aventurier">
          <img
              class="image-aventurier"
              :src="'/assets/' + aventurier?.speciality.name + '.png'"
              alt="aventurier"
          />
          <div class="icon-niveau">
            <img
                class="image-niveau"
                :src="aventurier.status == 'dispo' ? '/assets/icon-niveau-bleu.png' :
                (aventurier.status == 'mission' ? '/assets/icon-niveau-vert.png'
                : '../assets/icon-niveau-rouge.png')"
                alt="icon niveau"
            />
            <span class="niveau">{{ aventurier?.experience_level }}</span>
          </div>
        </div>
        <div id="nom">
          {{ aventurier?.full_name }}
        </div>
      </li>
    </ul>
  </div>
  <div v-show="addAdventurerLocal">
    <div @click="toggleSearchBar">
      Rajouter un aventurier
    </div>
  </div>
</template>
<script>
export default {
  name: "RechercheAventurier",
  props: {
    showSearchBar: {
      type: Boolean,
      default: true,
    },
    addAdventurer: {
      type: Boolean,
      default: false,
    },
    byQuest: {
      type: Number,
      default: -1,
    },
    showAddButton: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      dataAventuriers: [],
      aventurierFilter: [],
      nom: null,
      speciality: null,
      exp: null,
      showSearchBarLocal: this.showSearchBar,
      addAdventurerLocal: this.addAdventurer,
    };
  },
  methods: {
    toggleSearchBar() {
      this.$emit('displaySearchBar');
    }
  },
  async beforeMount() {
    console.log(`beforeMount: ${this.byQuest}`);
    if(this.byQuest==-1) {
      this.dataAventuriers = [];
      this.aventurierFilter = [];
      const response = await this.axios.get(`https://api-capuche-dopale.herokuapp.com/adventurers`);
      if(response.status === 200){
        for(const game of response.data){
          this.dataAventuriers.push(game);
          this.aventurierFilter.push(game);
        }
      }
    } else {
      this.dataAventuriers = [];
      this.aventurierFilter = [];
      const response = await this.axios.get(`https://api-capuche-dopale.herokuapp.com/requests/${this.byQuest}`);
      console.log(response.data.adventurers);
      if(response.status === 200){
        for(const game of response.data.adventurers){
          this.dataAventuriers.push(game);
          this.aventurierFilter.push(game);
        }
      }
    }
  },
};
</script>
<style scoped>
.aventurier-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.top-page {
  display: flex;
  margin: 2em;
  width: 100%;
  width: max-content;
}
.block-filtre {
  background-color: white;
  border-radius: 12px;
  margin-right: 2em;
  border: none;
  box-shadow: 3px 5px 5px #b5b5b5;
  flex-grow: 3;
  height: min-content;
  display: flex;
}
input {
  background-color: white;
  border-radius: 12px;
  margin: 1em 1.5em 1em 1.5em;
  padding: 1em 2.5em 1em 2.5em;
  border: 1px solid #b5b5b5;
  box-shadow: 3px 5px 5px #b5b5b5;
  flex-grow: 1;
}
.ajout {
  background-color: #374869;
  color: white;
  height: 1.5em;
  width: 1.5em;
  font-size: 3em;
  border-radius: 12px;
  padding: 0.1em 0.4em 0.1em 0.4em;
  border: 1px solid #2a3a51;
  box-shadow: 3px 5px 5px #2a3a51;
}
.logo {
  font-size: 26px;
  margin-top: 1em;
  flex-grow: 1;
}
.saisi-filtre {
  flex-grow: 3;
  margin-left: 1em;
}
li {
  list-style: none;
  height: 10em;
  width: 7.5em;
  margin: 1.5em;
}
.aventurier-page {
  background-color: e3eeff;
  border-radius: 30px;
  border: none;
  display: flex;
  z-index: 0;
}
.aventurier {
  display: flex;
  background-color: blue;
  border-radius: 15px 15px 0 0;
  height: 150px;
  width: 120px;
}
.image-aventurier {
  background-size: 1em;
  text-align: center;
  background-repeat: no-repeat;
  z-index: 1;
}
.icon-niveau {
  z-index: 2;
}
#nom {
  background-color: #374869;
  color: white;
  text-align: center;
  height: 25%;
  width: 100%;
  align-self: flex-end;
  border-radius: 0px 0px 12px 12px;
  position: initial;
}
.liste {
  display: flex;
  flex-wrap: wrap;
}
.icon-niveau {
  position: relative;
  right: -0.5em;
  top: -1.5em;
  height: 3em;
  width: 7em;
  background-repeat: no-repeat;
  z-index: 2;
}
.niveau {
  z-index: 3;
  color: white;
  position: absolute;
  text-align: start;
  top: 1em;
  left: 1.2em;
}
.image-niveau {
  height: 3em;
  width: 3em;
}
.block {
  display: flex;
  flex-direction: column;
}
</style>