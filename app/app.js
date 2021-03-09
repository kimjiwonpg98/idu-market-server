"use strict";

// es6+ 문법의 async-await 등 최신 문법을 변환해준다.
require("babel-polyfill");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let dist = "";
if (process.env.NODE_ENV === "production") dist = "/dist";
const view = require(`.${dist}/src/apis/view`);
const root = require(`.${dist}/src/apis/root`);
const watchList = require("./src/apis/watchlist");
const search = require("./src/apis/search");

const boards = require("./src/apis/boards/index");
app.use("/", view);
app.use("/api/", root);
app.use("/api/watchlist", watchList);
app.use("/api/search", search);

app.use("/api/boards", boards);

module.exports = app;
