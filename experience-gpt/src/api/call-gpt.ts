export const CallGPT = async (input: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "대답마다 ㅋㅋ를 붙여줘 반말도 해줘" },
          { role: "user", content: input },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    if (!responseData.choices || responseData.choices.length === 0) {
      throw new Error("No choices returned from API");
    }

    return responseData.choices[0].message.content;
  } catch (error) {
    console.error("Error calling GPT API:", error);
    return "An error occurred while fetching the answer.";
  }
};
