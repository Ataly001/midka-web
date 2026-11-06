const themePage = document.documentElement;
let useThemeLinks = location.protocol === "file:";
const themeButton = document.createElement("button");

themeButton.type = "button";
themeButton.className = "btn btn-sm btn-outline-dark theme-btn";
themeButton.setAttribute("aria-label", "Dark mode");
document.querySelector(".menu").appendChild(themeButton);

function setTheme(dark) {
    themePage.classList.toggle("dark-mode", dark);
    themeButton.textContent = dark ? "Light mode" : "Dark mode";
    themeButton.setAttribute("aria-pressed", String(dark));
}

function syncTheme() {
    if (useThemeLinks) {
        const theme = new URL(location.href).searchParams.get("theme");
        if (theme !== null) {
            setTheme(theme === "dark");
        } else {
            setTheme(themePage.classList.contains("dark-mode"));
        }
        return;
    }
    try {
        setTheme(localStorage.getItem("neos-theme") === "dark");
    } catch {
        useThemeLinks = true;
        syncTheme();
    }
}

const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".menu ul a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
    }
});

syncTheme();
window.addEventListener("pageshow", syncTheme);
window.addEventListener("storage", function (event) {
    if (event.key === "neos-theme" || event.key === null) {
        syncTheme();
    }
});

themeButton.addEventListener("click", function () {
    const dark = !themePage.classList.contains("dark-mode");
    setTheme(dark);

    try {
        localStorage.setItem("neos-theme", dark ? "dark" : "light");
    } catch {
        useThemeLinks = true;
    }

    if (useThemeLinks) {
        const page = new URL(location.href);
        page.searchParams.set("theme", dark ? "dark" : "light");
        try {
            history.replaceState(null, "", page);
        } catch {
            return;
        }
    }
});

document.addEventListener("click", function (event) {
    if (!useThemeLinks) return;

    const link = event.target.closest("a[href]");
    if (!link) return;

    const target = new URL(link.href);
    if (target.protocol !== location.protocol || target.host !== location.host ||
        new URL(".", target).href !== new URL(".", location.href).href ||
        !target.pathname.endsWith(".html")) return;

    target.searchParams.set("theme", themePage.classList.contains("dark-mode") ? "dark" : "light");
    link.href = target.href;
});
