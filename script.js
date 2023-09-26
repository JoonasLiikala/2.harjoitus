document.addEventListener("DOMContentLoaded", getRandomCocktail);

function getRandomCocktail() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const cocktail = data.drinks[0];
            displayCocktail(cocktail);
        })
        .catch(error => console.error("Error fetching random cocktail:", error));
}

function displayCocktail(cocktail) {
    const cocktailDisplay = document.getElementById("cocktail-display");
    cocktailDisplay.innerHTML = `
        <h3>${cocktail.strDrink}</h3>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        <div class="recipe-details">
            <p><strong>Category:</strong> ${cocktail.strCategory}</p>
            <p><strong>Glass:</strong> ${cocktail.strGlass}</p>
            <p><strong>Instructions:</strong> ${cocktail.strInstructions}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                ${listIngredients(cocktail)}
            </ul>
        </div>
    `;
}

function listIngredients(cocktail) {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    return ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");
}

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;
    searchCocktail(searchInput);
});

function searchCocktail(searchQuery) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            const cocktails = data.drinks;
            if (cocktails) {
                const cocktail = cocktails[0]; 
                displayCocktail(cocktail);
            } else {
                displayNotFound();
            }
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            displayNotFound();
        });
}

function displayNotFound() {
    const cocktailDisplay = document.getElementById("cocktail-display");
    cocktailDisplay.innerHTML = "<p>No results found</p>";
}
