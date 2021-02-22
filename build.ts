import { build } from "esbuild";

const isDev = process.env.NODE_ENV === '"development"';

build({
  define: { "process.env.NODE_ENV": process.env.NODE_ENV as string },
  target: "es2015",
  platform: "browser",
  entryPoints: ["src/index.tsx"],
  outfile: "public/dist/bundle.js",
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
}).catch((err) => {
  console.log("Error:" + JSON.stringify(err));
});
