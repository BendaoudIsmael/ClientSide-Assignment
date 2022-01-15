<template>
    <li class = 'card'>
        <header>
            <span id ='name'>{{ teamName }} </span>
            <sup class='category'> {{ teamCategory }} </sup>
        </header>

        <div class= "box">
            <img :src= 'icon'/>
        </div>
        <ul>
            <li v-for = "driver in teamComponent" :key="driver">
                <input type = "checkbox" :value ="driver">
                <label> {{ driver }} </label>
            </li>
            <button id="remove" @click="removeMe" :value="accessed">Remove</button>
        </ul>
    </li>
</template>

<script>
export default {
    props: [
        'accessed',
        'teamName',
        'teamCategory',
        'icon',
        'teamComponent',
    ],
    data() {
        return {

        }
    },

    methods: {
        removeMe(event) {
            console.log('deleted');
            console.log(event.target.value);
            if (this.$store.getters['getUserId'])
                this.$emit("delete-team", event.target.value);
            else
                console.log('Unauthorized');
        }
    }
}
</script>

<style scoped>
div {
    margin: 1rem;
}
header{
    margin-bottom:8px;
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
  display: inline;
  width: 15%;
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
#remove {
  margin:2px auto;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
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
