"use strict";
import {
    fetchLogin,
    fetchLoginStatus,
    fetchLogout,
    fetchRecipes,
    fetchRecipeDetails,
    fetchNewRecipe,
    addNewRecipe } from './services';

const loginButton = document.querySelector('.login');
const loginPanel = document.querySelector('.login-panel');
const status = document.querySelector('.status');
const recipeList = document.querySelector('.recipe-list-panel');
const newRecipePanel = document.querySelector('.new-recipe-panel');
const recipeDetailPanel = document.querySelector('.recipe-details-panel');
const addRecipe = document.querySelector('.add-button');
const backHomepage = document.querySelector('.back-button');

const errorMessages = {
    'network-error': "There is a problem connecting to the network, please try again",
    'missing-user': "The user doesn't exist, please login first",
    'invalid-username': "Invalid username, please enter a name without whitespace & 'dog' (upper and lower case A-Z, numbers, and underscore is allowed)",
    'missing-content': "Please enter recipe details",
    'missing-recipe' : "The recipe doesn't exist, please try again"
};

const appState = {
    isHomePage: false,
    isLoggedIn: false,
    abilityToLogin: false,
    abilityToAdd: false,
    recipes:[],
    recipeDetails: {},
    error:'',
};

function renderHomePage() {
    if(appState.abilityToLogin) {
        loginButton.innerHTML = ``;
        recipeList.innerHTML = ``;
        addRecipe.innerHTML = ``;
        renderErrors(appState.error);
        return;
    }
    if (appState.isLoggedIn) {
        loginButton.innerHTML = `
            <button class="logout-button">Sign out</button>`;
    } else {
        loginButton.innerHTML = `
            <button class="login-button">Sign in</button>`;
    }

    if (appState.isHomePage) {
        recipeList.innerHTML = `
            <div class="recipes-list">
                <ul class="recipes"> </ul> 
            </div>
        `;
        renderRecipes(appState.recipes);
        addRecipe.innerHTML = `<button class="new-recipe-button">Add Your Recipe</button>`;
    } else {
        recipeList.innerHTML = ``;
        backHomepage.innerHTML = `<button class="back-home-button">Back to Home</button>`
    }
    renderErrors(appState.error);
}


function renderErrors(error) {
    status.innerText = errorMessages[error] || error;
}


function renderLogin (show) {
    if (show) {
        loginPanel.innerHTML = `
                <input class="username" type="text" placeholder="Please enter a user name" />
                <button class="to-login-button" type="button">Sign in</button>
        `;
        loginPanel.querySelector('.to-login-button').disabled = true;
    } else {
        loginPanel.innerHTML = ``;
    }
}

loginButton.addEventListener('click', (event) => {
    if(!event.target.classList.contains('login-button')) {
        return;
    }
    event.preventDefault();

    fetchLoginStatus()
        .then( () => {
            appState.abilityToLogin = false;
            renderHomePage(appState.abilityToLogin);
        })
        .catch( () => {
            appState.abilityToLogin = true;
            appState.recipeDetails = {};
            appState.abilityToAdd = false;
            appState.error = '';
            renderHomePage();
            renderLogin(appState.abilityToLogin);
            renderRecipeDetail(appState.recipeDetails);
            renderNewRecipePanel(appState.abilityToAdd);
        });
});



loginPanel.addEventListener('click', (event) => {
    if (!event.target.classList.contains('to-login-button')) {
        return;
    }
    event.preventDefault();

    const addUser = loginPanel.querySelector('.username');
    const username = addUser.value;
    addUser.value = '';

    fetchLogin(username)
        .then( (text) => {
            appState.isLoggedIn = true;
            appState.abilityToLogin = false;
            appState.isHomePage = true;
            appState.recipes = text;
            appState.error = '';
            renderHomePage();
            renderLogin(appState.abilityToLogin);
        })
        .catch( (err) => {
            appState.error = err.errorCode;
            renderHomePage();
            renderLogin(appState.abilityToLogin);
            renderErrors(appState.error);
        });
});


function renderRecipes(recipes) {
    const recipesInfo = recipeList.querySelector('.recipes');
    recipesInfo.innerHTML = recipes.map( recipe => {
        return `
            <li class="recipe-info">
                <span class="recipe-title" data-recipe-id="${recipe.recipeId}">${recipe.title}</span>
                <span class="recipe-author" data-recipe-id="${recipe.recipeId}">${recipe.author}</span>
            </li>
        `;
    }).join(' ');
}


loginPanel.addEventListener('keyup', (event) => {
    if (!event.target.classList.contains('username')) {
        return;
    }
    const text = event.target.value;
    loginPanel.querySelector('.to-login-button').disabled = !text;
});


loginButton.addEventListener('click', (event) => {
    if (!event.target.classList.contains('logout-button')) {
        return;
    }
    event.preventDefault();

    fetchLogout()
        .then( () => {
            appState.isHomePage = true;
            appState.isLoggedIn = false;
            appState.recipeDetails = {};
            appState.abilityToAdd = false;
            appState.error = '';
            renderHomePage();
            renderRecipeDetail(appState.recipeDetails);
            renderNewRecipePanel(appState.abilityToAdd);
        })
        .catch( (err) => {
            appState.error = err.errorCode;
            renderErrors();
        });
});



recipeList.addEventListener('click', (event) => {
    if (!event.target.classList.contains('recipe-title')) {
        return;
    }
    event.preventDefault();

    const recipeId = event.target.dataset.recipeId;
    event.preventDefault();
    fetchRecipeDetails(recipeId)
        .then((recipeDetails) => {
            appState.isHomePage = false;
            appState.recipeDetails = recipeDetails;
            appState.error = '';
            renderHomePage();
            renderRecipeDetail(appState.recipeDetails);
        })
        .catch( (err) => {
            appState.error = err.errorCode;
            renderHomePage(appState.isHomePage);
        });
});


function renderRecipeDetail(recipeDetails) {
    if(Object.keys(recipeDetails).length === 0) {
        recipeDetailPanel.innerHTML = ``;
    } else {
        recipeDetailPanel.innerHTML = `
            <h2 class="title"> Recipt Details </h2>
            <div class="show-recipe-title">
                <label>Title:</label>
                <span>${recipeDetails.title}</span>
            </div>
            <div class="show-recipe-author">
                <label>Author:</label>
                <span>${recipeDetails.author}</span>
            </div>
            <div class="show-recipe-ingredients">
                <label>Ingredients:</label><br/>
                <span>${recipeDetails.ingredients}</span>
            </div>
            <div class="show-recipe-instructions">
                <label>Instructions:</label><br/>
                <span>${recipeDetails.instructions}</span>
            </div>
        `;
    }
}


backHomepage.addEventListener('click', (event) => {
    if(!event.target.classList.contains('back-home-button')) {
        return;
    }
    event.preventDefault();

    fetchRecipes()
        .then((text) => {
            appState.isHomePage = true;
            appState.recipes = text;
            appState.recipeDetails = {};
            appState.abilityToAdd = false;
            appState.error = '';
            renderHomePage();
            renderRecipeDetail(appState.recipeDetails);
            renderNewRecipePanel(appState.abilityToAdd);
        });
});


function renderNewRecipePanel(show) {
    if (show) {
        newRecipePanel.innerHTML = `
            <h2 class="title"> Add New Recipe </h2>
            <div class="new-recipe-panel">
                <div>
                    <label>Title: </label><br/>
                    <textarea class="new-recipe-title" placeholder="Please add recipe name"></textarea>
                </div>
                <div>
                    <label>Ingredients: </label><br/>
                    <textarea class="new-recipe-ingredients" placeholder="Please add recipe ingredients"></textarea>
                </div>
                <div>
                    <label>Instructions: </label><br/>
                    <textarea class="new-recipe-instructions" placeholder="Please add recipe instructions"></textarea>
                </div>
                <div>
                    <button class="to-add-recipe">Add</button>
                </div>
            </div>
        `;
    } else {
        newRecipePanel.innerHTML = ``;
    }
}


addRecipe.addEventListener('click', (event) => {
    if(!event.target.classList.contains('new-recipe-button')) {
        return;
    }
    event.preventDefault();

    fetchNewRecipe()
        .then( () => {
            appState.isHomePage = false;
            appState.isLoggedIn = true;
            appState.abilityToAdd = true;
            appState.error = '';
            renderHomePage();
            renderNewRecipePanel(appState.abilityToAdd);
        })
        .catch( (err) => {
            appState.error = err.errorCode;
            appState.isHomePage = true;
            appState.isLoggedIn = false;
            renderHomePage();
        });
});


newRecipePanel.addEventListener('click', (event) => {
    if (!event.target.classList.contains('to-add-recipe')) {
        return;
    }
    event.preventDefault();

    const title = newRecipePanel.querySelector('.new-recipe-title').value;
    const ingredients = newRecipePanel.querySelector('.new-recipe-ingredients').value;
    const instructions = newRecipePanel.querySelector('.new-recipe-instructions').value;

    newRecipePanel.querySelector('.new-recipe-title').value = '';
    newRecipePanel.querySelector('.new-recipe-ingredients').value = '';
    newRecipePanel.querySelector('.new-recipe-instructions').value = '';

    addNewRecipe({ title, ingredients, instructions })
        .then( (newRecipe) => {
            appState.isHomePage = false;
            appState.isLoggedIn = true;
            appState.recipeDetails = newRecipe;
            appState.abilityToAdd = false;
            appState.error = '';
            renderHomePage();
            renderNewRecipePanel(appState.abilityToAdd);
            renderRecipeDetail(appState.recipeDetails);
        })
        .catch( (err) => {
            appState.isHomePage = false;
            appState.isLoggedIn = true;
            appState.error = err.errorCode;
            renderHomePage();
            renderNewRecipePanel(appState.abilityToAdd);
        });
});



fetchLoginStatus()
    .then( () => {
        appState.isLoggedIn = true;
        renderHomePage();
    })
    .catch( () => {
        appState.isLoggedIn = false;
        renderHomePage();
    });

fetchRecipes()
    .then( (text) => {
        appState.isHomePage = true;
        appState.recipes = text;
        renderHomePage();
    });
