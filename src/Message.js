import pkg from 'twilio';
import dotenv from 'dotenv';

dotenv.config()
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
 
const client = new pkg(accountSid, authToken, { 
    lazyLoading: true 
});

const sendMessage = async (message, senderID) => {
    try {
        await client.messages.create({
            to: senderID,
            body: message,
            from: `whatsapp:+14155238886`
        });
    } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
    }
};

export default sendMessage;