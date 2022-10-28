const items = [];
const form = document.getElementById('form');

const errorSpanElement = document.getElementById('error');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const itemsList = document.getElementById('non-urgent');
const urgentItemsList = document.getElementById('urgent-item');

function closeForm(event) {
    event.preventDefault();
    asideElement.style.display = 'none';
};

function saveItemData (event) {    
event.preventDefault();

const formData = new FormData(form);

const enteredTitle = formData.get('title').trim();
const enteredItem = formData.get('note').trim();
const IsUrgent = formData.get('urgent');

if(!enteredTitle || enteredTitle.length === 0) {
    errorSpanElement.style.display = 'block';
    return
};

items.push({
    title: enteredTitle,
    note: enteredItem,
    IsUrgent: IsUrgent
});

asideElement.style.display = 'none';
errorSpanElement.style.display = 'none';

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
    // const deleteSpan = document.createElement('span');
    const checkboxItem = document.createElement('input');
    const expandSpan = document.createElement('span');
    const highPrioritySpan = document.createElement('span');
    const collapseContentDiv = document.createElement('div');

    checkboxItem.type = 'checkbox';

    collapseTitleDiv.classList.add('collapse-title');
    iconsDiv.classList.add('icons')
    highPrioritySpan.classList.add('material-symbols-outlined', 'high-priority')
    // deleteSpan.classList.add('material-symbols-outlined', 'delete');
    checkboxItem.classList.add('material-symbols-outlined', 'checkbox');
    expandSpan.classList.add('material-symbols-outlined', 'expand');
    collapseContentDiv.classList.add('collapse-content');

    // deleteSpan.innerText = 'delete';
    expandSpan.innerText = 'expand_more';
    highPrioritySpan.innerText = 'priority_high'
    const newItemData = getLastItem();
    collapseTitleDiv.innerText = newItemData.title;
    collapseContentDiv.innerText = newItemData.note;
    
    if(newItemData.IsUrgent) {
    iconsDiv.appendChild(highPrioritySpan);
    };
    // iconsDiv.appendChild(deleteSpan);
    iconsDiv.appendChild(checkboxItem);
    iconsDiv.appendChild(expandSpan);
    listItem.appendChild(collapseTitleDiv);
    collapseTitleDiv.appendChild(iconsDiv);
    listItem.appendChild(collapseContentDiv)

    if(!newItemData.IsUrgent){
        itemsList.appendChild(listItem);
    } else {
        urgentItemsList.appendChild(listItem);
    };
    addEventListeners();
};

closeBtn.addEventListener('click', closeForm)
submitBtn.addEventListener('click', saveItemData);