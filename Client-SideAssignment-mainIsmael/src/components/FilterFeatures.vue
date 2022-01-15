<template>
    <form @submit.prevent="submitData">
        <div :class="!validCategory ? 'invalid': '' ">
            <label>Driver Category</label>
            <select id="driver-category" name="driver-category" v-model="enteredCategory" @blur="CategoryIsValid">
                <option value="" >Select a team category</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Mclaren">Mclaren</option>
                <option value="Mercedes">Mercedes</option>
                <option value="RedBull">RedBull</option>
            </select>
        </div>
        <div>
            <button class="sameLine">Find</button>
        </div>
        <div>
            <p :class = "!validCategory ? 'invalid' : '' "> {{ !validCategory ? errorMsgText: '' }}</p>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            validCategory: true,
            enteredCategory: ''
        }
    },
    methods: {
        submitData() {
            if (this.categoryIsValid()) {
                this.$emit('filtered-category', this.enteredCategory);
            }
        },
        categoryIsValid() {
             if (this.enteredCategory === '' || this.enteredCategory === null) {
                this.validCategory = false;
                this.errorMsgText = "This field cannnot be left empty! Please enter a valid category.";
                return false;
            }
            else 
                this.validCategory = true;
            
            return this.validCategory;
        }
    }
}
</script>

<style scoped>
    .sameLine {
        display: inline;
        margin-right:10px;
        margin-top: -50px;
        float: right;
    }

</style>