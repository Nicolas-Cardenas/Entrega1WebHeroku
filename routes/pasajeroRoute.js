const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { Pasajero } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

router.get("/", checkToken, function (req, res) {
  Pasajero.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", checkToken, function (req, res) {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Pasajero.create(req.body).then((result) => {
    res.send(result);
  });
});

router.get("/:id", checkToken, (req, res) => {
  Pasajero.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res.status(404).send("No se encuentra el Pasajero con ese ID.");
    }
    res.send(response);
  });
});

router.put("/:id", checkToken, (req, res) => {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Pasajero.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send("Pasajero actualizado.");
      }
      else {
        res.status(404).send("No se encuentra el Pasajero.");
      }
    },
  );
});

router.delete("/:id", checkToken, (req, res) => {
  Pasajero.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    }
    else {
      res.status(404).send("No se encuentra el Pasajero.");
    }
  });
});

//Validacion
const validacion = (pasajero) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    celular: Joi.number().required(),
    correo: Joi.string().required(),
    contrasena: Joi.string().min(5).max(15).required(),
    edad: Joi.number().required(),
  });
  return schema.validate(pasajero);
};

module.exports = router;
