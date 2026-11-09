document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("msg-form");
    const fields = ["name6", "email6", "topic6", "message6"];
    const status = document.getElementById("form-status");

    function getFieldError(id) {
        const value = document.getElementById(id).value.trim();
        if (value === "") {
            return "Please complete this field.";
        }
        if (id === "name6" && (value.length < 2 || value.length > 60)) {
            return "Name must contain 2 to 60 characters.";
        }
        if (id === "email6" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Enter a valid email, for example name@example.com.";
        }
        if (id === "topic6" && !["products", "business", "feedback"].includes(value)) {
            return "Choose one of the listed topics.";
        }
        if (id === "message6" && (value.length < 10 || value.length > 1000)) {
            return "Message must contain 10 to 1000 characters.";
        }
        return "";
    }

    function validateField(id) {
        const error = getFieldError(id);
        document.getElementById(id + "-error").textContent = error;
        const field = document.getElementById(id);
        field.classList.toggle("error", error !== "");
        field.setAttribute("aria-invalid", String(error !== ""));
        return error === "";
    }

    fields.forEach(function (id) {
        document.getElementById(id).addEventListener("input", function () {
            status.textContent = "";
            status.classList.remove("success");
            if (this.classList.contains("error")) {
                validateField(id);
            }
        });
    });
    const message = document.getElementById("message6");
    message.addEventListener("input", function () {
        document.getElementById("msg-count").textContent = message.value.length + " / 1000 characters";
    });
    form.addEventListener("reset", function () {
        fields.forEach(function (id) {
            document.getElementById(id + "-error").textContent = "";
            document.getElementById(id).classList.remove("error");
            document.getElementById(id).removeAttribute("aria-invalid");
        });
        document.getElementById("msg-count").textContent = "0 / 1000 characters";
        status.textContent = "";
        status.classList.remove("success");
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let firstInvalid = null;
        for (let i = 0; i < fields.length; i++) {
            const valid = validateField(fields[i]);
            if (!valid && firstInvalid === null) {
                firstInvalid = document.getElementById(fields[i]);
            }
        }
        status.classList.remove("success");
        if (firstInvalid !== null) {
            status.textContent = "Please correct the highlighted fields.";
            firstInvalid.focus();
            return;
        }
        form.reset();
        status.classList.add("success");
        status.textContent = "Your details are valid.";
    });
});
