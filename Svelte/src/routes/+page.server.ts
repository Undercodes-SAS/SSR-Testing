export async function load({ fetch }) {
	const res = await fetch('http://localhost:5000/productos');
	const productos = await res.json();
	return { productos };
}
