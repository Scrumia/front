<template>
  <div class="block">
    <div v-show="showSearchBarLocal" class="top-page">
      <div class="block-filtre">
        <div class="saisi-filtre">
          <input class="input-filtre" v-on:change="search()" type="text" v-model="model.name" placeholder="nom" />
          <input class="input-filtre" v-on:change="search()" type="text" v-model="model.speciality" placeholder="spécialité" />
          <input class="input-filtre" v-on:change="search()" type="number" v-model="model.exp" placeholder="niveau d'expérience" />
        </div>
      </div>
      <ima class="ajout" v-if="showAddButton" v-on:click="this.isModalVisible = true">+</ima>
    </div>
    <div class="legende">
      <img
          class="image-niveau icon"
          :src="'/assets/icon-niveau-bleu.png'"
          alt="aventurier"
      />
      <label>Au repos</label>
      <img
          class="image-niveau icon"
          :src="'/assets/icon-niveau-vert.png'"
          alt="aventurier"
      />
      <label>Disponible</label>
      <img
          class="image-niveau icon"
          :src="'/assets/icon-niveau-rouge.png'"
          alt="aventurier"
      />
      <label>En mission</label>
    </div>
    <div v-if="isModalVisible" class="modal">

      <input class="form" type="text" v-model="createModel.name" placeholder="nom" />
      <input class="form" type="number" v-model="createModel.exp" placeholder="niveau d'expérience" />
      <select class="form" v-on:change="changeSpeciality($event)">
        <option v-for="speciality in specialities" :key="speciality.name" v-bind:value="speciality.id">{{speciality.name}}</option>
      </select>

      <div class="group-button-modal">
        <button class="button-modal cancel" v-on:click="cancel()">Annuler</button>
        <button class="button-modal validate" v-on:click="validate()">Valider</button>
      </div>

    </div>
    <ul class="liste">
      <li v-for="aventurier in aventurierFilter" :key="aventurier.fullName">
        <div class="aventurier">
          <div class="icon-delete">
            <img
              class="image-delete"
              alt="delete"
              src="/assets/icon_delete.png"
              @click="deleteAdventurer(aventurier.id)"
            />
          </div>
          <img
              class="image-aventurier"
              :src="'/assets/' + aventurier?.speciality.name + '.png'"
              alt="aventurier"
              @click="addToQuest(aventurier.id)"
          />
          <div class="icon-niveau">
            <img
                class="image-niveau"
                :src="aventurier.status == 'rest' ? '/assets/icon-niveau-bleu.png' :
                (aventurier.status == 'available' ? '/assets/icon-niveau-vert.png'
                : '../assets/icon-niveau-rouge.png')"
                alt="icon niveau"
            />
            <span class="niveau">{{ aventurier?.experience_level }}</span>
          </div>
        </div>
        <div class="info-aventurier">
          <div class="speciality">
            {{aventurier.speciality?.name}}
          </div>
          <div id="nom">
            {{ aventurier?.full_name }}
          </div>
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
    },
    canCrudToQuest: {
      type: Number,
      default: -1,
    },
    canDelete: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      dataAventuriers: [],
      aventurierFilter: [],
      model : {
        name: null,
        speciality: null,
        exp: null,
      },
      createModel : {
        name: null,
        speciality_id: 10,
        exp: null,
      },
      showSearchBarLocal: this.showSearchBar,
      addAdventurerLocal: this.addAdventurer,
      isModalVisible: false,
      specialities: [],
    };
  },
  methods: {
    toggleSearchBar() {
      this.$emit('displaySearchBar');
    },
    async addToQuest(adventurerId) {
      console.log(`addToQuest: ${this.canCrudToQuest}, ${adventurerId}`);
      const postURL = `https://api-capuche-dopale.herokuapp.com/requests/${this.canCrudToQuest}/adventurers`;
      const postResponse = await this.axios.post(postURL, {
        adventurer_id: adventurerId
      });
      if(postResponse.status === 200) {
        console.log("le POST a bien fonctionné! :)");
        this.$emit('closeSearch');
        this.callRefresh();
      } else {
        console.log(`OOPS! POST response status = ${postResponse.status}`);
      }
    },
    async deleteAdventurer(adventurerId) {
      if(!this.showAddButton) return;
      if (!this.canDelete){
        //ici pour supprimer un aventurier
        console.log(`deleteAdventurer = ${adventurerId}`);
        const deleteURL = `https://api-capuche-dopale.herokuapp.com/adventurers/${adventurerId}`;
        const deleteResponse = await this.axios.delete(deleteURL);
        if(deleteResponse.status === 200) {
          console.log("DELETE ok! :)");
          this.callRefresh();
        }
      } else {
        console.log(`deleteFromQuest: ${this.canCrudToQuest}, ${adventurerId}`);
        const deleteURL = `https://api-capuche-dopale.herokuapp.com/requests/${this.canCrudToQuest}/adventurers/${adventurerId}`;
        const deleteResponse = await this.axios.delete(deleteURL);
        if(deleteResponse.status === 200) {
          console.log("DELETE ok! :)");
          this.callRefresh();
        }
      }
    },
    callRefresh() {
      this.$emit('callRefresh');
      console.log("callRefresh");
    },
    search() {
      this.aventurierFilter = this.dataAventuriers;
      console.log(this.model.name);
      if (this.model.name !== null && this.model.name != '')
        this.aventurierFilter = this.aventurierFilter.filter(aventurier => aventurier.full_name.toLowerCase().includes(this.model.name.toLowerCase()));
      if (this.model.speciality !== null && this.model.speciality != '')
        this.aventurierFilter = this.aventurierFilter.filter(aventurier => aventurier.speciality.name.toLowerCase().includes(this.model.speciality.toLowerCase()));
      if (this.model.exp !== null && this.model.exp != '') {
        this.aventurierFilter = this.aventurierFilter.filter(aventurier => aventurier.experience_level == this.model.exp);
      }
    },
    cancel() {
      this.isModalVisible = false;
      this.createModel.name = null;
      this.createModel.exp = null;
    },
    async validate() {
      if(this.createModel.name != null && this.createModel.exp != null) {
        const body = {
          fullName: this.createModel.name,
          speciality_id: this.createModel.speciality_id,
          experience_level: this.createModel.exp
        };
        const response = await this.axios.post(`https://api-capuche-dopale.herokuapp.com/adventurers`, body)
            .catch((err) => {
          console.log(err);
        });
        if(response.status === 201) {
          this.isModalVisible = false;
        }
      }
    },
    changeSpeciality(event) {
      this.createModel.speciality_id = event.target.value;
    },
    ready:function(){
      this.search();
    },
  },
  async beforeMount() {
    if(this.byQuest==-1) {
      this.dataAventuriers = [];
      this.aventurierFilter = [];
      const response = await this.axios.get(`https://api-capuche-dopale.herokuapp.com/adventurers`);
      if(response.status === 200){
        for(const game of response.data){
          this.dataAventuriers.push(game);
          this.aventurierFilter.push(game);
        }
        const reponseSpecialities = await this.axios.get(`https://api-capuche-dopale.herokuapp.com/specialities`);
        if(response.status === 200) {
          this.specialities = reponseSpecialities.data;
        }
      }
    } else {
      this.dataAventuriers = [];
      this.aventurierFilter = [];
      const response = await this.axios.get(`https://api-capuche-dopale.herokuapp.com/requests/${this.byQuest}`);
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
.input-filtre {
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
.aventurier {
  display: flex;
  background-color: #fee4cb;
  border-radius: 15px 15px 0 0;
  height: 150px;
  width: 120px;
}
.speciality {
  background-color: #fee4cb;
  text-align: center;
}
.image-aventurier {
  background-size: 1em;
  text-align: center;
  background-repeat: no-repeat;
  z-index: 1;
  position: relative;
  left: -1.5em;
}
#nom {
  background-color: #374869;
  color: white;
  text-align: center;
  height: 2.5em;
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
  right: 0.5em;
  top: -1.2em;
  left: -2.7em;
  height: 3em;
  width: 3em;
  background-repeat: no-repeat;
  z-index: 2;
}
.icon-delete {
  position: relative;
  left: -0.7em;
  top: -0.7em;
  height: 2em;
  width: 2em;
  background-repeat: no-repeat;
  z-index: 2;
}
.niveau {
  z-index: 3;
  color: white;
  position: absolute;
  text-align: start;
  top: 1em;
  left: 0.9em;
}
.image-niveau {
  height: 3em;
  width: 3em;
}
.image-delete {
  height: 2em;
  width: 2em;
}
.block {
  display: flex;
  flex-direction: column;
}
label {
  position: relative;
  margin: 1em;
  top: -1.1em;
}
.icon {
  margin-left: 2em;
}
.info-aventurier {
  position: relative;
  top: -1.2em;
}
li {
  margin-bottom: 3em;
}
.modal {
  background-color: white;
  border-radius: 12px;
  border-color: black;
  position: fixed;
  top: 20%;
  bottom: 20%;
  left: 20%;
  right: 20%;
  display: flex;
  flex-direction: column;
  z-index: 4;
}
.form {
  margin : 0.5em;
  width: 20em;
  height: 3em;
  border-radius: 8px;
  border: 1px solid #b5b5b5;
  box-shadow: 3px 5px 5px #b5b5b5;
}
.cancel {
  background-color: #a70e0e;
}
.validate {
  background-color: #0d730d;
}
.button-modal {
  color: white;
  padding: 1em 2em 1em 2em;
  border: none;
  border-radius: 12px;
  margin: 2em;
}
.group-button-modal {
  display: flex;
  flex-direction: row;
}
</style>
