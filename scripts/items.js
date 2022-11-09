function saveItemData(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const enteredTitle = formData.get('title').trim();
  const enteredItem = formData.get('note').trim();
  const timestamp = new Date();
  const isUrgent = formData.get('urgent');
  const taskId = tasks.length + 1;

  if (!enteredTitle || enteredTitle.length === 0) {
    errorSpanElement.style.display = 'block';
    return;
  }

  const convertedTimestamp = timestamp.toLocaleDateString("pl", {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  tasks.push({
    title: enteredTitle,
    note: enteredItem,
    timestamp: convertedTimestamp,
    isUrgent: isUrgent,
    Id: taskId,
  });

  asideElement.style.display = 'none';
  errorSpanElement.style.display = 'none';

  createNewTask();
}

function getLastTask() {
  const [lastTask] = tasks.slice(-1);
  return lastTask;
}

function createNewTask() {
  const listItem = document.createElement('li');
  const collapseTitleDiv = document.createElement('div');
  const iconsDiv = document.createElement('div');
  const checkboxItem = document.createElement('input');
  const expandSpan = document.createElement('span');
  const highPrioritySpan = document.createElement('span');
  const collapseContentDiv = document.createElement('div');
  const collapseTimestampDiv = document.createElement('div');
  
  checkboxItem.type = 'checkbox';

  collapseTitleDiv.classList.add('collapse-title');
  iconsDiv.classList.add('icons');
  highPrioritySpan.classList.add('material-symbols-outlined', 'high-priority');
  checkboxItem.classList.add('material-symbols-outlined','task-checkbox' ,'checkbox');
  expandSpan.classList.add('material-symbols-outlined', 'expand');
  collapseContentDiv.classList.add('collapse-content');
  collapseTimestampDiv.classList.add('collapse-timestamp');
  
  expandSpan.innerText = 'expand_more';
  highPrioritySpan.innerText = 'priority_high';
  const newTaskData = getLastTask();
  collapseTitleDiv.innerText = newTaskData.title;
  collapseContentDiv.innerText = newTaskData.note;
  collapseTimestampDiv.innerText = `Dodano ${newTaskData.timestamp}`;
  listItem.dataset.id = newTaskData.Id;
  
  if (newTaskData.isUrgent) {
    iconsDiv.appendChild(highPrioritySpan);
  }
  iconsDiv.appendChild(checkboxItem);
  iconsDiv.appendChild(expandSpan);
  listItem.appendChild(collapseTitleDiv);
  collapseTitleDiv.appendChild(iconsDiv);
  listItem.appendChild(collapseContentDiv);
  collapseContentDiv.appendChild(collapseTimestampDiv);
  
  if (!newTaskData.isUrgent) {
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
  const selectedTask =
  selectedButton.parentElement.parentElement.parentElement;
  
  selectedTask.classList.toggle('active');
  selectedButton.classList.toggle('activeIcon');
}

function assignToList(event) {
  const selectedTaskIconDiv = event.target.parentElement;
  const selectedTask = event.target.parentElement.parentElement.parentElement;
  const selectedTaskId = selectedTask.dataset.id;
  const selectedTaskData = tasks[selectedTaskId - 1];
  
  if (!doneTasksList.contains(selectedTask)) {
    addDeleteIcon(selectedTaskIconDiv);
    doneTasksList.appendChild(selectedTask);
  } else if (
    doneTasksList.contains(selectedTask) &&
    selectedTaskData.isUrgent
  ) {
    urgentTasksList.appendChild(selectedTask);
    selectedTaskIconDiv.lastChild.remove();
  } else if (
    doneTasksList.contains(selectedTask) &&
    !selectedTaskData.isUrgent
  ) {
    nonUrgentTasksList.appendChild(selectedTask);
    selectedTaskIconDiv.lastChild.remove();
  } else {
    console.log('Error!');
  };  
}
    
function addDeleteIcon(taskItem) {
  const deleteSpan = document.createElement('span');
      
  deleteSpan.classList.add('material-symbols-outlined', 'delete');
  deleteSpan.innerText = 'delete';
  taskItem.appendChild(deleteSpan);  
  deleteSpan.addEventListener('click', removeTask);
};
    
function removeTask(event) {
  const selectedButton = event.target;
  const selectedTask = selectedButton.parentElement.parentElement.parentElement;    
  selectedTask.remove();
    }