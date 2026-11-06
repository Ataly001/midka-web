document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "NEOS BLUE", type: "sparkling", image: "images/blue3.jpg", description: "Sparkling artesian water with the blue NEOS label." },
        { id: 2, name: "NEOS SILVER", type: "still", image: "images/silver3.jpg", description: "Still artesian water with the silver NEOS label." }
    ];
    const productList = document.getElementById("prod-list");
    const productCount = document.getElementById("prod-count");

    function createProductCard(product) {
        const article = document.createElement("article");
        article.className = "col-md-6";
        const figure = document.createElement("figure");
        figure.className = "card3";
        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name + " " + product.type + " water";
        const badge = document.createElement("span");
        badge.className = product.type === "sparkling" ? "mark3 blue3" : "mark3 silver3";
        badge.textContent = product.type.toUpperCase();
        figure.appendChild(image);
        figure.appendChild(badge);
        const heading = document.createElement("h2");
        heading.textContent = product.name;
        const description = document.createElement("p");
        description.textContent = product.description;
        const link = document.createElement("a");
        link.href = "quality.html";
        link.className = "btn btn-dark";
        link.textContent = "Learn more";
        article.appendChild(figure);
        article.appendChild(heading);
        article.appendChild(description);
        article.appendChild(link);
        return article;
    }

    function renderProducts(items) {
        productList.textContent = "";
        for (const product of items) {
            productList.appendChild(createProductCard(product));
        }
        productCount.textContent = items.length + " product(s) found.";
    }

    renderProducts(products);
});
