document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("pick-form");
    const bubbles = document.getElementById("bubbles");
    const purpose = document.getElementById("purpose");
    const error = document.getElementById("pick-error");
    const result = document.getElementById("pick-result");

    function getRecommendation(waterType, useType) {
        let title = "Compare BLUE and SILVER";
        let text = "BLUE is sparkling and SILVER is still. Compare both options.";
        if (waterType === "sparkling") {
            title = "NEOS BLUE";
            text = "BLUE matches your preference for sparkling water.";
        } else if (waterType === "still") {
            title = "NEOS SILVER";
            text = "SILVER matches your preference for still water.";
        }
        let link = "products.html";
        let linkText = "See products";
        if (useType === "business") {
            text += " You can calculate a cost estimate on our Business page.";
            link = "business.html";
            linkText = "See business options";
        } else {
            text += " Explore the collection on our Products page.";
        }
        return { title: title, text: text, link: link, linkText: linkText };
    }

    function clearRecommendation() {
        result.hidden = true;
        error.textContent = "";
        bubbles.classList.remove("error");
        bubbles.removeAttribute("aria-invalid");
        purpose.classList.remove("error");
        purpose.removeAttribute("aria-invalid");
    }

    function showRecommendation(recommendation) {
        document.getElementById("rec-title").textContent = recommendation.title;
        document.getElementById("rec-text").textContent = recommendation.text;
        const link = document.getElementById("rec-link");
        link.href = recommendation.link;
        link.textContent = recommendation.linkText;
        result.hidden = false;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearRecommendation();
        const validWater = ["sparkling", "still", "either"].includes(bubbles.value);
        const validPurpose = ["daily", "business"].includes(purpose.value);
        bubbles.classList.toggle("error", !validWater);
        bubbles.setAttribute("aria-invalid", String(!validWater));
        purpose.classList.toggle("error", !validPurpose);
        purpose.setAttribute("aria-invalid", String(!validPurpose));
        if (!validWater || !validPurpose) {
            error.textContent = "Please choose both a water preference and a purpose.";
            if (!validWater) {
                bubbles.focus();
            } else {
                purpose.focus();
            }
            return;
        }
        showRecommendation(getRecommendation(bubbles.value, purpose.value));
    });
    bubbles.addEventListener("change", clearRecommendation);
    purpose.addEventListener("change", clearRecommendation);
    form.addEventListener("reset", clearRecommendation);
});
