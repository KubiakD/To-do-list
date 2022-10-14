const expandTitleBtn = document.getElementsByClassName('expand');
const collapseContent = document.getElementsByClassName('collapse-content');

function expandTitle(event) {
    const selectedButton = event.target;
    const selectedElement =
      selectedButton.parentElement.parentElement.parentElement;

    selectedElement.classList.toggle('active')
}

for ( const button of expandTitleBtn) {
    button.addEventListener('click', expandTitle)
}