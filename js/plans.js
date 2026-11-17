const planKey = "neos-delivery-plans";
const planForm = document.getElementById("plan-form");
const planName = document.getElementById("plan-name");
const planWater = document.getElementById("plan-water");
const planQty = document.getElementById("plan-qty");
const planStatus = document.getElementById("plan-status");
const planList = document.getElementById("plan-list");
const planSave = document.getElementById("plan-save");
const planCancel = document.getElementById("plan-cancel");
const planPrices = { blue: 600, silver: 500 };
let plans = readPlans();
let editingIndex = -1;

function validName(name) {
    return typeof name === "string" && name.trim().length >= 2
        && name.length <= 60 && /\p{L}{2}/u.test(name)
        && /^[\p{L}\p{M}\d .,'’–-]+$/u.test(name);
}

function validPlan(plan) {
    return plan && validName(plan.name)
        && (plan.water === "blue" || plan.water === "silver")
        && Number.isInteger(plan.quantity) && plan.quantity >= 1 && plan.quantity <= 1000;
}

function fieldError(field, message) {
    document.getElementById(field.id + "-error").textContent = message;
    field.classList.toggle("error", message !== "");
    field.setAttribute("aria-invalid", String(message !== ""));
}

function readQuantity() {
    const input = planQty.value.trim();
    if (!/^\d+$/.test(input)) {
        return 0;
    }
    const quantity = Number(input);
    return quantity >= 1 && quantity <= 1000 ? quantity : 0;
}

function updatePreview() {
    const quantity = readQuantity();
    const price = planPrices[planWater.value];
    document.getElementById("plan-preview").textContent = price && quantity
        ? "Estimated cost: " + (quantity * price).toLocaleString("en-US") + " KZT"
        : "";
}

function readPlans() {
    try {
        const data = JSON.parse(localStorage.getItem(planKey));
        return Array.isArray(data) ? data.filter(validPlan) : [];
    } catch {
        planStatus.textContent = "Saved delivery plans could not be read.";
        return [];
    }
}

function savePlans(next) {
    try {
        if (next.length === 0) {
            localStorage.removeItem(planKey);
        } else {
            localStorage.setItem(planKey, JSON.stringify(next));
        }
    } catch {
        planStatus.textContent = "Could not save plans in this browser.";
        return false;
    }

    plans = next;
    renderPlans();
    return true;
}

function resetPlanForm() {
    editingIndex = -1;
    planForm.reset();
    planSave.textContent = "Save plan";
    planCancel.hidden = true;
    for (const field of [planName, planWater, planQty]) {
        fieldError(field, "");
    }
    updatePreview();
}

function startEdit(index) {
    const plan = plans[index];
    resetPlanForm();
    editingIndex = index;
    planName.value = plan.name;
    planWater.value = plan.water;
    planQty.value = String(plan.quantity);
    planSave.textContent = "Save changes";
    planCancel.hidden = false;
    planStatus.textContent = "Editing " + plan.name + ".";
    updatePreview();
    planName.focus();
}

function deletePlan(index) {
    const next = plans.filter(function (plan, position) {
        return position !== index;
    });

    if (savePlans(next)) {
        resetPlanForm();
        planStatus.textContent = "Plan deleted.";
    }
}

function makePlanButton(label, action) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-dark btn-sm me-2";
    button.textContent = label;
    button.addEventListener("click", action);
    return button;
}

function renderPlans() {
    planList.textContent = "";
    document.getElementById("plan-empty").hidden = plans.length > 0;
    plans.forEach(function (plan, index) {
        const row = document.createElement("li");
        row.className = "border rounded p-3 mb-2";
        const details = document.createElement("p");
        details.textContent = plan.name + " — " + plan.quantity + " "
            + plan.water.toUpperCase() + " bottles, "
            + (plan.quantity * planPrices[plan.water]).toLocaleString("en-US") + " KZT";
        row.appendChild(details);
        row.appendChild(makePlanButton("Edit", function () { startEdit(index); }));
        row.appendChild(makePlanButton("Delete", function () { deletePlan(index); }));
        planList.appendChild(row);
    });
    renderOverview();
}

function renderOverview() {
    const counts = { blue: 0, silver: 0 };
    let cost = 0;

    for (const plan of plans) {
        counts[plan.water] += plan.quantity;
        cost += plan.quantity * planPrices[plan.water];
    }

    const total = counts.blue + counts.silver;
    document.getElementById("plan-bars").hidden = total === 0;
    document.getElementById("plan-summary").textContent = plans.length + " plan(s), "
        + total + " bottles, " + cost.toLocaleString("en-US") + " KZT estimated";
    for (const type of ["blue", "silver"]) {
        const bar = document.getElementById(type + "-share");
        bar.max = total || 1;
        bar.value = counts[type];
        document.getElementById(type + "-count").textContent = counts[type] + " of " + total;
    }
}

planForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const plan = {
        name: planName.value.trim(),
        water: planWater.value,
        quantity: readQuantity()
    };

    const nameError = validName(plan.name)
        ? "" : "Enter a name with a word, such as Office 2 (2–60 characters).";
    const waterError = plan.water === "blue" || plan.water === "silver"
        ? "" : "Choose BLUE or SILVER.";
    const qtyError = plan.quantity > 0
        ? "" : "Enter a whole number from 1 to 1000.";

    fieldError(planName, nameError);
    fieldError(planWater, waterError);
    fieldError(planQty, qtyError);

    if (nameError || waterError || qtyError) {
        planStatus.textContent = "Check the highlighted fields.";
        if (nameError) {
            planName.focus();
        } else if (waterError) {
            planWater.focus();
        } else {
            planQty.focus();
        }
        return;
    }

    const next = plans.slice();
    if (editingIndex === -1) {
        next.push(plan);
    } else {
        next[editingIndex] = plan;
    }

    if (savePlans(next)) {
        resetPlanForm();
        planStatus.textContent = "Plan saved.";
    }
});

planCancel.addEventListener("click", function () {
    resetPlanForm();
    planStatus.textContent = "Edit canceled.";
});

renderPlans();

for (const field of [planName, planWater, planQty]) {
    field.addEventListener("input", function () {
        fieldError(field, "");
        planStatus.textContent = "";
        updatePreview();
    });
}
