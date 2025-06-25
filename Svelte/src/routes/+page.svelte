<script lang="ts">
	let { data } = $props();
	const productos = data.productos;
</script>

<h1 class="text-center text-2xl font-bold mt-4">Productos</h1>

<div
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl mx-auto"
>
	{#each productos as producto}
		<div
			class="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-200 text-center p-4"
		>
			<img
				src={producto.imagen}
				alt="producto"
				class="w-24 h-24 object-cover rounded-lg mx-auto mb-3"
			/>
			<div class="font-semibold text-lg mb-1">{producto.nombre}</div>
			<div class="text-blue-600 mb-1">${producto.precio}</div>
			<div class="text-sm text-gray-600">Cantidad: {producto.cantidad}</div>
		</div>
	{/each}
</div>
