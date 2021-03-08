"use strict";
(function iife() {

  const items = [
  {name: 'Apple', qualtity: 5},
  {name: 'Orange', qualtity: 2},
  {name: 'Grapefruit', qualtity: 3}
  ];

  const listEl = document.querySelector('.items');
  const inputEl = document.querySelector('.to-add-text');
  const buttonEl = document.querySelector('.add');

  disableButtonIfNoInput();
  addAbilityToAddItems();
  addItemList();
  addAbilityToDeleteItems();
  addAbilityToUpdateQualtity();

  render(items); 


  function render( items ) {
    listEl.innerHTML = Object.keys(items).map( (index) => {
      const item = items[index];

      return `
        <li>
          <span class="item" data-index="${index}">${item.name}</span>
          <button class="decrease" data-index="${index}" ${item.qualtity <= 0 ? "disabled" : ""}> - </button>
          <span class="qualtity" data-index="${index}">${item.qualtity}</span>
          <button class="increase" data-index="${index}"> + </button>
          <button class="delete" data-index="${index}"> X </button>
        </li> 
      `;

    }).join('');

    buttonEl.disabled = !inputEl.value;

  };


  function disableButtonIfNoInput() {
        inputEl.addEventListener('input', () => {
            buttonEl.disabled = !inputEl.value;
        });
    }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      const newItem = {
        name: inputEl.value,
        qualtity: 0
      };
      items.push(newItem);
      inputEl.value = '';
      render(items);
    });
  }

  function addItemList() {
    inputEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('item')) {
        return;
      }
      render(items);
    });
  }



  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => {
      
      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index; 
      items.splice(index, 1); 
      render(items);
    });
  }

  function addAbilityToUpdateQualtity() {

    listEl.addEventListener('click', (e) => { 

      const index = e.target.dataset.index;

      if(e.target.classList.contains('increase')) {
        items[index].qualtity ++;
      }
      
      if(e.target.classList.contains('decrease')) {
        items[index].qualtity --;
      }

      render(items);
    });
  }


})();