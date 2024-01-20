const express = require("express");
const comicsApi = require("comicbooks-api");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/latest", async (req, res) => {
  const comics = await comicsApi.getLatestComics(
    !req.query.page ? 1 : req.query.page
  );
  res.json(comics);
});

app.get("/api/marvel", async (req, res) => {
  const comics = await comicsApi.getMarvelComics(
    !req.query.page ? 1 : req.query.page
  );
  res.json(comics);
});
app.get("/api/vertigo", async (req, res) => {
  const comics = await comicsApi.getDCComicsVertigo(
    !req.query.page ? 1 : req.query.page
  );
  res.json(comics);
});
app.get("/api/wildstorm", async (req, res) => {
  const comics = await comicsApi.getDCComicsWildstorm(
    !req.query.page ? 1 : req.query.page
  );
  res.json(comics);
});

app.get("/api/search/:search", async (req, res) => {
  try {
    const search_comic = req.params.search;
    const comics = await comicsApi.getComicsThroughSearch(
      search_comic,
      !req.query.page ? 1 : req.query.page
    );
    res.json(comics);
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
