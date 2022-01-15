<template>
 <router-view></router-view>
  <navigation></navigation>
  <user-auth></user-auth>
    <create-features @new-team="addNewTeam"></create-features>
    <filter-features @filtered-category="findTeam"></filter-features>
    <ul class= 'cards'>
      <view-features @delete-team="deleteTheTeam"
        v-for = 'team in formattedTeam'
         :key = team.Id
         :accessed = team.id
         :team-name = team.name
         :team-category = team.category
         :team-component = team.team
         :icon = team.icon>
     </view-features>
    </ul>
     <button @click="loadTheTeam">Load Team</button>
    <p> {{ getTeamStatus ? "Data has been saved" : ""}} </p>
    <p> {{ teamDeleted ? "Team has been deleted" : ""}} </p>
    <p> {{ authorized ? "": "You are not authorized!"}} </p>
</template>

<script>
export default {
  data() {
    return {
      savedTeam: false,
      authorized: true,
      categoryLoaded: false,
      teamDeleted: false,
      formattedTeam: []
    }
  },
  computed: {
    getTeamStatus() {
      return this.$store.getters['getTeamState'];
    },
    changeTeamStatus() {
      return this.$store.getters['changeTeamState'];
    },

  },

  methods: {
    deleteTheTeam(teamId) {
      this.$store.commit("deleteTeam", teamId);
      this.teamDeleted = true;
      this.timeout(1000).then(() => {
        this.loadMyTeamData(this.$store.state.teams);

        this.timeout(1000).then(() => {
          this.teamDeleted = false;
        })
      })
    },
    findTeam(teamDescription) {
      if (!this.categoryLoaded) {
        this.$store.commit("loadfromDBCategory");
        console.log(this.$store.state.category);
        this.categoryLoaded = true;
      }
      let storedCategories = this.$store.state.category;
      let category = storedCategories.find(cat => cat.description === teamDescription);

      this.$store.commit("filterCategory", category.id);
      this.timeout(1000).then(() =>
      {
        this.loadMyTeamData(this.$store.state.teams);
      });
    },

    addNewTeam(newTeam) {
    if (this.$store.getters['getUserId']) {
      this.authorized = true;
      console.log(this.$store.state.category);
      //calling the addTeam mutation and passing the team object
      this.$store.commit("addTeam", newTeam);
      this.$store.commit("addToDBCategory");
    }
    else {
      this.authorized = false;
      console.log("Not Authorized");
      }
    },

    loadTheTeam() {
      if(this.getTeamStatus)
      console.log(this.changeTeamStatus);

      if(!this.categoryLoaded) {
        this.$store.commit("loadfromDBCategory");
        console.log(this.$store.state.category);
        this.categoryLoaded = true;
      }

      fetch('https://client-assignment-db-default-rtdb.europe-west1.firebasedatabase.app/teams.json')
      .then((response) => {
        if (response.ok)
          return response.json();
      }).then((teamData) => {
          console.log(JSON.stringify(teamData));
          this.loadMyTeamData(teamData);
      });
    },

    loadMyTeamData(teamData) {
      const myFormattedTeam = [];
      for (let row in teamData) {
        if (teamData[row] != undefined) {
          myFormattedTeam.push({
            id: row,
            name: teamData[row].name,
            category: this.getCategoryDesc(teamData[row].categoryId),
            team : teamData[row].team,
            loaded: teamData[row].loaded,
            icon: this.getIcon(teamData[row].categoryId)
          });
        }
      }
      this.formattedTeam = myFormattedTeam;
      console.log("NEWW  DESCRIPTION");
      console.log(this.formattedTeam.category)
    },

    getCategoryDesc(categoryId) {
      var catDesc;
      for (var rec in this.$store.state.category) {
        if (this.$store.state.category[rec].id == categoryId) {
          console.log("state:" + this.$store.state.category[rec].id);
          console.log("mine:" + categoryId);
          catDesc = this.$store.state.category[rec].description;
        }
      }
      return catDesc;
    },

    getIcon(categoryId) {
      var catIcon;
      for (var rec in this.$store.state.category) {
        if (this.$store.state.category[rec].id == categoryId) {
          catIcon = this.$store.state.category[rec].icon; 
        }
      }
      console.log("Icon" + catIcon)
      return catIcon;
    },

    timeout(wait) {
      return new Promise((resolve) => {
        setTimeout(resolve, wait);
      });
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
  background-color: #292929;
  background-image: url("https://simracingsetup.com/wp-content/uploads/2020/02/F1-2020-All-Team-Desktop-Wallpaper.jpg");
}
ul {
    list-style: none;
}
.cards {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-evenly;
}
.card {
    flex: 0 1 12%;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    background-color: #ffffff;
}
header{
    margin-bottom:8px;
}
#name {
    margin-right:5px;
    font-size: 1.5rem;
    color:#8c8c8c;
}
.category {
    padding: 0.2em 0.6em;
    border-radius: 30px;
    color:  #ffffff;
    background: #ffb366;
}
.box {
    display: flex;
    align-items: center;
    justify-content: center; 
}
img {
    width:100%;
    height:100%;
}

button {
  margin-left:10px;
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}
P {
  color: white;
}
</style>