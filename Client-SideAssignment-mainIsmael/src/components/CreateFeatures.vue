<template>
    <form @submit.prevent = 'submitData'>
        <div :class ="!validName ? 'invalid': '' ">
            <label>Driver Name</label><br>
            <input type="text" v-model.trim ="enteredName" @blur="nameIsValid">
            <br><br>
        </div>
        <div :class ="!validCategory ? 'invalid': '' ">
            <label>Team Category: </label>
            <select id="team-category" name="team-category" v-model="enteredCategory" @blur="categoryIsValid">
                <option value="">Select a Category</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Mclaren">Mclaren</option>
                <option value="Mercedes">Mercedes</option>
                <option value="RedBull">RedBull</option>
            </select>
        </div>
            <br><br>
        <div :class="!validTeam ? 'invalid': '' ">
            <label>Main Team description</label><br>
            <textarea type="text" v-model.trim="enteredTeam" rows="4" cols="71" @blur="TeamIsValid"></textarea>
            <br><br>
        </div>
        <div>
            <button>Create Team</button>
        </div>
        <div>
           <p :class = "!validName? 'invalid': ''">{{ !validName ? errorMsgText : ''}}</p>
           <p :class = "!validCategory? 'invalid': ''">{{ !validCategory ? errorMsgText : ''}}</p>
           <p :class = "!validTeam? 'invalid': ''">{{ !validTeam ? errorMsgText : ''}}</p>
        </div>
    </form>
</template>

<script>
export default {
  emits: ['new-team'],
  data() {
      return {
          enteredName: '',
          enteredCategory: '',
          enteredTeam: '',
          validName: true,
          validCategory: true,
          validTeam: true,
          errorMsgText: ''
      }
  },
  methods: {
      submitData() {
          if (this.nameIsValid() && this.categoryIsValid() && this.TeamIsValid()) {
              console.log('Data is valid!');
            
            let newTeam = {
                id: new Date().getTime(),
                name:this.enteredName,
                categoryId: this.getCategoryId(this.enteredCategory),
                team: this.enteredTeam.split('\n'),
                loaded: false
            };
            console.log(newTeam);

            this.$emit('new-team', newTeam);
          }
      },
    getCategoryId(description) {
        var catId;
        console.log("Description "  +description);
        for (var rec in this.$store.state.category) {
          console.log("CatDesc " +this.$store.state.category[rec].description)
            if (this.$store.state.category[rec].description === description) {
                catId = this.$store.state.category[rec].id
                 console.log(catId);
              }
            }
            return catId;
    },

      nameIsValid() { //if user enetred a name
        if (this.enteredName == '' || this.enteredName == null) {
            this.validName = false;
            this.errorMsgText = "This field cannot be left empty, enter a valid name";
            return false;
        }
        else this.validName = true;
        return true;
      },

      categoryIsValid() { //user selected a category
        if (this.enteredCategory == '' || this.enteredCategory == null) {
            this.validCategory = true;
            this.errorMsgText = "This field cannot be left empty,eneter a valid category";
            return false;
        }
        else this.validCategory = true;
        return true;
      },

      TeamIsValid() { //user enetred some ingriendents
      if (this.enteredTeam == '' || this.enteredTeam == null) {
            this.validTeam = false;
            this.errorMsgText = "This field cannot be left empty";
            return false;
      }
      else this.validTeam = true;
      return true;
    }
  },
}
</script>



<style>

div {
    margin: 1rem;
}
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}
label {
  font-weight: bold;
}
input {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
/*styling for invalid controls */
.invalid input {
  border-color: red;
}

.invalid label, p.invalid  {
  color:red !important;
}

</style>



