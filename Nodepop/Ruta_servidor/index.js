"use strict";

const express = require("express");
const router = express.Router();
const anuncioController = require("../apiServices/anuncios.js/");
const anuncios = require("../apiServices/anuncios/diferentes_routes.js");

/* GET home page. */
router.get("/", async function(req, res, next) {  
  try {
    const skip = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const venta = req.query.venta;
    const tags = req.query.tags;
    const filter = {};
    if (venta) {
      filter.venta = venta;
    }
    if (tags) {
      filter.tags = tags;
    }

    res.locals.anuncios = await anuncioController.listaAnuncios({filter:filter, skip, limit, sort});
    res.render("index"); 
  } catch (err) {
    next(err);
  }
   
});

router.use("/anuncios", anuncios);

// router.use("/users", users);

module.exports = router;