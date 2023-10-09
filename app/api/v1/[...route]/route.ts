import { Hono } from "hono";
import { handle } from "hono/vercel";

import { number, object, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";
import getAllQuotes from "@/lib/getAllQuotes";
import getRandomQuote from "@/lib/getRandomQuotes";
import getAllUsers from "@/lib/getUsers";

export const runtime = "edge";

const schema = object({
  name: string(),
  age: number(),
});

const app = new Hono().basePath("/api/v1");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello23 Next.js!",
  });
});

app.get("/quotes", async (c) => {
  const quotes = await getAllQuotes();

  return c.json({
    message: quotes,
  });
});

app.get("/quote", async (c) => {
  const quotes = await getRandomQuote();

  return c.json({
    message: quotes,
  });
});

app.get("/users", async (c) => {
  const users = await getAllUsers();

  return c.json({
    message: users,
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
