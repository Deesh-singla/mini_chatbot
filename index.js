import { ChatMistralAI } from "@langchain/mistralai";
import { configDotenv } from "dotenv";
import readline from "readline";

configDotenv();

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API_KEY
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question("User: ", async (input) => {
        if (input.toLowerCase() === "exit") {
            rl.close();
            return;
        }

        try {
            const res = await model.invoke(input);
            console.log("AI:", res.content);
        } catch (err) {
            console.error("Error:", err.message);
        }

        askQuestion();
    });
}

askQuestion();