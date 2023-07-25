var list = document.getElementById("list");
var awal = list.innerHTML;
var query = document.getElementById("search-input");

var allpost;
query.onfocus = function fetchpost() {
    fetch("/index.json")
        .then((response) => response.json())
        .then((data) => {
            allpost = data;
        });
};

query.oninput = function searchpost() {
    list.innerHTML = "";
    for (const artikel of allpost) {
        if (
            artikel.title
                .toLowerCase()
                .includes(query.value.toLowerCase().trim())
        ) {
            list.innerHTML += `
            <article class="list">
                <a href="${artikel.url}">
                    <h2 class="list-title">${artikel.title}</h2>
                    <time>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>${artikel.date}</p>
                    </time>
                    <p>${artikel.description}</p>
                </a>
            </article>`;
        }
    }
    if (!list.innerHTML) {
        list.innerHTML = `<p style="font-size: large;font-weight: 600;">Sorry nothing article matched with "${query.value}"</p>`;
    }
};

query.onblur = function () {
    if (!query.value.trim()) {
        list.innerHTML = awal;
    }
};
