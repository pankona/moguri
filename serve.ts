import { serve } from "esbuild";

serve(
  { servedir: "public", port: 8000 },
  {
    define: { "process.env.NODE_ENV": process.env.NODE_ENV as string },
    target: "es2015",
    platform: "browser",
    entryPoints: ["src/index.tsx"],
    outfile: "public/dist/bundle.js",
    bundle: true,
  }
).then((server) => {
  console.log(server);
});
