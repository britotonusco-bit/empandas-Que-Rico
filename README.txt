# EMPANADAS QUE RICO — PANEL + INDEX CONECTADOS

## Fuente única del menú
El `index.html` y el `panel.html` usan la tabla `public.productos` de Supabase.
El panel permite editar esa tabla y el index lee esos mismos datos.

## Instalación
1. Ejecuta `supabase_integracion.sql` completo en Supabase.
2. Ejecuta `sincronizar_menu_actual.sql` una vez.
3. Deja juntos estos archivos:
   - index.html
   - estilos.css
   - script.js
   - config.js
   - logo-empanadas-que-rico.png
   - panel.html
   - panel.css
   - panel.js

No necesitas GitHub ni hosting para probarlos localmente.

## Menú sincronizado
La sincronización contiene los 83 productos que aparecen en el `index` entregado.
Los productos antiguos que no pertenecen a ese menú se eliminan de `public.productos`.
Por eso las papas antiguas que no aparecen en el index tampoco volverán a aparecer en el panel.

## Sucursales
- Bombay / Centro: solo menú, sin domicilios ni checkout.
- Barrio El Modelo / Cuba: pedidos y domicilios.
- Barrio Providencia / Circunvalar: pedidos y domicilios.

## Categorías del panel
El panel usa exactamente las categorías del menú:
Papas rellenas, Empanadas, Arepas, Mega empanadas de 30 cm, Coca-Cola, Postobón, Congeladas y Salsas.

## Importante
`config.js` contiene solamente la clave publicable de Supabase.
