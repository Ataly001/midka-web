document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("est-form");
    const water = document.getElementById("est-water");
    const quantityInput = document.getElementById("qty");
    const error = document.getElementById("est-error");
    const result = document.getElementById("total");
    const prices = { silver: 500, blue: 600 };

    function calculateTotal(price, quantity) {
        return price * quantity;
    }

    function clearEstimate() {
        result.textContent = "";
        error.textContent = "";
        quantityInput.classList.remove("error");
        quantityInput.removeAttribute("aria-invalid");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearEstimate();
        const quantity = Number(quantityInput.value);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1000) {
            error.textContent = "Enter a whole number from 1 to 1000.";
            quantityInput.classList.add("error");
            quantityInput.setAttribute("aria-invalid", "true");
            quantityInput.focus();
            return;
        }
        const price = prices[water.value];
        if (price === undefined) {
            error.textContent = "Choose a listed water type.";
            return;
        }
        const total = calculateTotal(price, quantity);
        result.textContent = quantity + " bottle(s) × " + price + " KZT = " + total.toLocaleString("en-US") + " KZT. Estimated total.";
    });
    quantityInput.addEventListener("input", clearEstimate);
    water.addEventListener("change", clearEstimate);
});
