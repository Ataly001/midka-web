document.addEventListener("DOMContentLoaded", function () {
    const key = "neos-favorites";
    const list = document.getElementById("fav-list");
    const status = document.getElementById("fav-status");
    const clearButton = document.getElementById("fav-clear");
    const names = ["NEOS BLUE", "NEOS SILVER"];
    const only = document.getElementById("fav-only");
    const catalog = document.getElementById("prod-list");
    const catalogCount = document.getElementById("prod-count");
    const count = document.getElementById("fav-count");
    let favorites = readFavorites();

    function filterCatalog() {
        let visible = 0;
        for (const card of catalog.children) {
            card.hidden = only.checked && !favorites.includes(card.dataset.productName);
            if (!card.hidden) {
                visible++;
            }
        }
        if (only.checked) {
            catalogCount.textContent = visible
                ? visible + " matching favorite(s)."
                : "No favorites match your current filters.";
        } else {
            catalogCount.textContent = visible
                ? visible + " product(s) found."
                : "No products found. Try another search or reset the filters.";
        }
    }

    document.getElementById("prod-reset").addEventListener("click", function () {
        only.checked = false;
        filterCatalog();
    });
    only.addEventListener("change", filterCatalog);
    catalog.addEventListener("products-rendered", filterCatalog);

    function readFavorites() {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            if (Array.isArray(data)) {
                return names.filter(function (name) {
                    return data.includes(name);
                });
            }
        } catch {
            status.textContent = "Saved favorites could not be read.";
        }
        return [];
    }

    function saveFavorites(next, message) {
        try {
            if (next.length === 0) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(next));
            }
        } catch {
            status.textContent = "Favorites could not be saved in this browser.";
            return;
        }

        favorites = next;
        renderFavorites();
        status.textContent = message;
    }

    function renderFavorites() {
        list.textContent = "";

        for (const name of names) {
            const row = document.createElement("li");
            row.className = "fav-card";
            const label = document.createElement("h3");
            label.textContent = name;
            const button = document.createElement("button");
            button.type = "button";
            button.className = "btn btn-outline-dark";
            const saved = favorites.includes(name);
            button.textContent = saved ? "Remove favorite" : "Save favorite";
            button.setAttribute("aria-label", button.textContent + " " + name);
            button.addEventListener("click", function () {
                const next = saved
                    ? favorites.filter(function (item) { return item !== name; })
                    : [...favorites, name];
                saveFavorites(next, name + (saved ? " removed." : " saved."));
            });
            row.appendChild(label);
            row.appendChild(button);
            list.appendChild(row);
        }

        count.textContent = favorites.length + " of " + names.length + " products saved";
        clearButton.disabled = favorites.length === 0;
        filterCatalog();
    }

    clearButton.addEventListener("click", function () {
        saveFavorites([], "Favorites cleared.");
    });

    renderFavorites();
});
