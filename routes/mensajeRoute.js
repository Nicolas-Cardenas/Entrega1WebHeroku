const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Mensaje } = require("../models/relaciones");
const Dia = new Date().toDateString();
const checkToken = require("../jwt/checkToken");

//GET all mensajes
router.get("/", checkToken, function (req, res) {
  Mensaje.findAll().then((result) => res.send(result));
});

//GET mensaje por id
router.get("/:id", checkToken, function (req, res) {
  Mensaje.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El mensaje con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//POST create mensaje
router.post("/", checkToken, function (req, res) {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  req.body.fecha = Dia;

  Mensaje.create(req.body).then((result) => res.send(result));
});

//PUT update mensaje por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Mensaje.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Mensaje actualizado." });
      } else {
        res.status(404).send({
          message: "El mensaje con el ID indicado no fue encontrado.",
        });
      }
    },
  );
});

//DELETE mensaje por id
router.delete("/:id", checkToken, (req, res) => {
  Mensaje.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "El mensaje con el ID indicado no fue encontrado.",
      });
    }
  });
});

//Validacion
const validate = (user) => {
  const schema = Joi.object({
    descripcion: Joi.string().min(3).max(200).required(),
    fecha: Joi.date(),
    ConductorId: Joi.number(),
    ViajeId: Joi.number(),
    PasajeroId: Joi.number(),
  });
  return schema.validate(user);
};

module.exports = router;
