const rp = require("request-promise");

module.exports = async function (city = "") {
  if (!city) {
    throw new Error("city not specified");
  }
  const KEY = "78e4fc4dbafe4b36647459125f96133b";
  const uri = "https://api.openweathermap.org/data/2.5/weather";

  const options = {
    uri,
    qs: {
      appid: KEY,
      q: city,
      units: "imperial",
    },
    json: true,
  };

  try {
    const data = await rp(options);
    const num = 5 / 9;
    const temp = data.main.temp - 32;
    const cels = Math.ceil(temp * num);

    return {
      weather: `${data.name}: ${cels}`,
      error: null,
    };
  } catch (error) {
    return {
      weather: null,
      error: error.error.massage,
    };
  }
};
