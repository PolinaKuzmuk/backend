import Hapi from "@hapi/hapi";
("use strict");
const match = {
  sport_id: "1",
  match_name: "Test",
  match_start_date: "2024-05-08",
  scores: "2-1",
};

function getSportData() {
  return fetch(
    "https://raw.githubusercontent.com/PolinaKuzmuk/backend/main/db.json"
  ).then((responce) => responce.json());
}

function createMatch(match) {
  return fetch(
    "https://raw.githubusercontent.com/PolinaKuzmuk/backend/main/db.json",
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(match),
    }
  );
}

const init = async () => {
  const server = Hapi.server({
    port: 3300,
    host: "127.0.0.1",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      return await getSportData();
    },
  });

  server.route({
    method: "GET",
    path: "/sports",
    handler: async (request, h) => {
      return await getSportData().then((responce) => responce.sport_list);
    },
  });

  server.route({
    method: "GET",
    path: "/sports/{id}",
    handler: async (request, h) => {
      return await getSportData().then((responce) =>
        responce.match_list.filter(
          (item) => item.sport_id === request.params.id
        )
      );
    },
  });

  server.route({
    method: "POST",
    // path: "https://664708a751e227f23ab0ca7d.mockapi.io/matches",
    path: "/sports/add-match",
    handler: async (request, h) => {
      return await createMatch(match);
      // return await createMatch(match).then(() => getSportData());
      // return request.payload;
    },
  }),
    await server.start();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
