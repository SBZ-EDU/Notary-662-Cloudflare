interface Env {
  DB: D1Database;
}

export const onRequest = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

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
      let query = "SELECT * FROM professionals";
      const params: any[] = [];
      if (type) {
        query += " WHERE type = ?";
        params.push(type);
      }
      const { results } = await env.DB.prepare(query).bind(...params).all();
      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (request.method === "POST") {
      const body = await request.json();
      const professionalsArray = Array.isArray(body.data) ? body.data : [body.data];

      const statements = professionalsArray.map((p: any) =>
        env.DB.prepare(
          "INSERT INTO professionals (name, specialty, address, contact, website, summary, type) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).bind(
          p.name,
          p.specialty,
          p.address,
          p.contact,
          p.website,
          p.summary,
          body.type || type || 'lawyer'
        )
      );

      await env.DB.batch(statements);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    if (request.method === "DELETE") {
      if (type) {
        await env.DB.prepare("DELETE FROM professionals WHERE type = ?").bind(type).run();
      } else {
        await env.DB.prepare("DELETE FROM professionals").run();
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
