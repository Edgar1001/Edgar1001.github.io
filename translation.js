// Function to set the language dynamically based on JSON files
function setLanguage(language) {
    fetch(`./languages/${language}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll("[data-translate]").forEach(element => {
                const key = element.getAttribute("data-translate");
                if (data[key]) {
                    element.textContent = data[key];
                }
            });
        })
        .catch(error => console.error("Error loading language file:", error));
}
