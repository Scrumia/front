<template>
    <div class="content">
        <div class="cards">
            <div v-for="quest in dataRequetes"  :key="quest.title" class="card">
                <a href="" class="card-click">
                    <div class="cont">
                    </div>
                    <div class="details">
                        <div class="title">{{ quest.title }}</div>
                        <!-- <div class="desc">{{ quest.desc}}</div> -->
                        <div class="date">{{ quest.date }}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { Quest } from "@/model/quest.model";

export default {
    name: "Requetes",
    data() {
        return {
            dataRequetes: [
                new Quest("Titre requête n°1", "01/01/01"),
                new Quest("Titre requête n°2", "02/02/02"),
                new Quest("Titre requête n°3", "03/03/03"),
            ],
        };
    },
};
</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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

</style>