import { build } from "esbuild";

const isDev = process.env.NODE_ENV === '"development"';

build({
  define: { "process.env.NODE_ENV": process.env.NODE_ENV as string },
  target: "es2015",
  platform: "browser",
  entryPoints: ["src/index.tsx"],
  outdir: "public/dist",
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
}).catch((err) => {
  console.log("Error:" + JSON.stringify(err));
  process.exit(1);
});
