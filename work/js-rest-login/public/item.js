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
/* harmony export */   "fetchGetItems": () => (/* binding */ fetchGetItems),
/* harmony export */   "fetchAddItems": () => (/* binding */ fetchAddItems),
/* harmony export */   "fetchUpdateScore": () => (/* binding */ fetchUpdateScore),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout)
/* harmony export */ });


var fetchLogin = function fetchLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
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

    return response.json();
  });
};
var fetchGetItems = function fetchGetItems() {
  return fetch('/items', {
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

    return response.json();
  });
};
var fetchAddItems = function fetchAddItems(text) {
  return fetch('/items', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
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
var fetchUpdateScore = function fetchUpdateScore(score) {
  return fetch('/items', {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      score: score
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
/*!*********************!*\
  !*** ./src/item.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");


 //inventory list elements

var list = document.querySelector('.items');
var addItem = document.querySelector('.add-button');
var newItem = document.querySelector('.to-add-item');
var itemStatus = document.querySelector('.item-status');
var itemScore = document.querySelector('.rate-item');
var inventoryPanel = document.querySelector('.list-app'); //login logout elements

var loginStatus = document.querySelector('.login-status');
var newUser = document.querySelector('.user-name');
var addUser = document.querySelector('.login-button');
var logout = document.querySelector('.logout-button');
var loginPanel = document.querySelector('.login-panel');
var status = document.querySelector('.status');
var errorMessages = {
  'missing-item-name': "Please enter a valid item name",
  'duplicate-name': "This item is already in the list, please try another one",
  'invalid-quantity': "Invalid quantity",
  'missing-item': "The item doesn't exist, please try again",
  'network-error': "There is a problem connecting to the network, try again",
  'invalid-username': "Please enter a valid username without whitespace & 'dog'",
  'missing-user': "The user doesn't exist, please try again",
  'invalid-score': "Please enter a valid integer from 1 to 5",
  'missing-score': "The score doesn't exist, please try again"
};
var itemState = {
  pollId: null,
  isLoggedIn: false,
  users: [],
  inventory: [],
  error: ''
};

function renderPage() {
  if (itemState.isLoggedIn) {
    renderLogin(false);
    renderInventory(true);
  } else {
    renderLogin(true);
    renderInventory(false);
  }

  renderErrors(itemState.error);
}

function renderLogin(show) {
  if (show) {
    loginPanel.innerHTML = "\n    \t\t\t<input class=\"user-name\" type=\"text\" placeholder=\"Please enter a username\" />\n      \t\t\t<button class=\"login-button\" type=\"button\">Sign in</button>\n    \t\t";
    loginPanel.querySelector(".login-button").disabled = true;
  } else {
    loginPanel.innerHTML = "";
  }
}

function renderErrors(error) {
  status.innerText = errorMessages[error] || error;
}

function renderInventory(show) {
  if (show) {
    inventoryPanel.innerHTML = "\n\t        \t<h2 class=\"title\">Inventory List</h2> \n\t\t        <div class=\"logout\">\n\t\t        \t<button class=\"logout-button\" type=\"button\">Sign out</button>\n\t\t        </div>\n\t\t      \t<div class=\"add-item\">\n\t\t\t        Add Item:\n\t\t\t        <input class=\"to-add-item\" type=\"text\" placeholder=\"Please enter a new item\"/>\n\t\t\t        <input type=\"text\" class=\"rate-item\" placeholder=\"Please rate the item from 1 to 5\" />\n\t\t\t        <button class=\"add-button\" type=\"button\">Add</button>\n\t\t      \t</div>\n\t\t      \t<div class=\"inventory-panel\">\n\t\t        \t<ul class=\"items\"> </ul>\n\t\t      \t</div>  \n\t        ";
    inventoryPanel.querySelector('.add-button').disabled = true; //renderUsers(itemState.users);

    renderItems(itemState.inventory);
  } else {
    inventoryPanel.innerHTML = "";
  }
}

function renderItems(items) {
  var itemList = inventoryPanel.querySelector('.items');
  itemList.innerHTML = items.map(function (item) {
    return "\n\t    \t<li class=\"item-info\">\n                <span class=\"item-name\" data-item-id=\"".concat(item.itemId, "\"> ").concat(item.itemName, "</span>\n                <button class=\"decrease\" data-item-id=\"").concat(item.itemId, "\" ").concat(item.quantity <= 0 ? "disabled" : "", "> - </button>\n                <span class=\"item-quantity\" data-item-id=\"").concat(item.itemId, "\"> ").concat(item.quantity, "</span>\n                <button class=\"increase\" data-item-id=\"").concat(item.itemId, "\"> + </button>\n                <span class=\"item-score\" data-item-id=\"").concat(item.itemId, "\"> score: ").concat(item.score, " </span>\n                <button class=\"update-score\" data-item-id=\"").concat(item.itemId, "\"> Update </button>\n                <button class=\"delete-item\" data-item-id=\"").concat(item.itemId, "\"> X </button>\n            </li>\n\t    \t");
  }).join('');
}

loginPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('login-button')) {
    return;
  }

  var addUser = loginPanel.querySelector('.user-name');
  var username = addUser.value;
  addUser.value = '';
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (items) {
    itemState.isLoggedIn = true;
    itemState.users = Object.values(users);
    itemState.items = Object.values(items);
    itemState.error = '';
    renderPage();
    poll(true);
  })["catch"](function (err) {
    itemState.error = err.errorCode;
    renderPage();
  });
});
loginPanel.addEventListener('keyup', function (event) {
  if (!event.target.classList.contains('user-name')) {
    return;
  }

  var text = event.target.value;
  loginPanel.querySelector('.login-button').disabled = !text;
});

function poll(shouldPoll) {
  if (shouldPoll && !itemState.pollId) {
    itemState.pollId = setInterval(function () {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetItems)().then(function (items) {
        itemState.users = Object.values(users);
        itemState.items = Object.values(items);
        itemState.error = '';
        renderItems(itemState.items);
      })["catch"](function (err) {
        if (err.errorCode === 'missing-user') {
          itemState.isLoggedIn = false;
          itemState.error = '';
          renderPage();
          poll(false);
          return;
        }

        itemState.error = err.errorCode;
        renderErrors(itemState.error);
      });
    }, 3000);
  }

  if (!shouldPoll && itemState.pollId) {
    clearTimeout(itemState.pollId);
    itemState.pollId = null;
  }
}

inventoryPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('add-button')) {
    return;
  }

  var newItem = document.querySelector('.to-add-item');
  var itemName = newItem.value;
  newItem.value = '';
  var quantity = 0;
  var itemScore = document.querySelector('.rate-item');
  var score = itemScore.value;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddItems)({
    itemName: itemName,
    quantity: quantity,
    score: score
  }).then(function (items) {
    itemState.inventory = Object.values(items);
    renderPage();
  })["catch"](function (err) {
    itemState.error = err.errorCode;
    renderPage();
  });
});
inventoryPanel.addEventListener('keyup', function (event) {
  if (!event.target.classList.contains('to-add-item')) {
    return;
  }

  var text = event.target.value;
  inventoryPanel.querySelector('.add-button').disabled = !text;
});
inventoryPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('logout-button')) {
    return;
  }

  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    itemState.isLoggedIn = false;
    itemState.items = [];
    itemState.users = [];
    itemState.error = '';
    poll(false);
    renderPage();
  })["catch"](function (err) {
    itemState.error = err.errorCode;
    poll(false);
    renderPage();
  });
});
(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetItems)().then(function (items) {
  itemState.users = Object.values(users);
  itemState.items = Object.values(items);
  itemState.error = '';
  itemState.isLoggedIn = true;
  renderPage();
  poll(true);
})["catch"](function (err) {
  itemState.isLoggedIn = false;
  poll(false);
  renderPage();
});
})();

/******/ })()
;
//# sourceMappingURL=item.js.map