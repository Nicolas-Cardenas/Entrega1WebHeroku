const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { MapaTrayecto } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//GET all trayectos
router.get("/", checkToken, function (req, res) {
  MapaTrayecto.findAll().then((result) => res.send(result));
});

//GET trayecto por id
router.get("/:id", checkToken, function (req, res) {
  MapaTrayecto.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El trayecto con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//POST create trayecto
router.post("/", checkToken, function (req, res) {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  MapaTrayecto.create(req.body).then((result) => res.send(result));
});

//PUT update trayecto por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  MapaTrayecto.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Trayecto actualizado." });
      } else {
        res.status(404).send({
          message: "El trayecto con el ID indicado no fue encontrado.",
        });
      }
    },
  );
});

//DELETE trayecto por id
router.delete("/:id", checkToken, (req, res) => {
  MapaTrayecto.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "El trayecto con el ID indicado no fue encontrado.",
      });
    }
  });
});

//Validacion

const schema = Joi.object({
  ubicacionInicial: Joi.string().required(),
  ubicacionFinal: Joi.string().required(),
  distancia: Joi.number().required(),
  ViajeId: Joi.number().required()
});

module.exports = router;
