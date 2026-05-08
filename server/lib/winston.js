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
const logDir = path.join(__rootdir, "logs");

// rutina que crea la carpeta donde irán los logs solo en caso de no existir
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
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

// creamos los formatos de salida para los diferentes transportes
const myConsoleFormat = combine(
    // agregando colores a este formato
    colorize({ all: true }),

    // agregando una etiqueta
    label({ label: "📢" }),

    // agregmos fecha
    timestamp({ format: "DD-MM-YY HH:mm:ss" }),

    // función de impresión
    printf(
        (info) =>
            `${info.level}; ${info.label}: ${info.timestamp}: ${info.message}`
    )
);

// formato para los archivos
const myFileFormat = combine(
    // quitando colorización
    format.uncolorize(),

    // agregando fecha en formato ISO
    timestamp(),

    // salida en formato JSON
    format.json()
);
//creando los transportes 
const opcions ={
    errorFile:{
        level: "error",
        filename: path.join(__rootdir,"logs","error.log"),
        maxsize: 1048576,
        format:myFileFormat
    }
};
// Creando el objeto de opciones para cada transporte
const options = {
  errorFile: {
    level: "error",
    filename: path.join(__rootdir, "logs", "error.log"),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat,
  },
  readableFile: {
    filename: path.join(logsDir, "app-readable.log"),
    level: "info",
    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),
    maxsize: 5242880,
    maxFiles: 5,
  },
  dailyRotateFile: {
    filename: path.join(logsDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};