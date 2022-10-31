function saveItemData(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const enteredTitle = formData.get('title').trim();
  const enteredItem = formData.get('note').trim();
  const isUrgent = formData.get('urgent');
  const itemId = items.length + 1;

  if (!enteredTitle || enteredTitle.length === 0) {
    errorSpanElement.style.display = 'block';
    return;
  }

  items.push({
    title: enteredTitle,
    note: enteredItem,
    isUrgent: isUrgent,
    Id: itemId,
  });

  asideElement.style.display = 'none';
  errorSpanElement.style.display = 'none';

  createNewItem();
}

function getLastItem() {
  const [lastItem] = items.slice(-1);
  return lastItem;
}

function createNewItem() {
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
  iconsDiv.classList.add('icons');
  highPrioritySpan.classList.add('material-symbols-outlined', 'high-priority');
  // deleteSpan.classList.add('material-symbols-outlined', 'delete');
  checkboxItem.classList.add('material-symbols-outlined', 'checkbox');
  expandSpan.classList.add('material-symbols-outlined', 'expand');
  collapseContentDiv.classList.add('collapse-content');

  // deleteSpan.innerText = 'delete';
  expandSpan.innerText = 'expand_more';
  highPrioritySpan.innerText = 'priority_high';
  const newItemData = getLastItem();
  collapseTitleDiv.innerText = newItemData.title;
  collapseContentDiv.innerText = newItemData.note;
  listItem.dataset.id = newItemData.Id;

  if (newItemData.isUrgent) {
    iconsDiv.appendChild(highPrioritySpan);
  }
  // iconsDiv.appendChild(deleteSpan);
  iconsDiv.appendChild(checkboxItem);
  iconsDiv.appendChild(expandSpan);
  listItem.appendChild(collapseTitleDiv);
  collapseTitleDiv.appendChild(iconsDiv);
  listItem.appendChild(collapseContentDiv);

  if (!newItemData.isUrgent) {
    nonUrgentTasksList.appendChild(listItem);
  } else {
    urgentTasksList.appendChild(listItem);
  }
  addEventListeners();
}

function addEventListeners() {
  for (const button of expandTitleBtn) {
    button.addEventListener('click', expandTitle);
  }
  for (const button of removeElementBtn) {
    button.addEventListener('click', removeElement);
  }
  for (const checkbox of taskCheckboxItems) {
    checkbox.addEventListener('input', assignToList);
  }
}

function expandTitle(event) {
  const selectedButton = event.target;
  const selectedElement =
    selectedButton.parentElement.parentElement.parentElement;

  selectedElement.classList.toggle('active');
  selectedButton.classList.toggle('activeIcon');
}

function assignToList(event) {
  const selectedElement =
    event.target.parentElement.parentElement.parentElement;
  const selectedElementId = selectedElement.dataset.id;
  const selectedElementData = items[selectedElementId - 1];

  if (!doneTasksList.contains(selectedElement)) {
    doneTasksList.appendChild(selectedElement);
  } else if (
    doneTasksList.contains(selectedElement) &&
    selectedElementData.isUrgent
  ) {
    urgentTasksList.appendChild(selectedElement);
  } else if (
    doneTasksList.contains(selectedElement) &&
    !selectedElementData.isUrgent
  ) {
    nonUrgentTasksList.appendChild(selectedElement);
  } else {
    console.log('Error!');
  }
}

function removeElement(event) {
  const selectedButton = event.target;
  const selectedElement =
    selectedButton.parentElement.parentElement.parentElement;

  selectedElement.remove();
}