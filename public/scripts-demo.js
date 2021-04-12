// async pauses windowActions() until the await promise fulfills
// use async function populateRestaurants()?

async function populateRestaurants() {
  diningData.data.forEach((hall) => {
    const hallInfo = document.createElement("tr");
    hallInfo.innerHTML = `
          <td>${hall.hall_id}</td>
          <td>${hall.hall_name}</td>  
          <td>${hall.hall_address}</td>`;
    diningTable.append(hallInfo); // add hallInfo tr to diningTable
  });
}

async function getMeals() {
  console.log("data request");
  const diningRequest = await fetch("/api/dining/");
  const diningData = await diningRequest.json();
  const diningTable = document.getElementById("table");
}

async function windowActions() {
  console.log("window loaded");
  const meals = await getMeals;
}

window.onload = windowActions;

// ${} is string formatting
// innerHTML gets or sets HTML within an element

//   const diningTable = document.querySelector("#target");
