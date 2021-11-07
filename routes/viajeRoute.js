const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Viaje } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//Validacion
const schema = Joi.object({
  fecha: Joi.date().required(),
  direccion: Joi.string().min(1).required(),
  precio: Joi.number().required(),
  tiempo: Joi.number().required(),
  terminado: Joi.boolean().required(),
  numCupos: Joi.number().required(),
  lleno: Joi.boolean().required(),
});

//GET all Viajes
router.get("/", function (req, res) {
  Viaje.findAll().then((result) => res.send(result));
});

//GET Viaje por id
router.get("/:id", checkToken, function (req, res) {
  Viaje.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El viaje con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//GET Viaje por id
router.get("/:conductor", checkToken, function (req, res) {
  Viaje.findByPk(req.params.conductor).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El viaje con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//POST create Viaje
router.post("/", checkToken, function (req, res) {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Viaje.create(req.body).then((result) => res.send(result));
});

//PUT update Viaje por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Viaje.update(req.body, { where: { id: req.params.id } }).then((response) => {
    if (response[0] !== 0) {
      res.send({ message: "Viaje actualizada." });
    } else {
      res.status(404).send({
        message: "El Viaje con el ID indicado no fue encontrado.",
      });
    }
  });
});

//DELETE Viaje por id
router.delete("/:id", checkToken, (req, res) => {
  Viaje.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "El Viaje con el ID indicado no fue encontrado.",
      });
    }
  });
});

module.exports = router;
