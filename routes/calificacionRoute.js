const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Calificacion } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//GET all calificaciones
router.get("/", checkToken, function (req, res) {
  Calificacion.findAll().then((result) => res.send(result));
});

//GET calificacion por id
router.get("/:id", checkToken, function (req, res) {
  Calificacion.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("La calificacion con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//POST create calificacion
router.post("/", checkToken, function (req, res) {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Calificacion.create(req.body).then((result) => res.send(result));
});

//PUT update calificacion por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Calificacion.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Calificacion actualizada." });
      } else {
        res.status(404).send({
          message: "La calificacion con el ID indicado no fue encontrado.",
        });
      }
    },
  );
});

//DELETE calificacion por id
router.delete("/:id", checkToken, function (req, res) {
  Calificacion.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "La calificacion con el ID indicado no fue encontrado.",
      });
    }
  });
});

//Validacion
const validacion = (user) => {
  const schema = Joi.object({
    comentario: Joi.string().min(3).max(200),
    estrellas: Joi.number().required().min(0).max(5),
    ConductorId: Joi.number(),
    PasajeroId: Joi.number(),
  });
  return schema.validate(user);
};

module.exports = router;
