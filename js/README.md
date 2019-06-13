# README

## Intellisense support for Leaflet in Visual Studio Code

With Visual Studio code, if you have TypeScript definitions files for certain
libraries, /// <reference-ing such a definition file will light up
intellisense for that particular library in any JS/TypeScript file that has
that reference tag.

For this to work in the case of leaflet, you need node.js installed and then.

1. Make sure typings is installed  `yarn add typings`
2. From the command line in your project directory, install the TypeScript
   definition file for leaflet `typings install dt~leaflet --global --save`
3. Then in whatever JavaScript you require leaflet intellisense, just add a
reference tag at the top of the file that points to
`$PROJECT_DIR/typings/index.d.ts`

<https://gis.stackexchange.com/questions/197764/is-there-an-editor-for-leaflet-javascript-that-has-intellisense-functionality>

## LINKS

- <https://developers.google.com/fonts/docs/getting_started>
- <https://fonts.google.com>