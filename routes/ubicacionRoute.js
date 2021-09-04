const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Ubicacion } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//FindOne
router.get("/:id", checkToken, (req, res) => {
  Ubicacion.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("La ubicación con el id ingresado no se encuentra.");
    }
    res.send(response);
  });
});

//FindAll
router.get("/", checkToken, function (req, res) {
  Ubicacion.findAll().then((result) => {
    res.send(result);
  });
});

//Create
router.post("/", checkToken, function (req, res) {
  const { error } = validateUbicacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Ubicacion.create(req.body).then(
    (result) => {
      res.send(result);
    }
  );
});

//Update
router.put("/:id", checkToken, (req, res) => {
  const { error } = validateUbicacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Ubicacion.update(req.body, { where: { id: req.params.id } }).then((response) => {
    if (response[0] !== 0) {
      res.send({ message: "La ubicación ha sido actualizada." });
    }
    else {
      res.status(404).send({ message: "La ubicación no se ha encontrada." });
    }
  });
});

//Delete
router.delete("/:id", checkToken, (req, res) => {
  Ubicacion.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    }
    else {
      res.status(404).send({ message: "La ubicación no fue encontrada." });
    }
  });
});

const validateUbicacion = (ubicacion) => {
  const schema = Joi.object({
    coordenadaX: Joi.number(),
    coordenadaY: Joi.number(),
  });

  return schema.validate(ubicacion);
};

module.exports = router;