// async pauses windowActions() until the await promise fulfills
async function windowActions() {
  console.log("window loaded");
  // const endpoint =
  const request = await fetch("/api/dining/");
  const diningData = await request.json();
}

window.onload = windowActions;
