const asideElement = document.getElementById('aside');
const displayFormBtn = document.querySelector('#menu button');

const expandTitleBtn = document.getElementsByClassName('expand');
const removeElementBtn = document.getElementsByClassName('delete');
const collapseContent = document.getElementsByClassName('collapse-content');

function expandTitle(event) {
    const selectedButton = event.target;
    const selectedElement =
      selectedButton.parentElement.parentElement.parentElement;

    selectedElement.classList.toggle('active')
    selectedButton.classList.toggle('activeIcon')
};

function removeElement(event) {
    const selectedButton = event.target;
    const selectedElement =
      selectedButton.parentElement.parentElement.parentElement;

    selectedElement.remove();
};

function displayForm() {
  asideElement.style.display = 'block';
};

function addEventListeners () {
for ( const button of expandTitleBtn) {
    button.addEventListener('click', expandTitle)
}
for (const button of removeElementBtn) {
    button.addEventListener('click', removeElement)
};
};

addEventListeners();
displayFormBtn.addEventListener('click', displayForm)