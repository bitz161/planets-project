const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

//boolean, filter keplars based on study if habitable.
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    //parse is the 3rd party npm
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    //pushing data in habitablePlanets array
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    //error handling
    console.log(err);
  })
  .on("end", () => {
    habitablePlanets.map((planet) => {
      console.log(planet["kepler_name"]);
    });

    //inform that code is done running
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });

// parse();
