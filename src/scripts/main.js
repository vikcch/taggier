import Taggier from './taggier.js';

const taggier = new Taggier('taggier');

const listTagsButton = document.querySelector('#btn-list-tags');
const tagsUl = document.querySelector('#ul-tags');

listTagsButton.addEventListener('click', () => {

    tagsUl.innerHTML = '';

    taggier.tags.forEach(tag => {

        const li = document.createElement('li');
        li.textContent = tag;
        tagsUl.appendChild(li);
    });
});