const items = [];
const form = document.getElementById('form');

const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');

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

}

closeBtn.addEventListener('click', closeForm)
submitBtn.addEventListener('click', saveItemData);