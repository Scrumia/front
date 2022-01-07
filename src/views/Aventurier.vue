<template>
  <div class="top-page">
    <div class="block-filtre">
      <div class="saisi-filtre">
        <input v-model="nom" placeholder="nom" />
        <input v-model="specialite" placeholder="spécialité" />
        <input v-model="exp" placeholder="niveau d'expérience" />
      </div>
      <i class="fas fa-search logo"></i>
    </div>
    <button class="ajout">+</button>
  </div>
  <div>
    <ul class="liste">
      <li v-for="aventurier in dataAventuriers" :key="aventurier.fullName">
        <div class="aventurier">
          <img
            class="image-aventurier"
            :src="'/assets/' + aventurier.fullName + '.png'"
            alt="aventurier"
          />
          <div class="icon-niveau">
            <img
              class="image-niveau"
              :src="aventurier.status == 'dispo' ? '/assets/icon-niveau-bleu.png' : 
                (aventurier.status == 'mission' ? 'assets/icon-niveau-vert.png' 
                : 'assets/icon-niveau-rouge.png')"
              alt="icon niveau"
            />
            <span class="niveau">{{ aventurier.experienceLevel }}</span>
          </div>
        </div>
        <div id="nom">
          {{ aventurier.fullName }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Adventurer } from "@/model/adventurer.model";
import { Speciality } from "@/model/speciality.model";
export default {
  name: "RechercheAventurier",
  data() {
    return {
      dataAventuriers: [
        new Adventurer("archer", 6, "dispo", new Speciality("speciality")),
        new Adventurer("barbare", 5, "mission", new Speciality("speciality")),
        new Adventurer("archer", 6, "dispo", new Speciality("speciality")),
        new Adventurer("archer", 3, "repos", new Speciality("speciality")),
        new Adventurer("barbare", 7, "mission", new Speciality("speciality")),
      ],
    };
  },
};
</script>

<style scoped>
.top-page {
  display: flex;
  margin: 2em;
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
.aventurier {
  background-color: white;
  border-radius: 12px 12px 0px 0px;
  border: none;
  box-shadow: 3px 5px 5px #b5b5b5;
  height: 80%;
  width: 100%;
  display: flex;
  z-index: 0;
}
.image-aventurier {
  background-size: 7em;
  text-align: center;
  background-repeat: no-repeat;
  z-index: 1;
}
#nom {
  background-color: #374869;
  color: white;
  text-align: center;
  height: 20%;
  width: 100%;
  align-self: flex-end;
  border-radius: 0px 0px 12px 12px;
  position: initial;
}
.liste {
  display: flex;
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
</style>
