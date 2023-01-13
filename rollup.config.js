import { generateSW } from "rollup-plugin-workbox";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import workboxConfig from "./workbox-config.js";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import svelte from "rollup-plugin-svelte";
import serve from "rollup-plugin-serve";
import copy from "rollup-plugin-copy";
import { hash } from "posthtml-hash";
import htmlnano from "htmlnano";
import posthtml from "posthtml";
import rimraf from "rimraf";
import fs from "fs";

const production = !process.env.ROLLUP_WATCH;

// https://github.com/metonym/svelte-rollup-template/blob/0387931372396766fd826b56f3a1dce71ab137a2/rollup.config.js#L16
function hashStaticAssets() {
  return {
    name: "hash-static-assets",
    buildStart() {
      // Cleans the `build` folder
      rimraf.sync("build");
    },
    writeBundle() {
      posthtml([
        // Hashes `bundle.[hash].css` and `bundle.[hash].js`
        hash({ path: "build" }),

        // Minifies `build/index.html`
        // For documentation on custom options, see https://github.com/posthtml/htmlnano
        htmlnano()
      ])
        .process(fs.readFileSync("build/index.html"))
        .then((result) => fs.writeFileSync("build/index.html", result.html));
    }
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "build/bundle.[hash].js"
  },
  plugins: [
    copy({ targets: [
        { src: "public/*", dest: "build" },
        { src: "public/.well-known", dest: "build/" }
      ] }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write("build/bundle.[hash].css", !production);
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"]
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production &&
      serve({
        contentBase: ["build"],
        port: 5000
      }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload({ watch: "build" }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    replace({
      process: JSON.stringify({
        env: {
          isProd: production
        }
      })
    }),
    hashStaticAssets(),
    generateSW(workboxConfig)
  ],
  watch: {
    clearScreen: false
  }
};
