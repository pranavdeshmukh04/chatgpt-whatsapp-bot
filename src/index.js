import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import sendMessage from './Message.js';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config()

const webApp = express();

webApp.use(urlencoded({
    extended: true
}));

webApp.use(json());

const PORT = process.env.PORT;

webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function callChatGPT(text){
    try{
        var textMsg = "Imagine you are a Whatsapp Chatbot. Provide user-friendly responses for [Specify the topic or domain] queries and maintain a conversational tone. User messsage: " + text
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": textMsg}],
        });
       return chatCompletion.choices[0].message.content;
    }
    catch(e) {
        console.log(e);
    }
}

webApp.post('/whatsapp', async (req, res) => {
    let message = req.body.Body;
    let senderID = req.body.From;
    console.log(message);

    if(message.startsWith("#")) {
        callChatGPT(message).then(async result => await sendMessage(result, senderID));
    }

});

webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});