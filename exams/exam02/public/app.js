/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLoginStatus": () => (/* binding */ fetchLoginStatus),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchRecipes": () => (/* binding */ fetchRecipes),
/* harmony export */   "fetchRecipeDetails": () => (/* binding */ fetchRecipeDetails),
/* harmony export */   "fetchNewRecipe": () => (/* binding */ fetchNewRecipe),
/* harmony export */   "addNewRecipe": () => (/* binding */ addNewRecipe)
/* harmony export */ });
 //login & logout

var fetchLogin = function fetchLogin(username) {
  return fetch('/session', {
    method: "POST",
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    }),
    credentials: 'include'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return;
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
    })
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return;
  });
}; //load recipe

var fetchRecipes = function fetchRecipes() {
  return fetch('/recipes', {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchRecipeDetails = function fetchRecipeDetails(recipeId) {
  return fetch("/recipes/".concat(recipeId), {
    method: 'GET',
    credentials: 'include'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
}; //new recipes

var fetchNewRecipe = function fetchNewRecipe() {
  return fetch('/newRecipe', {
    method: 'GET',
    credentials: 'include'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return;
  });
};
var addNewRecipe = function addNewRecipe(_ref) {
  var title = _ref.title,
      ingredients = _ref.ingredients,
      instructions = _ref.instructions;
  return fetch('/newRecipe', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      instructions: instructions
    }),
    credentials: 'include'
  })["catch"](function () {
    return Promise.reject({
      errorCode: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");



var loginButton = document.querySelector('.login');
var loginPanel = document.querySelector('.login-panel');
var status = document.querySelector('.status');
var recipeList = document.querySelector('.recipe-list-panel');
var newRecipePanel = document.querySelector('.new-recipe-panel');
var recipeDetailPanel = document.querySelector('.recipe-details-panel');
var addRecipe = document.querySelector('.add-button');
var backHomepage = document.querySelector('.back-button');
var errorMessages = {
  'network-error': "There is a problem connecting to the network, please try again",
  'missing-user': "The user doesn't exist, please login first",
  'invalid-username': "Invalid username, please enter a name without whitespace & 'dog' (upper and lower case A-Z, numbers, and underscore is allowed)",
  'missing-content': "Please enter recipe details",
  'missing-recipe': "The recipe doesn't exist, please try again"
};
var appState = {
  isHomePage: false,
  isLoggedIn: false,
  abilityToLogin: false,
  abilityToAdd: false,
  recipes: [],
  recipeDetails: {},
  error: ''
};

function renderHomePage() {
  if (appState.abilityToLogin) {
    loginButton.innerHTML = "";
    recipeList.innerHTML = "";
    addRecipe.innerHTML = "";
    renderErrors(appState.error);
    return;
  }

  if (appState.isLoggedIn) {
    loginButton.innerHTML = "\n            <button class=\"logout-button\">Sign out</button>";
  } else {
    loginButton.innerHTML = "\n            <button class=\"login-button\">Sign in</button>";
  }

  if (appState.isHomePage) {
    recipeList.innerHTML = "\n            <div class=\"recipes-list\">\n                <ul class=\"recipes\"> </ul> \n            </div>\n        ";
    renderRecipes(appState.recipes);
    addRecipe.innerHTML = "<button class=\"new-recipe-button\">Add Your Recipe</button>";
  } else {
    recipeList.innerHTML = "";
    backHomepage.innerHTML = "<button class=\"back-home-button\">Back to Home</button>";
  }

  renderErrors(appState.error);
}

function renderErrors(error) {
  status.innerText = errorMessages[error] || error;
}

function renderLogin(show) {
  if (show) {
    loginPanel.innerHTML = "\n                <input class=\"username\" type=\"text\" placeholder=\"Please enter a user name\" />\n                <button class=\"to-login-button\" type=\"button\">Sign in</button>\n        ";
    loginPanel.querySelector('.to-login-button').disabled = true;
  } else {
    loginPanel.innerHTML = "";
  }
}

loginButton.addEventListener('click', function (event) {
  if (!event.target.classList.contains('login-button')) {
    return;
  }

  event.preventDefault();
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLoginStatus)().then(function () {
    appState.abilityToLogin = false;
    renderHomePage(appState.abilityToLogin);
  })["catch"](function () {
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
loginPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('to-login-button')) {
    return;
  }

  event.preventDefault();
  var addUser = loginPanel.querySelector('.username');
  var username = addUser.value;
  addUser.value = '';
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (text) {
    appState.isLoggedIn = true;
    appState.abilityToLogin = false;
    appState.isHomePage = true;
    appState.recipes = text;
    appState.error = '';
    renderHomePage();
    renderLogin(appState.abilityToLogin);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderHomePage();
    renderLogin(appState.abilityToLogin);
    renderErrors(appState.error);
  });
});

function renderRecipes(recipes) {
  var recipesInfo = recipeList.querySelector('.recipes');
  recipesInfo.innerHTML = recipes.map(function (recipe) {
    return "\n            <li class=\"recipe-info\">\n                <span class=\"recipe-title\" data-recipe-id=\"".concat(recipe.recipeId, "\">").concat(recipe.title, "</span>\n                <span class=\"recipe-author\" data-recipe-id=\"").concat(recipe.recipeId, "\">").concat(recipe.author, "</span>\n            </li>\n        ");
  }).join(' ');
}

loginPanel.addEventListener('keyup', function (event) {
  if (!event.target.classList.contains('username')) {
    return;
  }

  var text = event.target.value;
  loginPanel.querySelector('.to-login-button').disabled = !text;
});
loginButton.addEventListener('click', function (event) {
  if (!event.target.classList.contains('logout-button')) {
    return;
  }

  event.preventDefault();
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    appState.isHomePage = true;
    appState.isLoggedIn = false;
    appState.recipeDetails = {};
    appState.abilityToAdd = false;
    appState.error = '';
    renderHomePage();
    renderRecipeDetail(appState.recipeDetails);
    renderNewRecipePanel(appState.abilityToAdd);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderErrors();
  });
});
recipeList.addEventListener('click', function (event) {
  if (!event.target.classList.contains('recipe-title')) {
    return;
  }

  event.preventDefault();
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchRecipeDetails)(event.target.dataset.recipeId).then(function (recipeDetails) {
    appState.isHomePage = false;
    appState.recipeDetails = recipeDetails;
    appState.error = '';
    renderHomePage();
    renderRecipeDetail(appState.recipeDetails);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderHomePage(appState.isHomePage);
  });
});

function renderRecipeDetail(recipeDetails) {
  if (Object.keys(recipeDetails).length === 0) {
    recipeDetailPanel.innerHTML = "";
  } else {
    recipeDetailPanel.innerHTML = "\n            <h2 class=\"title\"> Recipt Details </h2>\n            <div class=\"recipe-title\">\n                <label>Title:</label>\n                <span>".concat(recipeDetails.title, "</span>\n            </div>\n            <div class=\"recipe-author\">\n                <label>Author:</label>\n                <span>").concat(recipeDetails.author, "</span>\n            </div>\n            <div class=\"recipe-ingredients\">\n                <label>Ingredients:</label><br/>\n                <span>").concat(recipeDetails.ingredients, "</span>\n            </div>\n            <div class=\"recipe-instrcutions\">\n                <label>Instructions:</label><br/>\n                <span>").concat(recipeDetails.instructions, "</span>\n            </div>\n        ");
  }
}

backHomepage.addEventListener('click', function (event) {
  if (!event.target.classList.contains('back-home-button')) {
    return;
  }

  event.preventDefault();
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchRecipes)().then(function (text) {
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
    newRecipePanel.innerHTML = "\n            <h2 class=\"title\"> Add New Recipe </h2>\n            <div>\n                <label>Title: </label><br/>\n                <textarea class=\"new-recipe-title\" placeholder=\"Please add recipe name\"></textarea>\n            </div>\n            <div>\n                <label>Ingredients: </label><br/>\n                <textarea class=\"new-recipe-ingredients\" placeholder=\"Please add recipe ingredients\"></textarea>\n            </div>\n            <div>\n                <label>Instructions: </label><br/>\n                <textarea class=\"new-recipe-instructions\" placeholder=\"Please add recipe instructions\"></textarea>\n            </div>\n            <div>\n                <button class=\"to-add-recipe\">Add</button>\n            </div>\n        ";
  } else {
    newRecipePanel.innerHTML = "";
  }
}

addRecipe.addEventListener('click', function (event) {
  if (!event.target.classList.contains('new-recipe-button')) {
    return;
  }

  event.preventDefault();
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchNewRecipe)().then(function () {
    appState.isHomePage = false;
    appState.isLoggedIn = true;
    appState.abilityToAdd = true;
    appState.error = '';
    renderHomePage();
    renderNewRecipePanel(appState.abilityToAdd);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    appState.isHomePage = true;
    appState.isLoggedIn = false;
    renderHomePage();
  });
});
newRecipePanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('to-add-recipe')) {
    return;
  }

  event.preventDefault();
  var title = newRecipePanel.querySelector('.new-recipe-title').value;
  var ingredients = newRecipePanel.querySelector('.new-recipe-ingredients').value;
  var instructions = newRecipePanel.querySelector('.new-recipe-instructions').value;
  newRecipePanel.querySelector('.new-recipe-title').value = '';
  newRecipePanel.querySelector('.new-recipe-ingredients').value = '';
  newRecipePanel.querySelector('.new-recipe-instructions').value = '';
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.addNewRecipe)({
    title: title,
    ingredients: ingredients,
    instructions: instructions
  }).then(function (newRecipe) {
    appState.isHomePage = false;
    appState.isLoggedIn = true;
    appState.recipeDetails = newRecipe;
    appState.abilityToAdd = false;
    appState.error = '';
    renderHomePage();
    renderNewRecipePanel(appState.abilityToAdd);
    renderRecipeDetail(appState.recipeDetails);
  })["catch"](function (err) {
    appState.isHomePage = false;
    appState.isLoggedIn = true;
    appState.error = err.errorCode;
    renderHomePage();
    renderNewRecipePanel(appState.abilityToAdd);
  });
});
(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLoginStatus)().then(function () {
  appState.isLoggedIn = true;
  renderHomePage();
})["catch"](function () {
  appState.isLoggedIn = false;
  renderHomePage();
});
(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchRecipes)().then(function (text) {
  appState.isHomePage = true;
  appState.recipes = text;
  renderHomePage();
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map