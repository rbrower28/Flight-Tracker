const url = "http://api.aviationstack.com/v1/flights" +
            "?access_key=fa016b2c8360fa9f2285e386f8f22700";
            // "&search=elon"; // Don't have this kind of money


fetch(url)
.then(response =>
  response.json())
.then(json => {
  console.log(json.data);
  const data = json.data;
});