// 2) This js file links to the index.html file in the wwwroot folder
const uri = 'api/TodoItems';
let todos = []; //submit to-do items through this command

// Let's go and get some items, feeding the fetch command through JSON
function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

// Here's the Create function of our CRUD referenced in index.html:
function addItem() {
    const addNameTextbox = document.getElementById('add-name'); //links to index.html cmd

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    // Now, here's the Read function of our CRUD
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item) //Come back to translate what this does
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

// Here's the Delete function of our CRUD referenced in index.html:
function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

// Form to use Update function of our CRUD:
function displayEditForm(id) {
    const item = todos.find(item => item.id === id); //3 === ? That's new.

    document.getElementById('edit-name').value = item.name; //index.html cmd
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete; //bool
    document.getElementById('editForm').style.display = 'block'; //type of form
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10), // converting string number => int for ID
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT', //Here's our RESTful command; go talk to JSON to complete */
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false; //close input and stop update if update error pops up
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayItems(data) {
    const tBody = document.getElementById('todos'); //ref to <body> in index.html
    tBody.innerHTML = '';

    _displayCount(data.Length);

    const button = document.createElement('button'); // create the button maker

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete; // checked = complete item

        let editButton = button.cloneNode(false); //create the Edit button
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', 'deleteItem(${item.id})');

        let deleteButton = button.cloneNode(false); // create the Delete button
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', 'deleteItem(${item.id})');

        // Final segments: insert row, 4 cells for each to-do item
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox); // cell 0: checkbox

        let td2 = tr.insertCell(1); // cell 1: to-do item
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode); //extends <T> textNode

        let td3 = tr.insertCell(2); // cell 2: edit to-do item
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3) // cell 3: delete to-do item
        td4.appendChild(deleteButton);
    });

    todos = data; //ties back to the todos command on Line 3 in this file
}