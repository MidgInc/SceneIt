import { getHello, getLessons, getLesson } from "../../lib/service.js";

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async (request) => {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed" }, 405);
  }

  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");

  if (path === "/hello") {
    return json(getHello(), 200);
  }

  if (path === "/lessons") {
    return json(getLessons(), 200);
  }

  if (path.startsWith("/lessons/")) {
    const id = path.split("/")[2];
    const lesson = getLesson(id);
    if (!lesson) {
      return json({ error: "Lesson not found" }, 404);
    }
    return json(lesson, 200);
  }

  return json({ error: "Not found" }, 404);
};

export const config = {
  path: "/api/*",
  rateLimit: {
    windowLimit: 60,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
