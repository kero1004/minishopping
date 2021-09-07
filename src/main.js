
//Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector(".items");
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumnail">
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function setEventListener(items) {
    const logo = document.querySelector(".logo");
    const buttons = document.querySelector(".buttons");   //이벤트위임 컨테이너에 이벤트리스너를 등록
    logo.addEventListener("click", () => displayItems(items));
    buttons.addEventListener("click", event => onButtonClick(event, items));
}

function onButtonClick(event, items) {

    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    //const filtered = items.filter(item => item[key] === value);

    displayItems(items.filter(item => item[key] === value));

    //updateItems(items, key, value);
}

// function updateItems(items, key, value) {
//     items.forEach(item => {
//         if (item.dataset[key] === value) {
//             item.classList.remove("invisible");
//         } else {
//             item.classList.add("invisible");
//         }
//     })
// }

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListener(items)
    })
    .catch(console.log);