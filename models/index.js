// explicit list of every model that exists in the database; what you want to find
// import anything that you want to track
// export it all into objects for simple database management

import DietaryRestrictions from "./DietaryRestrictions.js";
import DiningHall from "./DiningHall.js";
import Macros from "./Macros.js";
import Meals from "./Meals.js";

export default {
  DietaryRestrictions,
  DiningHall,
  Macros,
  Meals,
};
