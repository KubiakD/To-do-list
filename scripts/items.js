const items = [];
const form = document.getElementById('form');

const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const itemsList = document.getElementById('accordion');

function closeForm() {
    asideElement.style.display = 'none';
};

function saveItemData (event) {    
event.preventDefault();

const formData = new FormData(form);

const enteredTitle = formData.get('title').trim();
const enteredItem = formData.get('note').trim();
const IsUrgent = formData.get('urgent');

items.push({
    title: enteredTitle,
    note: enteredItem,
    IsUrgent: IsUrgent
});

closeForm();
createNewItem();
};

function getLastItem () {
    const [lastItem] = items.slice(-1);
    return lastItem
}

function createNewItem () {
    const listItem = document.createElement('li');
    const collapseTitleDiv = document.createElement('div');
    const iconsDiv = document.createElement('div');
    const deleteSpan = document.createElement('span');
    const expandSpan = document.createElement('span');
    const collapseContentDiv = document.createElement('div');

    collapseTitleDiv.classList.add('collapse-title');
    iconsDiv.classList.add('icons')
    deleteSpan.classList.add('material-symbols-outlined', 'delete');
    expandSpan.classList.add('material-symbols-outlined', 'expand');
    collapseContentDiv.classList.add('collapse-content');

    deleteSpan.innerText = 'delete';
    expandSpan.innerText = 'expand_more';
    const newItemData = getLastItem()
    collapseTitleDiv.innerText = newItemData.title;
    collapseContentDiv.innerText = newItemData.note;

    iconsDiv.appendChild(deleteSpan);
    iconsDiv.appendChild(expandSpan);
    listItem.appendChild(collapseTitleDiv);
    collapseTitleDiv.appendChild(iconsDiv);
    listItem.appendChild(collapseContentDiv)


    itemsList.appendChild(listItem);
    addEventListeners();
};

closeBtn.addEventListener('click', closeForm)
submitBtn.addEventListener('click', saveItemData);