function getRandomIntInclusive(min, max) {
  mini = Math.ceil(min);
  maxi = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxi - mini + 1) + mini);
}

// this async function will get data from the api
// usable for multiple endpoints. pass a string for api you want to use (e.g. /meals, /dining)
async function getData(api) {
  console.log('data request');
  const request = await fetch(api);
  const results = await request.json();
  console.log(results);
  return results.data;
}

// this sync function processes results from api call and puts them in a table
function processDiningHalls(diningData) {
  const diningTable = document.querySelector('#table');
  diningData.forEach((hall) => {
    const hallInfo = document.createElement('tr');
    hallInfo.innerHTML = `
        <td>${hall.hall_id}</td>
        <td>${hall.hall_name}</td>  
        <td>${hall.hall_address}</td>`;
    diningTable.append(hallInfo); // add hallInfo tr to diningTable
  });
}

// this function runs when the window loads. it extracts wholeMeals and dining api data then creates an array of 10 random integers corresponding to positions in the meals index
async function windowActions() {
  console.log('window loaded');
  const meals = await getData('/api/wholeMeals');
  const halls = await getData('/api/dining');
  processDiningHalls(halls);

  // mealArray is an index of all 10 meals.
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // .map is a forEach function that runs 10 times
  const selectedMeals = mealArray.map((element) => {
    const random = getRandomIntInclusive(0, meals.length - 1);
    return meals[random]; // returns a new array of 10 random integer positions
  });
  console.table(selectedMeals);
}
window.onload = windowActions;

// NOTES
// 1. ln 23: innerHTML gets or sets HTML within an element
// 2. ln 24-26: ${} are template literals
// 3. ln 32: async pauses windowActions() until the await promises fulfills
// 4. ln 42: computers start at 0, but length starts at 1. thus, length-1
// 5. always use .data after whatever api endpoint you send it to see the data
