const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { Conductor } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

router.get("/", checkToken, function (req, res) {
  if (req.query.correo !== undefined) {
    let correo = req.query.correo;
    let contrasena = req.query.contrasena;
    Conductor.findOne({ where: { correo, contrasena } }).then((result) => {
      res.send(result);
    });
  } else {
    Conductor.findAll().then((result) => {
      res.send(result);
    });
  }
});

router.post("/", checkToken, function (req, res) {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Conductor.create(req.body).then((result) => {
    res.send(result);
  });
});

router.get("/:id", checkToken, (req, res) => {
  Conductor.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res.status(404).send("No se encuentra el Conductor con ese ID.");
    }
    res.send(response);
  });
});

router.put("/:id", checkToken, (req, res) => {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Conductor.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send("Conductor actualizado.");
      } else {
        res.status(404).send("No se encuentra el Conductor.");
      }
    },
  );
});

router.delete("/:id", checkToken, (req, res) => {
  Conductor.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send("No se encuentra el Conductor.");
    }
  });
});

//Validacion
const validacion = (conductor) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    celular: Joi.number().required(),
    cedula: Joi.number().required(),
    correo: Joi.string().required(),
    contrasena: Joi.string().min(5).max(15).required(),
    edad: Joi.number().required(),
    foto: Joi.string().required(),
  });
  return schema.validate(conductor);
};

module.exports = router;
