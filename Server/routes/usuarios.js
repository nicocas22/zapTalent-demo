//Rutas para crear usuario
const express = require("express");
const router = express.Router();
const usuarioControllers = require("../controllers/usuariosControllers");
const upload = require('../libs/storage');
//Crea usuario
//Api/usuarios
router.post("/", usuarioControllers.crearUsuarios);

router.get(
  "/:idUsuario",
  usuarioControllers.mostarUsuarios
);

router.post("/validacion/rut-email", usuarioControllers.validacionEmailRut);

router.put(
  "/:iduser",
  usuarioControllers.putUsuario
);

router.put(
  "/actualizar-password/:iduser",
  usuarioControllers.actualizarPassword
);
router.put(
  "/subir-foto-perfil/:iduser",
  upload.single("imageURL"),
  usuarioControllers.actualizarFotoPerfil
);

router.put(
  "/actualizar-cv/:iduser",
  upload.single("imageURL"),
  usuarioControllers.actualizarCV
);

module.exports = router;
