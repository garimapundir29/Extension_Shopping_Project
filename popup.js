document.addEventListener("DOMContentLoaded", function () {
  const itemInput = document.getElementById("itemInput");
  const addItemBtn = document.getElementById("addItemBtn");
  const shoppingList = document.getElementById("shoppingList");

  // Load items from storage when the popup is opened
  chrome.storage.sync.get("items", function (data) {
    const items = data.items || [];
    updateShoppingList(items);
  });

  addItemBtn.addEventListener("click", function () {
    const newItem = itemInput.value.trim();
    if (newItem !== "") {
      // Get the current items from storage
      chrome.storage.sync.get("items", function (data) {
        const items = data.items || [];
        items.push(newItem);

        // Save the updated items to storage
        chrome.storage.sync.set({ items: items }, function () {
          updateShoppingList(items);
        });
      });

      itemInput.value = "";
    }
  });

  function updateShoppingList(items) {
    shoppingList.innerHTML = "";
    items.forEach(function (item, index) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      listItem.classList.add("shoppingListItem"); // Add the shoppingListItem class

      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("deleteButton"); // Add the class "deleteButton" to the button

      deleteButton.addEventListener("click", function () {
       deleteItem(index);
      });

      listItem.appendChild(deleteButton);
      shoppingList.appendChild(listItem);
    });
  }
 


  // Function to delete a specific item from the shopping list
  function deleteItem(index) {
    // Get the current items from storage
    chrome.storage.sync.get("items", function (data) {
      const items = data.items || [];

      // Remove the item from the array using the index
      items.splice(index, 1);

      // Save the updated items to storage
      chrome.storage.sync.set({ items: items }, function () {
        updateShoppingList(items);
      });
    });
  }
});
