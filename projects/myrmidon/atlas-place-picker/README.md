# Atlas Place Picker

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.3.

Note: there are issues when including `mapbox-gl-draw-rectangle-restrict-area` as it has no typings. I tried adding an empty module declaration in `global.d.ts`, in the app and also in the library, without success (see the respective files `tsconfig.app.json` and `tsconfig.lib.json`). So I ended up setting `noImplicitAny` in `tsconfig.json` (see <https://www.detroitlabs.com/blog/2018/02/28/adding-custom-type-definitions-to-a-third-party-library/>).
