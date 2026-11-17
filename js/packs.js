class BottlePack {
    constructor(name, bottlesPerPack, litersPerBottle) {
        this.name = name;
        this.bottlesPerPack = bottlesPerPack;
        this.litersPerBottle = litersPerBottle;
    }

    bottleCount(packCount) {
        return this.bottlesPerPack * packCount;
    }

    waterVolume(packCount) {
        return this.bottleCount(packCount) * this.litersPerBottle;
    }
}

const packs = [
    new BottlePack("Small pack", 6, 0.5),
    new BottlePack("Large pack", 12, 0.5)
];
const packForm = document.getElementById("pack-form");
const packCount = document.getElementById("pack-count");
const packList = document.getElementById("pack-list");
const packStatus = document.getElementById("pack-status");

function renderPacks(quantity) {
    packList.textContent = "";

    for (const pack of packs) {
        const row = document.createElement("li");
        row.className = "pack-card";
        const title = document.createElement("h3");
        title.textContent = pack.name;
        const size = document.createElement("p");
        size.textContent = pack.bottlesPerPack + " bottles per pack";
        const total = document.createElement("strong");
        total.textContent = pack.bottleCount(quantity) + " bottles · " + pack.waterVolume(quantity) + " L";
        row.append(title, size, total);
        packList.appendChild(row);
    }
}

packForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const quantity = Number(packCount.value);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        packList.textContent = "";
        packStatus.textContent = "Enter a whole number from 1 to 100.";
        packCount.focus();
        return;
    }

    renderPacks(quantity);
    packStatus.textContent = "Comparison for " + quantity + " pack(s).";
});

renderPacks(Number(packCount.value));
