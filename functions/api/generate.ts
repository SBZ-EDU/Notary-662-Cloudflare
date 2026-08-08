interface Env {
  HF_TOKEN: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
    try {
        const body = await context.request.json() as any;
        const lastMessage = body.contents?.[body.contents.length - 1]?.parts?.[0]?.text || "سلام";
        
        // NO HARDCODED TOKENS HERE
        const hfToken = context.env.HF_TOKEN;

        if (!hfToken) {
            return new Response(JSON.stringify({ error: { message: "HF_TOKEN not configured." } }), { status: 500 });
        }

        const modelId = "meta-llama/Llama-3.2-3B-Instruct";
        
        const response = await fetch(
            `https://api-inference.huggingface.co/models/${modelId}`,
            {
                headers: { 
                    "Authorization": `Bearer ${hfToken}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nشما دستیار حقوقی هوشمند دفتر اسناد رسمی ۶۶۲ هستید. پاسخ‌ها را بر اساس قوانین ثبتی ایران و به صورت رسمی ارسال کنید.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${lastMessage}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
                    parameters: { max_new_tokens: 1024, temperature: 0.5 },
                    stream: true
                }),
            }
        );

        if (!response.ok) {
            return new Response(response.body, { status: response.status });
        }

        return new Response(response.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Access-Control-Allow-Origin": "*"
            }
        });

    } catch (e: any) {
        return new Response(`data: {"error": {"message": "${e.message}"}}\n\n`, {
            headers: { "Content-Type": "text/event-stream", "Access-Control-Allow-Origin": "*" }
        });
    }
};
