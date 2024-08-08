const express = require("express");
const app = express();
const path = require("path");
const usermodel = require("./model/user.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users", async (req, res) => {
  let users = await usermodel.find();
  res.render("user", { users });
});

app.post("/create", async (req, res) => {
  let { user, email, image } = req.body;
  await usermodel.create({
    user,
    email,
    image,
  });
  res.redirect("/users");
});

app.get("/delete/:id", async (req, res) => {
  let { iddel } = req.params;
  await usermodel.findOneAndDelete({ id: iddel });
  res.redirect("/users");
});

app.get("/edit/:id", async (req, res) => {
  let user = await usermodel.findOne({ _id: req.params.id });
  res.render("update", { user });
});

app.post("/edit/:id", async (req, res) => {
  let { user, email, image } = req.body;
  await usermodel.findOneAndUpdate(
    { _id: req.params.id },
    { user, email, image }
  );
  res.redirect("/users");
});

app.listen(5000);
