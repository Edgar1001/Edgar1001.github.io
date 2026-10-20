// Function to set the language dynamically based on JSON files
function setLanguage(language) {
    fetch(`./languages/${language}.json?v=4`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll("[data-translate]").forEach(element => {
                const key = element.getAttribute("data-translate");
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
            document.querySelectorAll("[data-translate-alt]").forEach(element => {
                const key = element.getAttribute("data-translate-alt");
                if (data[key]) {
                    element.alt = data[key];
                }
            });
            document.querySelectorAll("[data-translate-aria-label]").forEach(element => {
                const key = element.getAttribute("data-translate-aria-label");
                if (data[key]) {
                    element.setAttribute("aria-label", data[key]);
                }
            });
            document.documentElement.lang = language;
        })
        .catch(error => console.error("Error loading language file:", error));
}
