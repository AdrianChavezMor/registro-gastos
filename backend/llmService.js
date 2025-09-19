const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store your API key in an environment variable
});

async function getAIResponse_recommendation(gastos_prompt, sumas_prompt)  {
  try {
    
    const response = await client.chat.completions.create({
      model: "gpt-4o", // or "gpt-4o", "gpt-4o-mini"
      messages: [
        { role: "system", content: "You are a finance counselor. You help people make good choices about their money. The prompt you will receive contains expenses records and amount spend by category, return a very specific recomendation based on expenes of the current month. Try to give examples in your recommendation. Make it a very, very short paragraph and in spanish" },
        { role: "user", content: gastos_prompt}
      ],
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
  }
}

module.exports = { getAIResponse_recommendation }
