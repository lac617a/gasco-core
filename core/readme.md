# @gasco/core

[Gasco](https://gasco-web-component.herokuapp.com/) es un Framework que facilita la creación de aplicaciones web nativas y progresivas de alta calidad con tecnologías web.

El paquete `@gasco/core` contiene los componentes web que conforman los componentes básicos de la interfaz de usuario reutilizables de Gasco Framework. Estos componentes están diseñados para usarse en bibliotecas/Frameworks  (como [Stencil](https://stenciljs.com/), React, Angular o Vue), o solos a través de JavaScript tradicional en el navegador.

## Características

* Representación asíncrona
* No se requiere construir o compilar
* Componentes con carga diferida sin configuración
* Simplemente agregue los archivos estáticos a cualquier proyecto
* Componentes diminutos y altamente optimizados creados con [Stencil](https://stenciljs.com/)

## Cómo utilizarlos

### Vanilla HTML

La forma más fácil de comenzar a usar `@gasco/core` es agregar una etiqueta de secuencia de comandos a la CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@gasco/core/dist/gasco/gasco.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@gasco/core/dist/gasco/gasco.js"></script>
<link href="https://cdn.jsdelivr.net/npm/@gasco/core/css/gasco.bundle.css" rel="stylesheet">
```
Cualquier componente Gasco agregado a la página web se cargará automáticamente. Esto incluye escribir la etiqueta del componente directamente en HTML o usar JavaScript como `document.createElement('gasco-button')`.

Además, dentro de este paquete hay un archivo `dist/gasco.js` y el directorio adjunto `dist/gasco/`. Estos son los mismos archivos que usa la CDN y están disponibles en este paquete para que puedan ser parte del desarrollo local de una aplicación.

## Framework Bindings

El paquete `@gasco/core` se puede usar en HTML simple o JavaScript estándar sin ningún marco. Gasco también tiene paquetes que facilitan la integración de Gasco en el ecosistema y los patrones tradicionales de un Framework. (Sin embargo, en el marco de trabajo de nivel más bajo, los enlaces aún usan `@gasco/core` y Web Components).

### Uso de controladores superpuestos

Al usar un controlador de superposición, los desarrolladores deberán definir el componente de superposición antes de poder usarlo. A continuación se muestra un ejemplo del uso de `toastController`:


```typescript
import { defineCustomElement } from '@gasco/core/components/gasco-toast.js';
import { toastController } from '@gasco/core/components';

defineCustomElement();

const showToast = async () => {
  const modal = await toastController.create({ ... });
  
  ...
}
```
