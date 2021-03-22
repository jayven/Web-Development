"use strict";
import {
	fetchLogin,
	fetchGetItems,
	fetchAddItems,
	fetchLogout,
	fetchUpdateScore,
	fetchLoginStatus
} from './services';

   //inventory list elements
    // const list = document.querySelector('.items');
    // const addItem = document.querySelector('.add-button');
    // const newItem = document.querySelector('.to-add-item');
    // const itemStatus = document.querySelector('.item-status');
    // const itemScore = document.querySelector('.rate-item');
    const inventoryPanel = document.querySelector('.list-app');

    //login logout elements
    // const loginStatus = document.querySelector('.login-status');
    // const newUser = document.querySelector('.user-name');
    // const addUser = document.querySelector('.login-button');
    // const logout = document.querySelector('.logout-button');
    const loginPanel = document.querySelector('.login-panel');
    const status = document.querySelector('.status');


    const errorMessages = {
        'missing-item-name': "Please enter a valid item name",
        'duplicate-name': "This item is already in the list, please try another one",
        'invalid-quantity': "Invalid quantity",
        'missing-item': "The item doesn't exist, please try again",
        'network-error': "There is a problem connecting to the network, try again",
        'invalid-username': "Please enter a valid username without whitespace & 'dog'",
        'missing-user': "The user doesn't exist, please try again",
        'invalid-score': "Please enter a valid integer from 1 to 5",
        'missing-score': "The score doesn't exist, please try again"
    }

    const appState = {
    	pollId: null,
    	isLoggedIn: false,
    	username: null,
    	items: {},
    	error:''
    }

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
    	if(show) {
    		loginPanel.innerHTML = `
    			<input class="user-name" type="text" placeholder="Please enter a username" />
      			<button class="login-button" type="button">Sign in</button>
    		`;
    		loginPanel.querySelector(`.login-button`).disabled = true;
    	} else {
    		loginPanel.innerHTML = ``;
    	}
    }

    function renderErrors(error) {
    	status.innerText = errorMessages[error] || error;
	}

	function getButton(sort) {
	    if(sort === "low-to-high"){
	        return `
	            <button class="sort-button" data-button-id = "low-to-high" type="button"> Sort score by low-to-high</button>
	        `;
	    } else {
	        return `
	            <button class="sort-button" data-button-id = "high-to-low" type="button"> Sort score by high-to-low</button>
	        `;
	    }
	}

	function renderInventory(show, sort) {
	    if(show) {
	        inventoryPanel.innerHTML = `
	        	<h2 class="title">Inventory List</h2> 
		        <div class="logout">
		        	<button class="logout-button" type="button">Sign out</button>
		        </div>
		      	<div class="add-item">
			        Add Item:
			        <input class="to-add-item" type="text" placeholder="Please enter a new item"/>
			        <button class="add-button" type="button">Add</button>
		      	</div>
		      	<div> ` + getButton(sort) + `</div>
		      	<div class="inventory-panel">
		        	<ul class="items"> </ul>
		      	</div>  
	        `;

	        inventoryPanel.querySelector('.add-button').disabled = true;
	        renderItems(appState.items, sort);
	    } else {
	        inventoryPanel.innerHTML = ``;
	    } 
	}

	function renderItems( items, sort ) {
	    const itemList = inventoryPanel.querySelector('.items'); 
	    sortItems(items, sort);
	    itemList.innerHTML = items.map( (item) => {
	    	return`
	    	<li class="item-info">
                <span class="item-name" data-item-id="${item.itemId}"> ${item.text}</span>
                <button class="decrease" data-item-id="${item.itemId}" ${item.score <= 1 ? "disabled" : ""}> - </button>
                <span class="item-score" data-item-id="${item.itemId}"> score: ${item.score} </span>
                <button class="increase" data-item-id="${item.itemId}" ${ item.score >= 5 ? 'disabled' : ''}> + </button>
                <button class="delete-item" data-item-id="${item.itemId}"> X </button>
            </li>
	    	`}).join('');
	}

	loginPanel.addEventListener('click', (event) => {
	    if(!event.target.classList.contains('login-button')) {
	        return;
	    }

	    const addUser = loginPanel.querySelector('.user-name');
	    const username = addUser.value;
	    addUser.value = '';

	    fetchLogin(username)
	    .then( (items) => {
	        appState.isLoggedIn = true;
	        appState.username = username;
	        appState.items = getItems(items.itemList, appState.username);
	        appState.error = '';
	        renderPage("high-to-low");
	        poll(true);
	    })
	    .catch( (err) => {
	        appState.error = err.errorCode;
	        renderPage("high-to-low");
	    });   
	});

	loginPanel.addEventListener('keyup', (event) => {
		if(!event.target.classList.contains('user-name')) {
           return;
    	}
		const text = event.target.value;
	    loginPanel.querySelector('.login-button').disabled = !text;
	});

	function poll(shouldPoll) {
    	if(shouldPoll && !appState.pollId) {
	        appState.pollId = setInterval( () => {
	            fetchGetItems()
	            .then( (items) => {
		        	appState.items = getItems(items.itemList, appState.username);
	                appState.error = '';
	                renderItems(appState.items, inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	            })
	            .catch( (err) => {
	                if(err.errorCode === 'missing-user') {
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

	    if(!shouldPoll && appState.pollId) {
	        clearTimeout(appState.pollId);
	        appState.pollId = null;
	    }
	}

	function getItems(itemList, username){
	    const currentItemList = {};
	    Object.keys(itemList).forEach(function(key){
	      const item = itemList[key];
	      
	      if (item.sender === username) {
	        currentItemList[key] = item;
	      }
	    });
	    return Object.values(currentItemList);
	}

	function sortItems(items, sort) {
	    items.sort(function (a, b) {
	        if(sort === "high-to-low"){
	            return b.score - a.score;
	        } else {
	            return a.score - b.score;
	        }
	    })
	}

	inventoryPanel.addEventListener('click', (event) => {
	    if(!event.target.classList.contains('add-button')) {
	        return;
	    }
	    
	    const newItem = document.querySelector('.to-add-item');
	    const text = newItem.value;
	    newItem.value = '';

	    fetchAddItems(text)
	    .then( (items) => {
	        appState.item = getItems(items, appState.username);
	        renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	    })
	    .catch( (err) => {
	        appState.error = err.errorCode;
	        renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	    });
	});

	inventoryPanel.addEventListener('keyup', (event) => {
        if(!event.target.classList.contains('to-add-item')) {
        return;
    }
		const text = event.target.value;
	    inventoryPanel.querySelector('.add-button').disabled = !text;
    });

	inventoryPanel.addEventListener('click', event => {
	    if (!event.target.classList.contains("increase")) {
	        return;
	    }
	    const itemId = event.target.dataset.itemId;
	    fetchUpdateScore(itemId, 'increase')
	        .then((item) => {
	            Object.keys(appState.items).forEach(function(key){
	                if(appState.items[key].itemId.toString() === itemId){
	                    appState.items[key] = item;
	                }
	            });

	            appState.error = '';
	            renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	            renderUser(appState.username);
	        })
	        .catch((err) => {
	            appState.error = err.errorCode;
	            renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	            renderUser(appState.username);
	        });
	});

	inventoryPanel.addEventListener('click', event => {
	    if (!event.target.classList.contains("decrease")) {
	        return;
	    }
	    const itemId = event.target.dataset.itemId;
	    fetchUpdateScore(itemId, 'decrease')
	        .then((item) => {
	            Object.keys(appState.items).forEach(function(key){
	                if(appState.items[key].itemId.toString() === itemId){
	                    appState.items[key] = item;
	                }
	            });

	            appState.error = '';
	            renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	            renderUser(appState.username);
	        })
	        .catch((err) => {
	            appState.error = err.errorCode;
	            renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	            renderUser(appState.username);
	        });
	});

	inventoryPanel.addEventListener('click', event => {
	    if (!event.target.classList.contains('sort-button')) {
	        return;
	    }
	    let sort = event.target.dataset.buttonId;
	    sort = sort === 'high-to-low' ? 'low-to-high' : 'high-to-low';
	    renderInventory(true, sort);
	})

    inventoryPanel.addEventListener('click', (event) => {
	    if(!event.target.classList.contains('logout-button')) {
	        return;
	    }

	    fetchLogout()
	    .then( () => {
	        appState.isLoggedIn = false;
	        appState.items = {};
	        appState.users = null;
	        appState.error = '';
	        poll(false);
	        renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id')); 
	    })
	    .catch( (err) => {
	        appState.error = err.errorCode;   
	        poll(false);
	        renderPage(inventoryPanel.querySelector('.sort-button').getAttribute('data-button-id'));
	});

	fetchLoginStatus()
	.then( (name) => {
	    appState.username = name.username;
	    appState.isLoggedIn = true;
	    poll();
	    poll(true);
	    renderPage('high-to-low');
	})
	.catch( (err) => {
	    appState.isLoggedIn = false;
	    rrenderPage('high-to-low');
	});

