const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
// const { createMongoUser } = require("./userController");
const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
require("dotenv").config(); // at the top of your main file
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
const hapibooksapiKey = process.env.HAPI_BOOKS_API_KEY;
mongoose.set("strictQuery", false);

app.use(express.json());
// Connect to the MongoDB database
mongoose.connect("mongodb://0.0.0.0:27017/BookDatabase", {
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

const BookSchema1 = new mongoose.Schema({
  googleId: { type: String, unique: true },
  title: String,
  authors: [String],
  description: String,
  thumbnail: String,
  cachedAt: { type: Date, default: Date.now },
});

BookSchema1.index({ title: 1, authors: 1 });
const Book = mongoose.model("Book", BookSchema);
const CachedBook = mongoose.model("CachedBook", BookSchema1);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.index({ username: 1 }, { unique: true });
const User = mongoose.model("User", userSchema);
const getBooks = async () => {
  try {
    // using async-await to get the data from the URL
    const response = await axios.get(
      "https://hapi-books.p.rapidapi.com/nominees/Suspense/2021",
      {
        headers: {
          "X-RapidAPI-Key": hapibooksapiKey,
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
        genre: "Mystery & Thriller",
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

function normalize(str) {
  return str
    ?.toLowerCase()
    .replace(/[^a-z0-9]/gi, "")
    .trim();
}

function isMatch(volumeInfo, title, author) {
  const normalizedTitle = normalize(volumeInfo.title);
  const normalizedAuthorList = (volumeInfo.authors || []).map(normalize);

  const targetTitle = normalize(title);
  const targetAuthor = normalize(author);

  const titleMatch =
    normalizedTitle.includes(targetTitle) ||
    targetTitle.includes(normalizedTitle);
  const authorMatch =
    !author || normalizedAuthorList.some((a) => a.includes(targetAuthor));

  return titleMatch && authorMatch;
}

async function fetchBook(title, author) {
  // First, try to find it in the local DB
  const dbQuery = {
    title: new RegExp(`^${title}$`, "i"),
  };
  // if (author) {
  //   dbQuery.authors = { $in: [new RegExp(author, "i")] };
  // }

  const existingBook = await CachedBook.findOne(dbQuery);
  if (existingBook) {
    console.log("Found From Cache");
    return existingBook;
  }

  // Fetch from Google Books
  let query = `intitle:"${title}"`;

  if (author) query += `+inauthor:"${author.split(" ")[0]}"`;
  console.log(
    "Query",
    `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(
      query
    )}&langRestrict=en&printType=books&maxResults=5&key=${apiKey}`
  );
  const response = await axios.get(
    `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(
      query
    )}&langRestrict=en&printType=books&maxResults=5&key=${apiKey}`
  );
  console.log(title, " Fetched from Google Books API");
  const items = response.data.items || [];

  const validItems = items.filter(
    (item) => item.volumeInfo?.description && item.volumeInfo?.language === "en"
  );
  // Find the best match from the results
  const bestMatch = validItems.find((item) =>
    isMatch(item.volumeInfo, title, author)
  );
  if (!bestMatch) return null;

  const info = bestMatch.volumeInfo;

  // Prepare data
  const bookData = {
    googleId: bestMatch.id,
    title: info.title,
    authors: info.authors || [],
    description: info.description || "",
    thumbnail: info.imageLinks?.thumbnail || "",
  };

  // Save with upsert
  const savedBook = await CachedBook.findOneAndUpdate(
    { googleId: bestMatch.id },
    { $set: bookData },
    { new: true, upsert: true, setDefaultsOnInsert: true, strict: false }
  );
  console.log(info.title, " Saved to DB");
  return savedBook;
}

const getNewBooks = async () => {
  try {
    // using async-await to get the data from the URL
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=10&key=AIzaSyDe8Rz-e1Rc6OM4GUTFdQBhhEZ1sX2dz8w"
    );
    console.log(response);
    for (let i = 0; i < response.items.length; i++) {
      const post = new Book({
        name: response.data[i]["name"],
        cover: response.data[i]["cover"],
        bookid: response.data[i]["book_id"],
        author: response.data[i]["author"],
        genre: "",
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

const insertUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User inserted into users collection", data: newUser });
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(500).json({ error: "Insert failed", details: err.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = password === user.password;
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // const token = user._id + user.username;
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

// getBooks();

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
app.get("/getbooksbygenre", async (req, res) => {
  const { genre } = req.query;
  try {
    const books = await Book.find({ genre: genre });
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/getbookdata", async (req, res) => {
  const { title, author } = req.query;
  if (!title) return res.status(400).json({ error: "Missing title" });

  try {
    const book = await fetchBook(title, author);
    if (!book) return res.status(404).json({ error: "Book Not Found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err });
  }
});

app.post("/create-user", insertUser);
app.post("/login", loginUser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
