const fs = require("fs");
const path = require("path");
const ftpDeploy = new (require("ftp-deploy"))();
const config = require("./ftp.config.js");
const distPath = papth.resolve(__dirname, "dist");
if (!fs.existsSync(distPath)) {
 console.error("No existe la carpeta 'dist'. Ejecuta `npm run build` primero.");
 process.exit(1);
}
ftpDeploy.deploy(config)
 .then(res => console.log("Deploy completado:", res))
 .catch(err => console.error("Error durante deploy:", err));