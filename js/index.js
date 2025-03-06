//api base url
const baseUrl = "https://www.themealdb.com";

//call the api
async function callApi(url) {
  const response = await fetch(url);

  if (response.status == 200) {
    return await response.json();
  } else {
    return "Request found error";
  }
}

//get food category list
async function getCategoryList() {
  const response = await callApi(baseUrl + "/api/json/v1/1/list.php?c=list");

  const categoryList = document.querySelector(".category-list");

  categoryList.innerHTML = response["meals"]
    .map((category) => {
      //this pork animal is haram for muslim
      return category.strCategory === "Pork"
        ? ""
        : `<span class="badge text-bg-success p-2">${category.strCategory}</span>`;
    })
    .join("");
}

//get food item
async function getFoodItem(foodName = "m") {
  const response = await callApi(
    baseUrl + `/api/json/v1/1/search.php?s=${foodName}`
  );

  const foodItemList = document.querySelector(".foodItem-list");

  console.log(response);

  foodItemList.innerHTML =
    response["meals"] === null
      ? `<p>No Food Found At This Name "${foodName}"`
      : response["meals"]
          .map((food) => {
            return `<div class="card" style="width: 18rem;" onclick="foodDeatials(${
              food.idMeal
            })">
  <img src="${food.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${food.strMeal}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${food.strArea} ${
              food.strCategory
            }</h6>
    <p class="card-text">${food.strInstructions
      .split(" ")
      .slice(0, 30)
      .join(" ")}.....</p>
  </div>
</div>`;
          })
          .join("");
}

//find food item

const srcBtn = document.querySelector(".src-btn");
srcBtn.addEventListener("click", () => {
  const srcInput = document.querySelector(".src-input");
  getFoodItem(srcInput.value);
});

//food details
async function foodDeatials(id) {
  const response = await callApi(baseUrl + `/api/json/v1/1/lookup.php?i=${id}`);
  const favouriteList = document.querySelector(".favourite-list");
  const food = response["meals"][0];
  const card = `<div class="card" style="width: 18rem;">
  <img src="${food.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${food.strMeal}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">${food.strArea} ${food.strCategory}</h6>
    <ul>
        <li>${food.strIngredient1}</li>
        <li>${food.strIngredient2}</li>
        <li>${food.strIngredient3}</li>
        <li>${food.strIngredient4}</li>
        <li>${food.strIngredient5}</li>
    </ul>
  </div>
</div>`;

  favouriteList.innerHTML = card;
}

getCategoryList();
getFoodItem();
