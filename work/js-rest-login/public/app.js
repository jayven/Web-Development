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
/* harmony export */   "fetchGetItems": () => (/* binding */ fetchGetItems),
/* harmony export */   "fetchAddItems": () => (/* binding */ fetchAddItems),
/* harmony export */   "fetchUpdateScore": () => (/* binding */ fetchUpdateScore),
/* harmony export */   "fetchDeleteItems": () => (/* binding */ fetchDeleteItems),
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
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch("/session", {
    method: "GET"
  })["catch"](function () {
    return Promise.reject({
      code: "network-error"
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
var fetchUpdateScore = function fetchUpdateScore(itemId, action) {
  return fetch("/items/".concat(itemId), {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      action: action
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
var fetchDeleteItems = function fetchDeleteItems(itemId) {
  return fetch("/items/".concat(itemId), {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
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
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");


 //inventory list elements
// const list = document.querySelector('.items');
// const addItem = document.querySelector('.add-button');
// const newItem = document.querySelector('.to-add-item');
// const itemStatus = document.querySelector('.item-status');
// const itemScore = document.querySelector('.rate-item');

var inventoryPanel = document.querySelector('.list-app'); //login logout elements
// const loginStatus = document.querySelector('.login-status');
// const newUser = document.querySelector('.user-name');
// const addUser = document.querySelector('.login-button');
// const logout = document.querySelector('.logout-button');

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
var appState = {
  pollId: null,
  isLoggedIn: false,
  username: null,
  items: {},
  error: ''
};

function renderPage(sort) {
  if (appState.isLoggedIn) {
    renderLogin(false);
    renderInventory(true, sort);
  } else {
    renderLogin(true);
    renderInventory(false, sort);
  }

  renderErrors(appState.error);
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

function getButton(sort) {
  if (sort === "low-to-high") {
    return "\n\t            <button class=\"sort-button\" data-button-id = \"low-to-high\" type=\"button\"> Sort score by low-to-high</button>\n\t        ";
  } else {
    return "\n\t            <button class=\"sort-button\" data-button-id = \"high-to-low\" type=\"button\"> Sort score by high-to-low</button>\n\t        ";
  }
}

function renderInventory(show, sort) {
  if (show) {
    inventoryPanel.innerHTML = "\n\t        \t<h2 class=\"title\">Inventory List</h2> \n\t\t        <div class=\"logout\">\n\t\t        \t<button class=\"logout-button\" type=\"button\">Sign out</button>\n\t\t        </div>\n\t\t      \t<div class=\"add-item\">\n\t\t\t        Add Item:\n\t\t\t        <input class=\"to-add-item\" type=\"text\" placeholder=\"Please enter a new item\"/>\n\t\t\t        <button class=\"add-button\" type=\"button\">Add</button>\n\t\t      \t</div>\n\t\t      \t<div> " + getButton(sort) + "</div>\n\t\t      \t<div class=\"inventory-panel\">\n\t\t        \t<ul class=\"items\"> </ul>\n\t\t      \t</div>  \n\t        ";
    inventoryPanel.querySelector('.add-button').disabled = true;
    renderItems(appState.items, sort);
  } else {
    inventoryPanel.innerHTML = "";
  }
}

function renderItems(items, sort) {
  var itemList = inventoryPanel.querySelector('.items');
  sortItems(items, sort);
  itemList.innerHTML = items.map(function (item) {
    return "\n\t    \t<li class=\"item-info\">\n                <span class=\"item-name\" data-item-id=\"".concat(item.itemId, "\"> ").concat(item.text, "</span>\n                <button class=\"decrease\" data-item-id=\"").concat(item.itemId, "\" ").concat(item.score <= 1 ? "disabled" : "", "> - </button>\n                <span class=\"item-score\" data-item-id=\"").concat(item.itemId, "\"> score: ").concat(item.score, " </span>\n                <button class=\"increase\" data-item-id=\"").concat(item.itemId, "\" ").concat(item.score >= 5 ? 'disabled' : '', "> + </button>\n                <button class=\"delete-item\" data-item-id=\"").concat(item.itemId, "\"> X </button>\n            </li>\n\t    \t");
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
    appState.isLoggedIn = true;
    appState.username = username;
    appState.items = getItems(items.itemList, appState.username);
    appState.error = '';
    renderPage("high-to-low");
    poll(true);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderPage("high-to-low");
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
  if (shouldPoll && !appState.pollId) {
    appState.pollId = setInterval(function () {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchGetItems)().then(function (items) {
        appState.items = getItems(items.itemList, appState.username);
        appState.error = '';
        renderItems(appState.items, inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
      })["catch"](function (err) {
        if (err.errorCode === 'missing-user') {
          appState.isLoggedIn = false;
          appState.error = '';
          renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
          poll(false);
          return;
        }

        appState.error = err.errorCode;
        renderErrors(appState.error);
      });
    }, 5000);
  }

  if (!shouldPoll && appState.pollId) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

function getItems(itemList, username) {
  var currentItemList = {};
  Object.keys(itemList).forEach(function (key) {
    var item = itemList[key];

    if (item.sender === username) {
      currentItemList[key] = item;
    }
  });
  return Object.values(currentItemList);
}

function sortItems(items, sort) {
  items.sort(function (a, b) {
    if (sort === "high-to-low") {
      return b.score - a.score;
    } else {
      return a.score - b.score;
    }
  });
}

inventoryPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('add-button')) {
    return;
  }

  var newItem = document.querySelector('.to-add-item');
  var text = newItem.value;
  newItem.value = '';
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddItems)(text).then(function (items) {
    appState.item = getItems(items, appState.username);
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
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
  if (!event.target.classList.contains("increase")) {
    return;
  }

  var itemId = event.target.dataset.itemId;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUpdateScore)(itemId, 'increase').then(function (item) {
    Object.keys(appState.items).forEach(function (key) {
      if (appState.items[key].itemId.toString() === itemId) {
        appState.items[key] = item;
      }
    });
    appState.error = '';
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
    renderUser(appState.username);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
    renderUser(appState.username);
  });
});
inventoryPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains("decrease")) {
    return;
  }

  var itemId = event.target.dataset.itemId;
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUpdateScore)(itemId, 'decrease').then(function (item) {
    Object.keys(appState.items).forEach(function (key) {
      if (appState.items[key].itemId.toString() === itemId) {
        appState.items[key] = item;
      }
    });
    appState.error = '';
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
    renderUser(appState.username);
  })["catch"](function (err) {
    appState.error = err.errorCode;
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
    renderUser(appState.username);
  });
});
inventoryPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('sort-button')) {
    return;
  }

  var sort = event.target.dataset.buttonId;
  sort = sort === 'high-to-low' ? 'low-to-high' : 'high-to-low';
  renderInventory(true, sort);
});
inventoryPanel.addEventListener('click', function (event) {
  if (!event.target.classList.contains('logout-button')) {
    return;
  }

  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    appState.isLoggedIn = false;
    appState.items = {};
    appState.users = null;
    appState.error = '';
    poll(false);
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
  })["catch"](function (err) {
    appState.error = err.errorCode;
    poll(false);
    renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
  });
});
(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLoginStatus)().then(function (name) {
  appState.username = name.username;
  appState.isLoggedIn = true;
  poll();
  poll(true);
  renderPage('high-to-low');
})["catch"](function (err) {
  appState.isLoggedIn = false;
  renderPage('high-to-low');
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map