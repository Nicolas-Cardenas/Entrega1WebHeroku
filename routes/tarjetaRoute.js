const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Tarjeta } = require("../models/relaciones");

//Token
const checkToken = require("../jwt/checkToken");


//GET all tarjetas
router.get("/", checkToken, function (req, res) {
  Tarjeta.findAll().then((result) => res.send(result));
});

//GET tarjeta por id
router.get("/:id", checkToken, function (req, res) {
  Tarjeta.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("La tarjeta con el ID indicado no fue encontrada.");
    }
    res.send(response);
  });
});

//POST create tarjeta
router.post("/", checkToken, function (req, res) {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Tarjeta.create(req.body).then((result) => res.send(result));
});

//PUT update tarjeta por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Tarjeta.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Tarjeta actualizada." });
      } else {
        res.status(404).send({
          message: "La Tarjeta con el ID indicado no fue encontrada.",
        });
      }
    },
  );
});

//DELETE tarjeta por id
router.delete("/:id", checkToken, (req, res) => {
  Tarjeta.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.send("La tarjeta fue borrada");
    } else {
      res.status(404).send({
        message: "La tarjeta con el ID indicado no fue encontrada.",
      });
    }
  });
});

//Validacion
const validacion = (user) => {
  const schema = Joi.object({
    numero: Joi.number().required(),
    fechaExpiracion: Joi.date().required(),
    cvv: Joi.number().optional(),
    pais: Joi.string().required(),
    banco: Joi.string().optional()
  });
  return schema.validate(user);
};


module.exports = router;