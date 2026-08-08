interface Env {
  DB: D1Database;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    if (request.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM chat_sessions ORDER BY timestamp DESC").all();
      const chats = results.map((r: any) => ({
        ...r,
        messages: JSON.parse(r.messages)
      }));
      return new Response(JSON.stringify(chats), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (request.method === "POST") {
      const chat = await request.json();
      await env.DB.prepare(
        "INSERT OR REPLACE INTO chat_sessions (id, title, docType, timestamp, messages) VALUES (?, ?, ?, ?, ?)"
      ).bind(
        chat.id,
        chat.title,
        chat.docType,
        chat.timestamp || Date.now(),
        JSON.stringify(chat.messages)
      ).run();
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (request.method === "DELETE") {
      const id = url.searchParams.get("id");
      if (id) {
        await env.DB.prepare("DELETE FROM chat_sessions WHERE id = ?").bind(id).run();
      } else {
        await env.DB.prepare("DELETE FROM chat_sessions").run();
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    return new Response("Method Not Allowed", { status: 405 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};
