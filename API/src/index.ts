import { Elysia } from "elysia";

function generarImagenBase64(): string {
  const ancho = 100;
  const alto = 100;
  const numPixeles = ancho * alto * 4; // RGBA
  const buffer = new Uint8ClampedArray(numPixeles);

  // Genera valores aleatorios para los píxeles
  for (let i = 0; i < numPixeles; i++) {
    buffer[i] = Math.floor(Math.random() * 256);
  }

  // Crea un canvas usando OffscreenCanvas (si estás en entorno compatible)
  const canvas = new OffscreenCanvas(ancho, alto);
  const ctx = canvas.getContext("2d");
  const imageData = new ImageData(buffer, ancho, alto);
  ctx?.putImageData(imageData, 0, 0);

  // Devuelve la imagen en base64
  return canvas.convertToBlob().then(async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:image/png;base64,${base64}`;
  });
}

// Generar un solo item
async function generarItem(index: number) {
  return {
    nombre: `Producto ${index + 1}`,
    cantidad: Math.floor(Math.random() * 100),
    precio: (Math.random() * 100).toFixed(2),
    imagen: await generarImagenBase64(),
  };
}

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/productos", async () => {
    const productos = await Promise.all(
      Array.from({ length: 100 }, (_, i) => generarItem(i))
    );
    return productos;
  })
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
