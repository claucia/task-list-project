let itemNameInput = document.getElementById("item-name-input");
let addItemButton = document.getElementById("add-item-button");
let shoppingListItems = document.getElementById("shopping-list-items");
const itemsLocalStorageKey = "items";

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", addItemsFromLocalStorage);
  //Add item after keypress
  itemNameInput.addEventListener("keypress", addItemAfterKeypress);
  //Add item after click
  addItemButton.addEventListener("click", addItemAfterClick);
}

// Add Item from input value
function addItemFromInputValue() {
  addItem(itemNameInput.value);
  storeItemInLocalStorage(itemNameInput.value);
  itemNameInput.value = "";
  itemNameInput.focus();
}

// Add Item to the DOM
function addItem(itemName) {
  const wrapper = createDivWrapper(itemName);
  const checkbox = createCheckbox();
  const divItem = createListItem(itemName);
  const button = createDeleteButton();

  wrapper.append(checkbox, divItem, button);
  shoppingListItems.append(wrapper);
}

// Create div wrapper
function createDivWrapper(itemName) {
  const div = document.createElement("div");
  div.className = "item-wrapper";
  div.dataset.item = itemName;
  return div;
}

// Create checkbox
function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.addEventListener("change", completeTask);
  return checkbox;
}

// Create div item
function createListItem(content) {
  const div = document.createElement("div");
  div.className = "items";
  div.appendChild(document.createTextNode(content));
  return div;
}

// Create delete button
function createDeleteButton() {
  const button = document.createElement("button");
  button.className = "delete-button fas fa-trash-alt";
  button.addEventListener("click", deleteItem);
  return button;
}

// Add item after click
function addItemAfterClick() {
  if (itemNameInput.value.length > 0) {
    addItemFromInputValue();
  }
}

// Add item after keypress
function addItemAfterKeypress(event) {
  if (itemNameInput.value.length > 0 && event.keyCode === 13) {
    addItemFromInputValue();
  }
}

// Check box after change
function completeTask(event) {
  const checkbox = event.target;
  const li = event.target.nextElementSibling;

  if (checkbox.checked) {
    console.log("checked");
    li.style = "text-decoration: line-through; text-decoration-color: #e7008a";
  } else {
    li.style = "text-decoration: none";
  }
}

// Delete item after click delete button
function deleteItem(event) {
  event.target.parentElement.remove();
  removeItemFromLocalStorage(event.target.parentElement.dataset.item);
  //dataset - adds a data attribute to the DOM element
  //In this case dataset.item stores item name so it can be easily retrieved when deleting
}

// Obtain items from the Local Storage
function readItemsFromLocalStorage() {
  let items = localStorage.getItem(itemsLocalStorageKey);
  if (items === null) {
    return [];
  } else {
    //localStorage can only store string, so we need JSON.parse whem comes out
    return JSON.parse(items);
  }
}

// Write Items to Local Storage
function writeItemsToLocalStorage(items) {
  //It has to be store as a string so wrap "items" into JSON.stringify
  localStorage.setItem(itemsLocalStorageKey, JSON.stringify(items));
}

// Store Item in Local Storage
function storeItemInLocalStorage(item) {
  // vai pegar o retorno e vai atribuir a essa variável.

  let items = readItemsFromLocalStorage();
  //Adding the item to the array items
  items.push(item);

  //Set to Local Storage
  writeItemsToLocalStorage(items);
}

// Add item from Local Storage do the UI
function addItemsFromLocalStorage() {
  let items = readItemsFromLocalStorage();

  items.forEach(function (item) {
    addItem(item);
  });
}

// Remove item from Local Storage

function removeItemFromLocalStorage(itemName) {
  let items = readItemsFromLocalStorage();
  items.forEach(function (element, index) {
    if (itemName === element) {
      items.splice(index, 1);
    }
  });

  writeItemsToLocalStorage(items);
}
