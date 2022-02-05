const form = document.forms.search;

input.value = 'Search Here';

function search(event) {
    alert(`You Searched for: ${input.value}`);
    event.preventDefault();
}