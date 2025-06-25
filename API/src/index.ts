import { Elysia } from "elysia";
import { createCanvas } from "canvas";

function generarImagenBase64(): string {
  const width = 100;
  const height = 100;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.floor(Math.random() * 256); // Relleno aleatorio RGBA
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL(); // Devuelve base64
}

function generarItem(index: number) {
  return {
    nombre: `Producto ${index + 1}`,
    cantidad: Math.floor(Math.random() * 100),
    precio: (Math.random() * 100).toFixed(2),
    imagen: generarImagenBase64(),
  };
}

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/productos", () => {
    const productos = Array.from({ length: 50 }, (_, i) => generarItem(i));
    return productos;
  })
  .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

