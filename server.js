const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const db = require("./db.json");
const middlewares = jsonServer.defaults();
const port = 3005;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// server.get("*", (_, res) => {
//   res.set("Allow", "POST");
//   res.set("Allow", "GET"); // get requests  are returning 405?

//   res.send(405, "Method Not Allowed");
// });

server.post("/customer/account/resetPassword", resetController);

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

async function resetController(req, res, next) {
  try {
    const userId = req.body.email;

    if (!userId) {
      return res.status(400).jsonp({
        data: null,
        errors: [
          {
            status: "400",
            title: "email field not specified",
            detail: "An email address is required",
          },
        ],
      });
    }

    const result = db.users.find((user) => user.email == userId);

    if (!result) {
      return res.status(404).jsonp({
        data: null,
        errors: [
          {
            status: "404",
            title: "Unknown user",
            detail: "Sorry, there is no account attached to that email address",
          },
        ],
      });
    }

    res.status(200).jsonp({
      data: null,
      errors: [],
    });
  } catch (e) {
    next();
  }
}
