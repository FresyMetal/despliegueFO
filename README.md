# Propuesta de Despliegue de Fibra Óptica en Albalat — ISR Comunicaciones

Este repositorio contiene la presentación interactiva web de nivel premium diseñada por nuestro equipo multidisciplinar (Director de Arte, Diseñador UX/UI Senior, Desarrollador Frontend Senior y Comercial de Telecomunicaciones) para ser expuesta ante la alcaldía del **Ayuntamiento de Albalat**.

El objetivo principal es convencer al ayuntamiento para autorizar el despliegue de la red de fibra óptica **FTTH de última generación** de **ISR Comunicaciones**, presentándonos como su socio tecnológico local y estratégico.

## 🚀 Cómo Ejecutar la Presentación

La aplicación es completamente autocontenida y no requiere ningún servidor de desarrollo local, base de datos ni transpilador de código.

1. Descarga o clona el repositorio.
2. Abre el archivo principal `index.html` en cualquier navegador web moderno (Chrome, Safari, Firefox o Edge).
3. Utiliza los siguientes controles para navegar entre las **11 diapositivas**:
   - **Rueda del ratón (Scroll)** hacia arriba/abajo.
   - **Teclas de flechas** (Derecha/Abajo para avanzar, Izquierda/Arriba para retroceder).
   - **Teclas especializadas** (`Barra espaciadora`, `AvPág` para avanzar; `RePág` para retroceder; `Inicio` para la portada; `Fin` para el cierre).
   - **Menú de hamburguesa** superior derecho para saltar directamente a cualquier sección de la presentación.
   - **Dots indicadores laterales** a la derecha de la pantalla.

---

## 📁 Estructura del Proyecto

```text
despliegueFO/
├── index.html           # Estructura principal y maquetado de las 11 diapositivas.
├── css/
│   └── style.css        # Estilos premium, animaciones, tipografías y adaptabilidad.
├── js/
│   └── app.js           # Lógica de navegación por diapositivas, modal y simuladores interactivos.
├── assets/
│   └── img/
│       ├── hero_albalat.png   # Imagen conceptual premium de portada (Albalat conectada).
│       └── outro_connect.png    # Imagen de cierre sobre alianza tecnológica.
└── README.md            # Este documento de especificaciones técnicas y de diseño.
```

---

## 🎨 Decisiones de Diseño y Arte

* **Estética Apple/Tesla/Stripe:** Uso de un tema oscuro profundo (Obsidiana `#0A0B0F` y Gris Espacial) con contrastes satinados de alta tecnología para dar una sensación institucional y sofisticada, alejándonos de la publicidad convencional.
* **Acentos de Color Vibrantes:** Empleamos colores asociados al flujo de datos físicos:
  - **Cian (`#00F2FE`):** Representa la luz de la fibra óptica y la velocidad.
  - **Violeta (`#7A4FFE`):** Representa la seguridad de datos e infraestructura robusta.
  - **Verde Esmeralda (`#05C46B`):** Representa la cercanía, la sostenibilidad y el compromiso local.
* **Glassmorphism:** Las tarjetas e interfaces interactivas utilizan fondos translúcidos con desenfoque de fondo (`backdrop-filter`) y bordes satinados de 1px para simular capas de vidrio físico flotando en el espacio de la diapositiva.
* **Tipografías Modernas:** Usamos **Outfit** para encabezados e indicadores numéricos grandes por su peso geométrico y limpio, e **Inter** para textos descriptivos por su excelente legibilidad en pantallas de cualquier resolución.

---

## ⚡ Elementos Interactivos Destacados

1. **Mapa Local SVG Animado (Diapositiva 03):** Muestra de manera interactiva la cercanía operativa real entre la sede central en **Gilet** y el municipio de **Albalat** (6 km, ~8 minutos). El trazado de la fibra tiene una animación de flujo pulsante continua y los nodos pulsan concéntricamente indicando actividad de red constante.
2. **Esquema de Flujo de Red Activo (Diapositiva 04):** Muestra el camino que recorren los datos desde el Backbone internacional, pasando por la OLT central en Gilet y distribuyéndose de forma simétrica por las acometidas de Albalat, con un efecto de flujo de paquetes de datos en movimiento.
3. **Simulador de Ancho de Banda (Diapositiva 06):** Permite al alcalde o técnico municipal interactuar con tres niveles de conexión (600M, 1G y 10G) para ver cómo reacciona físicamente el velocímetro mediante rotaciones de aguja animadas por CSS y un contador dinámico que incrementa en tiempo real, acompañando la explicación de usos cotidianos.
4. **Fases del Plan de Despliegue Secuencial (Diapositiva 09):** Cuando se accede a esta sección, la línea de tiempo se auto-dibuja y los hitos se encienden cronológicamente con un efecto de rebote suave (`ease-out-back`). También permite hacer clic individual sobre cualquier fase para examinar los hitos.
5. **Modal de Reunión Técnica Profesional:** Diseñado con un formulario interactivo y respuestas simuladas con tiempos de respuesta de servicio inmediato para dejar clara nuestra agilidad de operador de cercanía.
