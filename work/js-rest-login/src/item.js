"use strict";
import {
	fetchLogin,
	fetchGetItems,
	fetchAddItems,
	fetchLogout,
	fetchUpdateScore
} from './services';

   //inventory list elements
    const list = document.querySelector('.items');
    const addItem = document.querySelector('.add-button');
    const newItem = document.querySelector('.to-add-item');
    const itemStatus = document.querySelector('.item-status');
    const itemScore = document.querySelector('.rate-item');
    const inventoryPanel = document.querySelector('.list-app');

    //login logout elements
    const loginStatus = document.querySelector('.login-status');
    const newUser = document.querySelector('.user-name');
    const addUser = document.querySelector('.login-button');
    const logout = document.querySelector('.logout-button');
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

    const itemState = {
    	pollId: null,
    	isLoggedIn: false,
    	users: [],
    	inventory: [],
    	error:''
    }

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

	function renderInventory(show) {
	    if(show) {
	        inventoryPanel.innerHTML = `
	        	<h2 class="title">Inventory List</h2> 
		        <div class="logout">
		        	<button class="logout-button" type="button">Sign out</button>
		        </div>
		      	<div class="add-item">
			        Add Item:
			        <input class="to-add-item" type="text" placeholder="Please enter a new item"/>
			        <input type="text" class="rate-item" placeholder="Please rate the item from 1 to 5" />
			        <button class="add-button" type="button">Add</button>
		      	</div>
		      	<div class="inventory-panel">
		        	<ul class="items"> </ul>
		      	</div>  
	        `;

	        inventoryPanel.querySelector('.add-button').disabled = true;
	        //renderUsers(itemState.users);
	        renderItems(itemState.inventory);
	    } else {
	        inventoryPanel.innerHTML = ``;
	    } 
	}

	function renderItems( items ) {
	    const itemList = inventoryPanel.querySelector('.items'); 
	    itemList.innerHTML = items.map( (item) => {
	    	return`
	    	<li class="item-info">
                <span class="item-name" data-item-id="${item.itemId}"> ${item.itemName}</span>
                <button class="decrease" data-item-id="${item.itemId}" ${item.quantity <= 0 ? "disabled" : ""}> - </button>
                <span class="item-quantity" data-item-id="${item.itemId}"> ${item.quantity}</span>
                <button class="increase" data-item-id="${item.itemId}"> + </button>
                <span class="item-score" data-item-id="${item.itemId}"> score: ${item.score} </span>
                <button class="update-score" data-item-id="${item.itemId}"> Update </button>
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
	        itemState.isLoggedIn = true;
	        itemState.users = Object.values(users);
	        itemState.items = Object.values(items);
	        itemState.error = '';
	        renderPage();
	        poll(true);
	    })
	    .catch( (err) => {
	        itemState.error = err.errorCode;
	        renderPage();
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
    	if(shouldPoll && !itemState.pollId) {
	        itemState.pollId = setInterval( () => {
	            fetchGetItems()
	            .then( (items) => {
	                itemState.users = Object.values(users);
		        	itemState.items = Object.values(items);
	                itemState.error = '';
	                renderItems(itemState.items);
	            })
	            .catch( (err) => {
	                if(err.errorCode === 'missing-user') {
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

	    if(!shouldPoll && itemState.pollId) {
	        clearTimeout(itemState.pollId);
	        itemState.pollId = null;
	    }
	}

	inventoryPanel.addEventListener('click', (event) => {
	    if(!event.target.classList.contains('add-button')) {
	        return;
	    }
	    
	    const newItem = document.querySelector('.to-add-item');
	    const itemName = newItem.value;
	    newItem.value = '';
	    let quantity = 0;
	    const itemScore = document.querySelector('.rate-item');
        let score = itemScore.value;

	    fetchAddItems({itemName, quantity, score})
	    .then( (items) => {
	        itemState.inventory = Object.values(items);
	        renderPage();
	    })
	    .catch( (err) => {
	        itemState.error = err.errorCode;
	        renderPage();
	    });
	});

	inventoryPanel.addEventListener('keyup', (event) => {
        if(!event.target.classList.contains('to-add-item')) {
        return;
    }
		const text = event.target.value;
	    inventoryPanel.querySelector('.add-button').disabled = !text;
    });


    inventoryPanel.addEventListener('click', (event) => {
	    if(!event.target.classList.contains('logout-button')) {
	        return;
	    }

	    fetchLogout()
	    .then( () => {
	        itemState.isLoggedIn = false;
	        itemState.items = [];
	        itemState.users = [];
	        itemState.error = '';
	        poll(false);
	        renderPage();  
	    })
	    .catch( (err) => {
	        itemState.error = err.errorCode;   
	        poll(false);
	        renderPage();
	    })
	});

	fetchGetItems()
	.then( (items) => {
	    itemState.users = Object.values(users);
		itemState.items = Object.values(items);
	    itemState.error = '';
	    itemState.isLoggedIn = true;
	    renderPage();
	    poll(true);
	})
	.catch( (err) => {
	    itemState.isLoggedIn = false;
	    poll(false);
	    renderPage();
	});

