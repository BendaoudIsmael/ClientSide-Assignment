<template>
    <form @submit.prevent="submitForm">
        <div>
            <label>E-mail</label>
             <input type="email" v-model.trim="email" />   
        </div>
        <div>
            <label>Password</label>
            <input type="password" v-model.trim="password" />
        </div>
        <button>{{ submitButtonCaption }}</button>
         <button mode="flat" @click="switchAuthMode">{{ switchButtonCaption }}</button>
        <div :class="!formIsValid ? 'invalid': '' ">
            <p v-if="!formIsValid">Authentication details are not correct</p>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return{
            email: '',
            password: '',
            formIsValid: true,
            mode: "login"
        }
    },
    computed: {
        submitButtonCaption() {
            if (this.mode == "login")
                return "Login";
            else
                return "Sign up";
        },
        switchButtonCaption() {
            if (this.mode == "login")
                return "Sign up instead";
            else
                return "Login instead";
        }
    },
    methods: {
        submitForm() {
            this.formIsValid = true;
            if (this.email == '' || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false;
                return;
            }
            if (this.mode == "signUp")
                this.$store.commit("signUp", {email: this.email, password: this.password});

            if(this.mode == "login")
                this.$store.commit("login", {email: this.email, password: this.password});
        },
        switchAuthMode() {
            this.email = '';
            this.password = '';
            
            if (this.mode == "login") {
                this.mode = "signUp";
            }
            else {
                this.mode = "login";
            }
        }
        
    }

}
</script>

<style scoped>
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
    .invalid p  {
        color:red !important;
    }
</style>