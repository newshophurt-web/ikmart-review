exports.handler = async function(event, context) {
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing OPENAI_API_KEY in environment variables." })
    };
  }

  const system = `You are a friendly assistant that writes short (1-2 line) positive customer reviews in a mix of Assamese and Hinglish. Keep them natural, short and suitable for Google Maps reviews.`;
  const userPrompt = `Write one short customer review (1-2 lines) for IK MART (Jewellery, Cosmetics, Gifts) in Assamese+Hinglish, upbeat and positive.`;

  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 80,
        temperature: 0.8
      })
    });

    const data = await resp.json();
    const text = (data && data.choices && (data.choices[0].message?.content || data.choices[0].text)) || "IK MART ekdam bhalo shop!";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review: String(text).trim() })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) })
    };
  }
};
