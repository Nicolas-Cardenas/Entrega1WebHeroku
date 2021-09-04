const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Pago } = require("../models/relaciones");

const checkToken = require("../jwt/checkToken");


//GET all pagos
router.get("/", checkToken, function (req, res) {
  Pago.findAll().then((result) => res.send(result));
});

//GET pago por id
router.get("/:id", checkToken, function (req, res) {
  Pago.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("El pago con el ID indicado no fue encontrado.");
    }
    res.send(response);
  });
});

//POST create pago
router.post("/", checkToken, function (req, res) {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  Pago.create(req.body).then((result) => res.send(result));
});

//PUT update pago por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = validacion(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Pago.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Pago actualizado." });
      } else {
        res.status(404).send({
          message: "El pago con el ID indicado no fue encontrado.",
        });
      }
    },
  );
});

//DELETE pago por id
router.delete("/:id", checkToken, (req, res) => {
  Pago.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.send("El pago fue borrado del historial");
    } else {
      res.status(404).send({
        message: "El pago con el ID indicado no fue encontrado.",
      });
    }
  });
});

//Validacion
const validacion = (user) => {
  const schema = Joi.object({
    valor: Joi.number().required(),
    fecha: Joi.date().required(),
    pendiente: Joi.boolean().required(),
    tipo: Joi.string().required(),
  });
  return schema.validate(user);
};


module.exports = router;