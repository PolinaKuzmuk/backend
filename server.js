"use strict";

const Hapi = require("@hapi/hapi");
const Bcrypt = require("bcrypt");

const BASE_URL = "https://664708a751e227f23ab0ca7d.mockapi.io/";

const users = {
  john: {
    username: "john",
    password: "$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm", // 'secret',
    name: "John Doe",
    id: "2133d32a",
  },
};

const validate = async (request, username, password) => {
  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };

  return { isValid, credentials };
};

function getSportData(endpoint) {
  return fetch(`${BASE_URL}${endpoint}`).then((response) => response.json());
}

const init = async () => {
  const server = Hapi.server({
    port: 3300,
    host: "127.0.0.1",
  });

  await server.register(require("@hapi/basic"));

  server.auth.strategy("simple", "basic", { validate });

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
      return await getSportData("matches").then((response) =>
        response.filter((item) => item.sport_id === request.params.id)
      );
    },
  });

  server.route({
    method: "GET",
    path: "/matches/{id}",
    handler: async (request, h) => {
      return await getSportData(`matches/${request.params.id}`);
    },
  });

  server.route({
    method: "DELETE",
    path: "/matches/{id}",
    options: {
      auth: "simple",
    },
    handler: async (request, h) => {
      try {
        await fetch(`${BASE_URL}matches/${request.params.id}`, {
          method: "DELETE",
        });
        return h
          .response({
            message: "Element was deleted successfully",
          })
          .code(200);
      } catch (error) {
        console.log("Error deleting data", error);
        return h.response({
          message: "Failed to delete data",
          error: error.message,
        });
      }
    },
  });

  server.route({
    method: "PUT",
    path: "/matches/{id}",
    options: {
      auth: "simple",
    },
    handler: async (request, h) => {
      const updatedMatch = request.query;
      try {
        await fetch(`${BASE_URL}matches/${request.params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMatch),
        });
        return h
          .response({
            message: "Data updated successfully",
            data: updatedMatch,
          })
          .code(200);
      } catch (error) {
        console.error("Error updating data:", error);
        return h
          .response({
            message: "Failed to update data",
            error: error.message,
          })
          .code(500);
      }
    },
  });

  server.route({
    method: "POST",
    path: "/new-match",
    options: {
      auth: "simple",
    },
    handler: async (request, h) => {
      const newMatch = request.query;
      try {
        await fetch(`${BASE_URL}matches`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMatch),
        });
        return h
          .response({
            message: "Data added successfully",
            data: newMatch,
          })
          .code(200);
      } catch (error) {
        console.log("Error adding data", error);
        return h
          .response({
            message: "Failed to add data",
            error: error.message,
          })
          .code(500);
      }
    },
  });

  await server.start();
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
