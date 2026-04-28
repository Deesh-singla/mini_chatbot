import { ChatMistralAI } from "@langchain/mistralai";
import { configDotenv } from "dotenv";
import readline from "readline";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

configDotenv();

const model = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API_KEY
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const chatHistory = [
    new SystemMessage("you are a helpur ai assistent")
]

function askQuestion() {
    rl.question("User: ", async (input) => {
        if (input.toLowerCase() === "exit") {
            rl.close();
            console.log(chatHistory);
            return;
        }

        try {
            chatHistory.push(new HumanMessage(input));
            const res = await model.invoke(input);
            chatHistory.push(new AIMessage(res.content));
            console.log("AI:", res.content);
        } catch (err) {
            console.error("Error:", err.message);
        }

        askQuestion();
    });
}

askQuestion();