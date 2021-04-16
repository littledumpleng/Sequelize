
// async pauses windowActions() until the await promise fulfills
async function windowActions() {
  console.log("window loaded");
  // const endpoint =
  const request = await fetch("/api/dining/");
  const diningData = await request.json();
  const diningTable = document.getElementById("table");

  diningData.data.forEach((hall) => {
    const hallInfo = document.createElement("tr");
    hallInfo.innerHTML = `
        <td>${hall.hall_id}</td>
        <td>${hall.hall_name}</td>  
        <td>${hall.hall_address}</td>`;
    diningTable.append(hallInfo); // add hallInfo tr to diningTable
  });
}
window.onload = windowActions;

// ${} is string formatting
// innerHTML gets or sets HTML within an element

//   const diningTable = document.querySelector("#target");
