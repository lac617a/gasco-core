<p  align="center"><a  href="#"><img  alt="Gasco"  src="https://gasco-web-component.herokuapp.com/img/gasco-web-component.svg"  /></a></p>

<h1  align="center">Gasco web components</h1>

<p  align="center">Gasco es un conjunto de herramientas de desarrollo para crear aplicaciones web progresivas y multiplataforma modernas, rápidas y de alta calidad a partir de una única base de código con JavaScript y la Web.</p>

<p  align="center">Gasco se basa en <a  href="https://www.webcomponents.org/introduction">Web Components</a>, lo que permite mejoras significativas en el rendimiento, la usabilidad y las funciones junto con la compatibilidad con framework web populares como <a  href="https://angular.io/">Angular</a>, <a  href="https://reactjs.com/">React</a> y <a  href="https://vuejs.org/">Vue</a>.</p>

##  License

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/lac617a/gasco-core/blob/master/LICENSE)

###  Packages

| Project | Package | Version | Downloads| Links |
| ------- | ------- | ------- | -------- |:-----:|
| **Core** | [`@gasco/core`](https://www.npmjs.com/package/@gasco/core) | [![version](https://img.shields.io/npm/v/@gasco/core/latest.svg)](https://www.npmjs.com/package/@gasco/core) | <a  href="https://www.npmjs.com/package/@gasco/core"  target="_blank"><img  src="https://img.shields.io/npm/dm/@gasco/core.svg"  alt="NPM Downloads" /></a> | [`README.md`](/core/README.md)

##  :hammer:¿Como funciona el proyecto gasco web component?

###  :file_folder:Funcionalidades de directorios

* :open_file_folder:core
	* |-:file_folder:scripts
	* |-:file_folder:src
		* |-:file_folder:components
		* |-:file_folder:constant
		* |-:file_folder:css
		* |-:file_folder:global
		* |-:file_folder:themes
		* |-:file_folder:utils
* :file_folder:packages

###  :file_folder:core
Es la carpeta principal y sobre todo la mas importante, ya que esta contiene todo lo necesario para que los componentes funcionen correctamente.
>**:file_folder:scripts**:  Tenemos ciertos archivos que cumplen con un rol en especifico, nos ayuda a mantener nuestro archivos organizados, cuando los compilamos.
>
>**:file_folder:src**: Como cualquier otro proyecto siempre tenemos `source` o conocido también como `src` el cual nos apoya a mantener una estructura de carpetas organizadas dentro de ella.
		
*	>**:file_folder:components**: Aquí podemos encontrar todos los componentes ya funcional y su estructura.
*	>**:file_folder:constant**: Nos apoyamos de unas constante para tener mejor seguridad del proyecto a la hora de cualquier cambio global.
*	>**:file_folder:css**: En esta carpeta encontraremos unos cuantos archivos con `estilos` los cuales podemos personalizar a una gran escala para su uso global fuera y dentro del sistema de gasco web components.
*	>**:file_folder:global**: Como su nombre lo indica, tenemos unos archivos  globales los cuales se usan para poder iniciar el framework.
*	>**:file_folder:themes**: Aquí encontraremos archivos `scss` los cuales nos ayudan a darle unas que otras estilos a nuestro componentes de manera interna.
*	>**:file_folder:utils**: Esta carpeta tiene cosas interesantes, esta conformada por `subcarpetas` y `archivos`, los cuales les da el mejor rendimiento a nuestro framework. Tanto así que el rendimiento es único.

###  :file_folder:packages
Directorio donde podrán hacer los nuevos componentes para React y Vue por separados. Esto se hacer por parte de Stencil y su manera de trabajo por hilos.
