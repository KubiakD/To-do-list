// Form elements
const asideElement = document.getElementById('aside');
const displayFormBtn = document.querySelector('#menu button');
const form = document.getElementById('form');
const errorSpanElement = document.getElementById('error');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');

// Task elements
const expandTitleBtn = document.getElementsByClassName('expand');
const removeElementBtn = document.getElementsByClassName('delete');
const titleInput = document.getElementById('title');
const noteInput = document.getElementById('note');
const collapseContent = document.getElementsByClassName('collapse-content');
const taskCheckboxItems = document.getElementsByClassName('task-checkbox');

const items = [];

// Task lists 
const doneTasksList = document.getElementById('done-items');
const urgentTasksList = document.getElementById('urgent-item');
const nonUrgentTasksList = document.getElementById('non-urgent');

function displayForm() {
  asideElement.style.display = 'block';
  titleInput.value = '';
  noteInput.value = '';
}

function closeForm(event) {
  event.preventDefault();
  asideElement.style.display = 'none';
}

displayFormBtn.addEventListener('click', displayForm);
submitBtn.addEventListener('click', saveItemData);
closeBtn.addEventListener('click', closeForm);