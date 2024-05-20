"use strict";

const Hapi = require("@hapi/hapi");

const BASE_URL = "https://664708a751e227f23ab0ca7d.mockapi.io/";

function getSportData(endpoint) {
  return fetch(`${BASE_URL}${endpoint}`).then((responce) => responce.json());
}

const init = async () => {
  const server = Hapi.server({
    port: 3300,
    host: "127.0.0.1",
  });

  server.route({
    method: "GET",
    path: "/sports",
    handler: async (request, h) => {
      return await getSportData("sports");
    },
  });

  server.route({
    method: "GET",
    path: "/matches",
    handler: async (request, h) => {
      return await getSportData("matches");
    },
  });

  server.route({
    method: "GET",
    path: "/sports/{id}",
    handler: async (request, h) => {
      return await getSportData("matches").then((responce) =>
        responce.filter((item) => item.sport_id === request.params.id)
      );
    },
  });

  // server.route({
  //   method: "DELETE",
  //   path: "/sports/{id}",
  //   handler: async (request, h) => {
  //     return await fetch(`${BASE_URL}matches/${request.params.id}`, {
  //       method: "DELETE",
  //     }).then(() => "Element was deleted successfully");
  //   },
  // });

  server.route({
    method: "POST",
    path: "/submit",
    handler: async (request, h) => {
      const newMatch = request.payload;
      return await fetch(`${BASE_URL}matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMatch),
      }).then((response) => response.json());
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return `
            <html>
                <head>
                    <title>Form Submission</title>
                </head>
                <body>
                    <form id="myForm">
                        <label for="sport_id">Sport ID:</label>
                        <input type="number" id="sport_id" name="sport_id"><br><br>
                        <label for="match_name">Match Name:</label>
                        <input type="text" id="match_name" name="match_name"><br><br>
                        <label for="match_start_date">Match Start Date:</label>
                        <input type="date" id="match_start_date" name="match_start_date"><br><br>
                        <label for="scores">Scores:</label>
                        <input type="text" id="scores" name="scores"><br><br>
                        <button type="submit">Submit</button>
                    </form>
                    <script>
                        document.getElementById('myForm').addEventListener('submit', async function(event) {
                            event.preventDefault();
                            const formData = new FormData(event.target);
                            const data = Object.fromEntries(formData.entries());

                            const response = await fetch('/submit', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            });

                            const result = await response.json();
                            console.log("result", result);
                        });
                    </script>
                </body>
            </html>
        `;
    },
  });

  await server.start();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
