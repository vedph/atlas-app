# AtlasPlacePicker

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

Note: there are issues when including `mapbox-gl-draw-rectangle-restrict-area` as it has no typings. I tried adding an empty module declaration in `global.d.ts`, in the app and also in the library, without success (see the respective files `tsconfig.app.json` and `tsconfig.lib.json`). So I ended up setting `noImplicitAny` in `tsconfig.json` (see <https://www.detroitlabs.com/blog/2018/02/28/adding-custom-type-definitions-to-a-third-party-library/>).

## Code scaffolding

Run `ng generate component component-name --project atlas-place-picker` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project atlas-place-picker`.
> Note: Don't forget to add `--project atlas-place-picker` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build atlas-place-picker` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build atlas-place-picker`, go to the dist folder `cd dist/atlas-place-picker` and run `npm publish`.

## Running unit tests

Run `ng test atlas-place-picker` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
