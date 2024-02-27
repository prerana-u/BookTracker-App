const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose.set("strictQuery", false);

app.use(express.json());
// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/BookDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

connection.on("error", (error) => {
  console.error(error);
});

// Create a Mongoose model for the data
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  bookid: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", BookSchema);

const getBooks = async () => {
  try {
    // using async-await to get the data from the URL
    const response = await axios.get(
      "https://hapi-books.p.rapidapi.com/nominees/horror/2023",
      {
        headers: {
          "X-RapidAPI-Key":
            "6e13be06cemshb5bf17623350800p1b1dbajsn8cf3c79da7a9",
          "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
        },
      }
    );
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      const post = new Book({
        name: response.data[i]["name"],
        cover: response.data[i]["cover"],
        bookid: response.data[i]["book_id"],
        author: response.data[i]["author"],
        genre: "Horror",
      });
      post
        .save()
        .then(() => {
          // res.send("Successfully saved form data to the database");
          console.log("Sucess");
        })
        .catch((error) => {
          console.error(error);
          //  res.send("Error saving form data to the database");
        });
    }
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.statusText);
      console.log(err.response.data);
    }
  }
};

getBooks();

app.use(cors());
app.use(bodyParser.json());

// POST request handler for the API endpoint
app.post("/api/endpoint", (req, res) => {
  // Create a new FormData object with the request body data
  const formData = new Book({
    name: "Percy Jackson",
  });

  // Save the form data to the database
  formData
    .save()
    .then(() => {
      res.send("Successfully saved form data to the database");
      console.log("Sucess");
    })
    .catch((error) => {
      console.error(error);
      res.send("Error saving form data to the database");
    });
});

app.get("/getbooks", async (req, res) => {
  try {
    const users = await Book.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
