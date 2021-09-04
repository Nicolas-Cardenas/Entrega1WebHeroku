const express = require("express");
const router = express.Router();

const Joi = require("joi");
const { Reserva } = require("../models/relaciones");
const checkToken = require("../jwt/checkToken");

//GET all reservas
router.get("/", checkToken, function (req, res) {
  Reserva.findAll().then((result) => res.send(result));
});

//GET reserva por id
router.get("/:id", checkToken, function (req, res) {
  Reserva.findByPk(req.params.id).then((response) => {
    if (response === null) {
      return res
        .status(404)
        .send("La reserva con el ID indicado no fue encontrada.");
    }
    res.send(response);
  });
});

//POST create reserva
router.post("/", checkToken, function (req, res) {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Reserva.create(req.body).then((result) => res.send(result));
});

//PUT update Reserva por id
router.put("/:id", checkToken, (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Reserva.update(req.body, { where: { id: req.params.id } }).then(
    (response) => {
      if (response[0] !== 0) {
        res.send({ message: "Reserva actualizada." });
      } else {
        res.status(404).send({
          message: "Reserva con el ID indicada no fue encontrada.",
        });
      }
    },
  );
});

//DELETE Reserva por id
router.delete("/:id", checkToken, (req, res) => {
  Reserva.destroy({
    where: {
      id: req.params.id,
    },
  }).then((response) => {
    if (response === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({
        message: "La Reserva con el ID indicada no fue encontrada.",
      });
    }
  });
});

//Validacion

const schema = Joi.object({
  codigo: Joi.string().min(3).max(15).required(),
});


module.exports = router;