import { serve } from "esbuild";

const isDev = process.env.NODE_ENV === '"development"';

serve(
  { servedir: "public", port: 8000 },
  {
    define: { "process.env.NODE_ENV": process.env.NODE_ENV as string },
    target: "es2015",
    platform: "browser",
    entryPoints: ["src/index.tsx"],
    outdir: "public/dist",
    minify: !isDev,
    sourcemap: isDev,
    bundle: true,
  }
).then((server) => {
  console.log(server);
});
