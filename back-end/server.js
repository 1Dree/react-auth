const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Controll-Allow-Origin", "*");
  next();
});

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(3000, () => console.log("listening")))
  .catch(console.log);

const reqString = {
  type: String,
  required: true,
};

const email = () => ({
  ...reqString,
  validate: {
    validator: async value => {
      const docs = await mongoose.models.user.countDocuments({ email: value });

      return !docs;
    },
    msg: "This email already exists",
  },
});

const userSchema = new mongoose.Schema({
  email: email(),
  password: reqString,
});

const UserModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  console.log(req.headers);
  res.json("hello");
});

app.post("/signup", async (req, res) => {
  const incomingUserData = req.body.userData;
  if (!incomingUserData) return res.sendStatus(400);

  try {
    const userDoc = await UserModel.create(incomingUserData);

    res.json(userDoc);
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
});

app.put("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  try {
    const userDoc = await UserModel.findOne({ email, password });
    if (!userDoc) return res.sendStatus(404);

    res.json(userDoc);
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
});

app.put("/logout", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  try {
    const userDoc = await UserModel.findOne({ email, password });
    if (!userDoc) return res.sendStatus(404);

    res.json(userDoc);
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
});

app.put("/update-profile", async (req, res) => {
  const { userId, data } = req.body;
  if (!userId || !data) return res.sendStatus(400);

  try {
    const userDoc = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { ...data },
      },
      { new: true }
    );

    res.json(userDoc);
  } catch (err) {
    console.log(err);
  }
});

app.put("/new-password", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  try {
    const userDoc = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password } },
      { new: true, useFindAndModify: false }
    );
    if (!userDoc) return res.sendStatus(404);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
});

app.delete("/signout", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  try {
    const userDoc = await UserModel.findOneAndDelete({ email, password });
    if (!userDoc) return res.sendStatus(404);

    res.json(userDoc);
  } catch (err) {
    console.log(err);

    res.sendStatus(400);
  }
});
