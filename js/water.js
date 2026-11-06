document.addEventListener("DOMContentLoaded", function () {
    const waterOptions = [
        { id: "blue", name: "NEOS BLUE", image: "images/blue3.jpg", description: "Sparkling artesian water with the blue label." },
        { id: "silver", name: "NEOS SILVER", image: "images/silver3.jpg", description: "Still artesian water with the silver label." }
    ];
    const select = document.getElementById("compare");
    const card = document.getElementById("water-card");
    const status = document.getElementById("compare-msg");

    function findWater(id) {
        for (const water of waterOptions) {
            if (water.id === id) {
                return water;
            }
        }
        return null;
    }

    function clearHighlight() {
        waterOptions.forEach(function (water) {
            document.getElementById("compare-" + water.id).classList.remove("chosen");
        });
    }

    function showWater(water) {
        const image = document.getElementById("water-img");
        image.src = water.image;
        image.alt = water.name + ": " + water.description;
        document.getElementById("water-name").textContent = water.name;
        document.getElementById("water-desc").textContent = water.description;
        document.getElementById("compare-" + water.id).classList.add("chosen");
        status.textContent = water.name + " is highlighted in the comparison table.";
        card.hidden = false;
    }

    select.addEventListener("change", function () {
        clearHighlight();
        const water = findWater(select.value);
        if (water === null) {
            card.hidden = true;
            status.textContent = "Both water types are shown in the table.";
            return;
        }
        showWater(water);
    });
});
