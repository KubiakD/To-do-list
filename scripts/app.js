const expandTitleBtn = document.getElementsByClassName('expand');
const collapseContent = document.getElementsByClassName('collapse-content');

function expandTitle(event) {
    const selectedTitle = event.target;
    const selectedContent = selectedTitle.parentElement.parentElement.nextElementSibling;

    selectedContent.classList.toggle('active')
}

for ( const button of expandTitleBtn) {
    button.addEventListener('click', expandTitle)
}