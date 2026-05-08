// importando la biblioteca de winston
import winston, { format } from "winston";
import path from "node:path";
import fs from "node:fs";

// importando biblioteca de transporte
import DailyRotateFile from "winston-daily-rotate-file";

// destructurando funciones de format
const {
  combine,
  timestamp,
  label,
  printf,
  colorize,
  prettyPrint
} = format;

// creando directorio raíz
const __rootdir = path.resolve(process.cwd());

// creando la ruta del directorio de logs en la raíz del proyecto
const logsDir = path.join(__rootdir, "logs");

// rutina que crea la carpeta donde irán los logs solo en caso de no existir
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// definiendo esquema de colores
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue"
};

// agregando esquema de colores a winston
winston.addColors(colors);

// formato para consola
const myConsoleFormat = combine(
  colorize({ all: true }),
  label({ label: "📢" }),
  timestamp({ format: "DD-MM-YY HH:mm:ss" }),
  printf(
    (info) =>
      `${info.level}; ${info.label}: ${info.timestamp}: ${info.message}`
  )
);

// formato para archivos
const myFileFormat = combine(
  format.uncolorize(),
  timestamp(),
  format.json()
);

// opciones de transportes
const options = {
  errorFile: {
    level: "error",
    filename: path.join(logsDir, "error.log"),
    maxsize: 5242880,
    maxFiles: 5,
    format: myFileFormat
  },

  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat
  },

  readableFile: {
    filename: path.join(logsDir, "app-readable.log"),
    level: "info",
    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint()
    ),
    maxsize: 5242880,
    maxFiles: 5
  },

  dailyRotateFile: {
    filename: path.join(logsDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat
  }
};

// creando logger
const logger = winston.createLogger({
  transports: [
    // log principal con rotación diaria
    new DailyRotateFile(options.dailyRotateFile),

    // archivo legible para humanos
    new winston.transports.File(options.readableFile),

    // archivo de errores
    new winston.transports.File(options.errorFile),

    // consola
    new winston.transports.Console(options.console)
  ],

  // captura de excepciones
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "exception.log")
    })
  ],

  // captura de promesas rechazadas
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, "rejection.log")
    })
  ],

  exitOnError: false
});

// exportamos logger
export default logger;