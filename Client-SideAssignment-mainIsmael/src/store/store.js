import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userId: null,
            userToken: null,
            savedTeams: false, //to check if teams have been saved
            teams: [],
            category: [
                {
                    id: 1,
                    description: 'Ferrari',
                    icon: './images/Ferrari.jpg'
                },
                {
                    id: 2,
                    description: 'Mclaren',
                    icon: './images/mclaren.jpg'
                },
                {
                    id: 3,
                    description: 'Mercedes',
                    icon: './images/mercedes.jpg'
                },
                {
                    id: 4,
                    description: 'RedBull',
                    icon: './images/redbull.jpg'
                }
            ]
        }
    },
    mutations:
    {
        signUp(state, auth) {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEZIe0LQsTOjHNdUv7gFaOgIKJY1UneDY',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: auth.email,
                    password: auth.password,
                    returnSecureToken: true
                })
            }).then((response) => {
                if (!response.ok) {
                    console.log("Failed to authenticate");
                }
                return response.json();
            }).then((authData) => {
                console.log(authData);
                state.userId = authData.localId; //for the user id firebase
                state.userToken = authData.idToken; //for user token firebase
                console.log("UserSignedUp");
            })
        },
        login(state, auth) {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEZIe0LQsTOjHNdUv7gFaOgIKJY1UneDY',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: auth.email,
                    password: auth.password,
                    returnSecureToken: true
                })
            }).then((response) => {
                if (!response.ok) {
                    console.log("Failed to authenticate");
                }
                return response.json();
            }).then((authData) => {
                console.log(authData);
                state.userId = authData.localId; //for the user id firebase
                state.userToken = authData.idToken; //for user token firebase
                console.log("UserLoggedIn");
            })
        },


        addTeam(state, team) {
            const newTeam = {
                id: team.id,
                name: team.name,
                categoryId: team.categoryId,
                team: team.team,
                loaded: false
            };
            state.teams.push(newTeam); //every new team will be created by the user to the state
            console.log(state.userToken);
            console.log(newTeam);
            let teamId = newTeam.id;
            fetch(`https://client-assignment-db-default-rtdb.europe-west1.firebasedatabase.app/teams/${teamId}.json?auth=` +state.userToken, {
                method: 'PUT',
                body:JSON.stringify({name: newTeam.name, team: newTeam.team,
                    loaded: newTeam.loaded, categoryId: newTeam.categoryId})
            }).then((response) => {
                if (response.ok) {
                    state.savedTeams = true;
                }
            });
        },
        addToDBCategory(state) {
            //once added the database category
            for (let cat in state.category) {
                let rec = state.category[cat]; //rec contains the current selected category
                console.log("CAT.ID: " + rec.id);
                fetch(`https://client-assignment-db-default-rtdb.europe-west1.firebasedatabase.app/category/${rec.id}.json?auth=`+state.userToken, 
                {
                    method: 'PUT',
                    body: JSON.stringify({description: rec.description, icon: rec.icon })
                });
            }
        },

        loadfromDBCategory(state) {
            fetch('https://client-assignment-db-default-rtdb.europe-west1.firebasedatabase.app/category.json')
                .then((response) => {
                    if (response.ok)
                     return response.json();
                }).then((categoryData) => {
                    console.log(JSON.stringify(categoryData));
                    const myFormattedCategory = [];
                    for (let row in categoryData) {
                        if (categoryData[row] != undefined) {
                            myFormattedCategory.push({
                                id: row,
                                description: categoryData[row].description,
                                icon: categoryData[row].icon
                            });
                        console.log("ID = " + row);
                        console.log("Descr = " + categoryData[row].description);
                        }
                    }
                    state.category = myFormattedCategory;
                    console.log(state.category);
                })
        },

        filterCategory(state, categoryId) {
            fetch('https://client-assignment-db-default-rtdb.europe-west1.firebasedatabase.app/teams.json')
            .then((response) => {
                if (response.ok)
                    return response.json();
            }).then((teamData) => {
                const myTeam = [];
                for (let row in teamData) { 
                    if (teamData[row] != undefined) {
                    myTeam.push({
                        id: row,
                        name: teamData[row].name,
                        categoryId: teamData[row].categoryId,
                        drivers: teamData[row].drivers,
                        loaded: teamData[row].loaded,
                        icon: teamData[row].icon
                    });
                }
            }
            let FilterFeatures = myTeam.filter(recps => recps.categoryId === categoryId);
            state.teams = FilterFeatures;
            });
        },

        deleteTeam(state, teamId) {
            fetch(`https://client-assignment-db-default-rtdb.europe-west1.firebasedatabase.app/teams/${teamId}.json?auth=`+state.userToken, {
                method: 'DELETE',
            }).then(response => response.json())
            .then(state.teams.filter(rec => rec.id != teamId));
        },
    },
    getters: {
        getTeamState(state) {
            return state.savedTeams;
        },
        changeTeamState(state) {
            state.savedTeams = !state.savedTeams;
            return state.savedTeams;
        },
        getUserId(state) {
            return state.userId;
        }
    }
});

export default store;