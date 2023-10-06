import { Hono } from "hono";
import { handle } from "hono/vercel";

import { number, object, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";

export const runtime = "edge";

const schema = object({
  name: string(),
  age: number(),
});

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello23 Next.js!",
  });
});

app.post("/author", vValidator("json", schema), (c) => {
  const data = c.req.valid("json");
  return c.json({
    success: true,
    message: `${data.name} is ${data.age}`,
  });
});

export const GET = handle(app);

export const POST = handle(app);
