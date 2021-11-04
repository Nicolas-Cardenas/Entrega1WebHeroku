const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Parada } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//Validacion
const schema = Joi.object({
  ciudad: Joi.string().min(1).required(),
  direccion: Joi.string().min(1).required(),
  coordenadaX: Joi.number().required(),
  coordenadaY: Joi.number().required(),
  ViajeId: Joi.number(),
});

//GET all Paradas
router.get("/", checkToken, function (req, res) {
  Parada.findAll().then((result) => res.send(result));
});

//GET Parada por id
router.get("/:id", checkToken, function (req, res) {
  Parada.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("La parada con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//POST create Parada
router.post("/", checkToken, function (req, res) {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Parada.create(req.body).then((result) => res.send(result));
});

//PUT update Parada por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error);
  }

  Parada.update(req.body, { where: { id: req.params.id } }).then((response) => {
    if (response[0] !== 0) {
      res.send({ message: "Parada actualizada." });
    } else {
      res.status(404).send({
        message: "La Parada con el ID indicado no fue encontrado.",
      });
    }
  });
});

//DELETE Parada por id
router.delete("/:id", checkToken, (req, res) => {
  Parada.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "La Parada con el ID indicado no fue encontrado.",
      });
    }
  });
});
module.exports = router;
