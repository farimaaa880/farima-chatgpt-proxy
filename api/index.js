// api/index.js
export default async function handler(req, res) {
const OPENAI_API_KEY = "sk‑proj‑VhzgbccyvtcYj6MHmbtHsT__wMJP7HaKbUDksyDGb193rUpvkD0I6AG5j52EiFFW0ZMNPARsulT3BlbkFJG68UD2CtLHGMatvpXcf3U54J9sQAAWLeVjqsN6i_xdQS8HM7Zr-tRq7gSdHh3tWmfXA2PCrxwA";

const user_question = req.query.q || "";
if (!user_question) return res.status(400).json({ error: "سوال خالیه" });

try {
const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-3.5-turbo",
messages: [
{ role: "system", content: "شما یک دستیار هوش مصنوعی هستید." },
{ role: "user", content: user_question }
]
})
});

const data = await openaiRes.json();
if (data.choices && data.choices[0]?.message?.content) {
res.status(200).json({ answer: data.choices[0].message.content.trim() });
} else {
res.status(500).json({ error: "پاسخی دریافت نشد", raw: data });
}
} catch (e) {
res.status(500).json({ error: e.message });
}
}
