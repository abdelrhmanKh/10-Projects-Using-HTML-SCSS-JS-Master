
const mealContainerDiv = document.getElementById('mealContainer')
const favoriteContainer = document.getElementById('favoriteContainer')
const searchBtn = document.getElementById("search");
const searchTerm = document.getElementById("term");

const mealInfoEl = document.getElementById("meal-info");
const mealPopup = document.getElementById("meal-popup");
const popupCloseBtn = document.getElementById("close-popup");


function getMealId(mealId) {
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId)
        .then(res => res.json())
        .then(data => addMealFav(data.meals[0]))
}
async function getMealsearch(searchTerm) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm)
    const resData = await res.json()
    const meals = resData.meals;

    return meals;


}
async function getMealrandom() {
    await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // clear
            mealContainerDiv.innerHTML = '';
            return addMeal(data.meals[0], true)
        })
}
getMealrandom()
fetchFavMeals()

function addMeal(mealData, random = false) {
    // creat new meal
    const meal = document.createElement("div")
    meal.classList.add("meal");
    meal.innerHTML = `
            <div class="meal-header" id="img${mealData.idMeal}">
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                ${random ? `<span>
                    Random meal
                </span>`: ""
        }
                
            </div>
        <div class="meal-body">
            <p>${mealData.strMeal}</p>
            <button  id="${mealData.idMeal}"><i class="fa-solid fa-heart"></i></button>
        </div>
        `
    mealContainerDiv.appendChild(meal)
    const mealEl = document.getElementById(`img${mealData.idMeal}`)
    mealEl.addEventListener("click", () => {
        showMealInfo(mealData)
    })
    const btn = document.getElementById(mealData.idMeal)
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("fav")) {
            addFav(mealData)
            btn.classList.add("fav")
        } else {
            removefav(mealData)
            btn.classList.remove("fav")
        }

    })

}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));

    return mealIds === null ? [] : mealIds;
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds",
        JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function addFav(mealData) {

    addMealLS(mealData.idMeal)
    fetchFavMeals()
}

function removefav(mealData) {
    const btn = document.getElementById(mealData.idMeal)
    console.log(btn)
    if (btn) { btn.classList.remove("fav") }
    removeMealLS(mealData.idMeal)
    fetchFavMeals()
}

async function fetchFavMeals() {
    // clean the container
    favoriteContainer.innerHTML = "";

    const mealIds = getMealsLS();
    console.log(mealIds)

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealId(mealId);
    }
}





function addMealFav(mealData) {
    console.log(mealData)
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
            id="fav${mealData.idMeal}""
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener("click", () => {
        removefav(mealData)
    });
    const favInfo = favMeal.querySelector(`#fav${mealData.idMeal}`)
    favInfo.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
}


function showMealInfo(mealData) {
    // clean it up
    mealInfoEl.innerHTML = "";

    // update the Meal info
    const mealEl = document.createElement("div");

    const ingredients = [];

    // get ingredients and measures
    for (let i = 1; i <= 20; i++) {
        if (mealData["strIngredient" + i]) {
            ingredients.push(
                `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]
                }`
            );
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        />
        <p>
        ${mealData.strInstructions}
        </p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
            .map(
                (ing) => `
            <li>${ing}</li>
            `
            )
            .join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
    // clean container
    mealContainer.innerHTML = "";

    const search = searchTerm.value;
    const meals = await getMealsearch(search);
    console.log(meals)
    if (meals) {
        meals.forEach((meal) => {
            addMeal(meal);
        });
    }
});

popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});