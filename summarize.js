require('dotenv').config();

const axios = require('axios');
const apiKey = process.env.TYP_API_KEY;
const baseUrl = 'https://api.opentyphoon.ai/v1';

const summarizeText = async (text) => {
    try {
        const response = await axios.post(
            `${baseUrl}/chat/completions`,
            {
                model: "typhoon-v1.5x-70b-instruct",
                messages: [
                {
                    "role": "system",
                    "content": "คุณเป็นผู้ช่วยที่เป็นประโยชน์ คุณต้องตอบเฉพาะในภาษาไทยเท่านั้น และคุณเป็นโมเดลภาษาขนาดใหญ่ที่ถูกฝึกมาเพื่อช่วยในการสรุปข้อความ กรุณาวิเคราะห์ข้อความที่ให้มาและให้ผลลัพธ์ในรูปแบบดังนี้: \n\n1. **สรุป:** [ให้สรุปอย่างสั้น ๆ ของประเด็นหลักจากข้อความโดยใช้ภาษาง่ายๆ]"
                },
                { 
                    role: "user", 
                    content: text 
                }
            ]},
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        // Extract the summarized text from the response
        const summarizedText = response.data.choices[0].message.content;
        return summarizedText;
    } catch (error) {
        console.error('Error summarizing text:', error);
    }
};

module.exports = summarizeText;