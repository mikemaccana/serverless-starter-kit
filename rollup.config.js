import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import autoPreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";

const isProduction = !process.env.NODE_ENV;
const isDevelopment = !isProduction;

export default {
  input: "src/frontend/main.ts",
  output: {
    sourcemap: isDevelopment,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: isDevelopment,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    typescript({
      tsconfig: "tsconfig-frontend.json",
      sourceMap: isDevelopment,
      inlineSources: isDevelopment,
    }),
    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    isProduction && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
