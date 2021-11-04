const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Vehiculo } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//FindOne
router.get("/:id", checkToken, (req, res) => {
  Vehiculo.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El vehículo con el id ingresado no se encuentra.");
    }
    res.send(response);
  });
});

//FindAll
router.get("/", checkToken, function (req, res) {
  Vehiculo.findAll().then((result) => {
    res.send(result);
  });
});

//Create
router.post("/", function (req, res) {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Vehiculo.create(req.body).then((result) => {
    res.send(result);
  });
});

//Update
router.put("/:id", (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Vehiculo.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "El vehículo ha sido actualizado." });
      } else {
        res.status(404).send({ message: "El vehículo no se ha encontrado." });
      }
    },
  );
});

//Delete
router.delete("/:id", checkToken, (req, res) => {
  Vehiculo.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "El vehículo no fue encontrado." });
    }
  });
});

const validate = (vehiculo) => {
  const schema = Joi.object({
    placa: Joi.string().min(6).required(),
    tipo: Joi.string().required(),
    modelo: Joi.string().required(),
    foto: Joi.string().required(),
    ConductorId: Joi.number(),
  });

  return schema.validate(vehiculo);
};

module.exports = router;
