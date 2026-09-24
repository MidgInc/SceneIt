import { getHello, getLessons, getLesson } from "../../lib/service.js";

export default async (request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");

  let data;

  if (path === "/hello") {
    data = getHello();
  } else if (path === "/lessons") {
    data = getLessons();
  } else if (path.startsWith("/lessons/")) {
    const id = path.split("/")[2];
    data = getLesson(id);
    if (!data) {
      return new Response(JSON.stringify({ error: "Lesson not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/*" };