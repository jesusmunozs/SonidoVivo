import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const sourceHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonido Vivo - Tienda de Instrumentos Musicales</title>
</head>
<body class="bg-[#121026] text-white min-h-screen">
    <div id="root" class="w-full min-h-screen"></div>
    <script type="module" src="./src/main.jsx"></script>
</body>
</html>
`;

async function run() {
  console.log('Restaurando index.html fuente para desarrollo...');
  fs.writeFileSync(path.join(rootDir, 'index.html'), sourceHtml, 'utf8');

  console.log('Iniciando servidor de desarrollo Vite...');
  const server = await createServer({
    root: rootDir,
    server: { port: 5173, open: true }
  });
  await server.listen();
  server.printUrls();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
