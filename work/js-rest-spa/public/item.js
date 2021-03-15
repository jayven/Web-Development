(function IIFE(){
    const list = document.querySelector('.items');
    const addItem = document.querySelector('.add-button');
    const newItem = document.querySelector('.to-add-item');
    const itemQuantity = document.querySelector('.to-add-quantity');
    const itemStatus = document.querySelector('.item-status');

    const errorMessages = {
        'missing-item-name': "Please enter a valid item name",
        'duplicate-name': "This item is already in the list, please try another one",
        'invalid-quantity': "Please enter a valid quantity",
        'missing-item': "The item doesn't exist, please try again",
        'missing-quantity': "Please enter a valid quantity to update it",
        'network-error': "There is a problem connecting to the network, try again"
    }
    
    function updateItemStatus(message) {
        itemStatus.innerText = message;
    }

    function renderInventory() {
        addItem.disabled = true; 
    }

    function renderItems( items ) {
        const itemList = items.map(
            (item) => `
            <li class="item-info">
                <span class="item-name" data-item-id="${item.itemId}"> ${item.itemName}</span>
                <button class="update-item" data-item-id="${item.itemId}"> Update </span>
                <button class="decrease" data-item-id="${item.itemId}" ${item.quantity <= 0 ? "disabled" : ""}> - </button>
                <span class="item-quantity" data-item-id="${item.itemId}"> ${item.quantity}</span>
                <button class="increase" data-item-id="${item.itemId}"> + </button>
                <button class="delete-item" data-item-id="${item.itemId}"> X </button>
            </li>
            `
        ).join('');
        list.innerHTML = itemList;
    }

    function convertError(response) {
        if(response.ok) { 
            return response.json(); 
        }

        return response.json()
        .then( err => Promise.reject(err) );
    }

    function resetPage() {
        newItem.value = '';
        itemQuantity.value ='';
        addItem.disabled = true;
    }

    function getItems() {
        fetch('/items', {
            method: 'GET'
        })
        .catch( () => Promise.reject({ errorCode: 'network-error' }))
        .then( convertError )
        .then( (items) => {
            renderInventory();
            renderItems(items);
            updateItemStatus('');
        })  
    }


    addItem.addEventListener('click', (event) =>{
        const itemName = newItem.value;
        let quantity = itemQuantity.value;
        //quantity default 0
        if(!quantity) {
            quantity = 0;
        }

        resetPage();
        fetch('/items', {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ itemName, quantity }),
            credentials: 'include',
        })
        .catch( () => Promise.reject({ errorCode: 'nextwork-error' }) )
        .then( convertError )
        .then( (items) => {
            renderItems(items);
            updateItemStatus('');
        })
        .catch( err => {
            updateItemStatus(errorMessages[err.errorCode] || err.errCode); 
        });
    });


    newItem.addEventListener('keyup', (event) => {
        const text = event.target.value;
        addItem.disabled = !text;
    });


    //update or remove an item
    list.addEventListener('click', (evernt) => {
        const itemId = event.target.dataset.itemId;

        if(event.target.classList.contains('update-item')) {
            let quantity = itemQuantity.value;

            fetch(`/items/${itemId}`, {
                method: 'PATCH',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            })
            .catch( () => Promise.reject({ errorCode: 'network-error' }) )
            .then( convertError )
            .then( (items) => {
                renderItems(items);
                updateItemStatus('');
            })
            .catch( err => {
                if (err.errorCode === 'missing-item') {
                    updateItemStatus(errorMessages[err.errorCode] || err.errCode);
                } else {
                    updateItemStatus(errorMessages[err.errorCode] || err.errCode);
                }
            });   
        }

        if(event.target.classList.contains('increase')) {
            let quantity = itemQuantity.value ++;
            fetch(`/items/${itemId}`, {
                method: 'PATCH',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            })
            .catch( () => Promise.reject({ errorCode: 'network-error' }) )
            .then( convertError )
            .then( (items) => {
                renderItems(items);
                updateItemStatus('');
            })
            .catch( err => {
                updateItemStatus(errorMessages[err.errorCode] || err.errCode);                  
            });
        }

        if(event.target.classList.contains('decrease')) {
            let quantity = itemQuantity.value --;
            fetch(`/items/${itemId}`, {
                method: 'PATCH',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                body: JSON.stringify({ quantity }),
                credentials: 'include',
            })
            .catch( () => Promise.reject({ errorCode: 'network-error' }) )
            .then( convertError )
            .then( (items) => {
                renderItems(items);
                updateItemStatus('');
            })
            .catch( err => {
                updateItemStatus(errorMessages[err.errorCode] || err.errCode);                  
            });
        }

        if(event.target.classList.contains('delete-item')) {
            fetch(`/items/${itemId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'content-type': 'application/json'
                }),
                credentials: 'include',
            })
            .catch( () => Promise.reject({ errorCode: 'network-error' }) )
            .then( convertError )
            .then( (items) => {
                renderItems(items);
                updateItemStatus('');
            })
            .catch( err => {
                updateItemStatus(errorMessages[err.errorCode] || err.errCode);                  
            });
        }
    });

    getItems();

})();