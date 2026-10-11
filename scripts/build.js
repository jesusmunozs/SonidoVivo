import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
  console.log('1. Preparando index.html fuente para Vite...');
  fs.writeFileSync(path.join(rootDir, 'index.html'), sourceHtml, 'utf8');

  console.log('2. Compilando aplicacion con Vite...');
  await build();

  console.log('3. Sincronizando carpeta assets en la raiz para GitHub Pages...');
  const assetsDir = path.join(rootDir, 'assets');
  const distAssetsDir = path.join(rootDir, 'dist', 'assets');

  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Eliminar assets antiguos para no acumular basura
  const oldFiles = fs.readdirSync(assetsDir);
  for (const file of oldFiles) {
    fs.unlinkSync(path.join(assetsDir, file));
  }

  // Copiar nuevos assets compilados
  const newFiles = fs.readdirSync(distAssetsDir);
  for (const file of newFiles) {
    fs.copyFileSync(path.join(distAssetsDir, file), path.join(assetsDir, file));
  }

  console.log('4. Copiando dist/index.html a la raiz para GitHub Pages...');
  fs.copyFileSync(path.join(rootDir, 'dist', 'index.html'), path.join(rootDir, 'index.html'));

  console.log('✓ Build y sincronizacion completados con exito!');
}

run().catch((err) => {
  console.error('Error durante el build:', err);
  process.exit(1);
});
