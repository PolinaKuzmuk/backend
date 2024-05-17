const apiUrl =
  "https://gitlab.sportradar.ag/p.kuzmuk/backend/-/raw/main/db.json";

// Make a GET request
export default fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
