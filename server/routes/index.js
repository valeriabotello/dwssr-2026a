import { Router } from "express";
const router = Router();

// importando el logger
import logger from "../lib/winston.js";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Proyecto Mágico ✨",
    author: "Valeria Botello",
  });
});

// ruta para pruebas de logs
router.get("/test-logs", (req, res) => {
  // generar logs
  logger.error("esto es una prueba del log tipo error ❌");
  logger.warn("esto es una prueba del log tipo warn ⚠️");
  logger.info("esto es una prueba del log tipo info ℹ️");
  logger.http("esto es una prueba del log tipo http 💻");
  logger.debug("esto es una prueba del log tipo debug 🐞");

  // respuesta
  res.json({
    message: "Se crearon logs de prueba correctamente",
    archivos: [
      "logs/app-YYYY-MM-DD.log",
      "logs/app-readable.log",
      "logs/error.log",
    ],
  });
});

// Rutas para prueba de exception y rejections
if (process.env.NODE_ENV === "production") {
  // habilitando ruta para probar exceptionHandlers
  // acceso: GET /test-exception
  router.get("/test-exception", (req, res) => {
    res.json({
      message: "Excepción lanzada. Revisa logs/exceptions.log",
    });

    // lanzando exception
    setTimeout(() => {
      throw new Error("Exception de prueba no capturada");
    }, 300);
  });

  // ruta para rejections
  // acceso: GET /test-rejection
  router.get("/test-rejection", (req, res) => {
    res.json({
      message: "Promesa rechazada. Revisa logs/rejections.log",
    });

    // generando rejection
    Promise.reject(new Error("Promesa rechazada sin catch"));
  });
}

export default router;