import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js';
import CreateFeatures from './components/CreateFeatures.vue';
import FilterFeatures from './components/FilterFeatures.vue';
import UserAuth from './components/UserAuth.vue';
import ViewFeatures from './components/ViewFeatures.vue';
import Navigation from './components/Navigation.vue';
import FutureOfF1 from './components/FutureOfF1.vue';
import HistoryofF1 from './components/HistoryofF1.vue';
import { createRouter, createWebHistory } from 'vue-router';

//Create the vue instance
const router = createRouter({
    history : createWebHistory(),
    routes: [
        { path: '/futureOff1', component:FutureOfF1},
        { path: '/historyOff1', component:HistoryofF1}
    ]
});


const app = createApp(App);

app.use(store); //Add VUEX state in the app
app.component('create-features', CreateFeatures);
app.component('view-features', ViewFeatures);
app.component('filter-features', FilterFeatures);
app.component('user-auth', UserAuth);
app.component('navigation', Navigation);
app.component('futureOfF1', FutureOfF1);
app.component('historyofF1', HistoryofF1);


app.use(router);
app.mount('#app')

