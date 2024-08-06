require('dotenv').config();

const axios = require('axios');
const apiKey = process.env.TYP_API_KEY;
const baseUrl = 'https://api.opentyphoon.ai/v1';

const summarizeText = async (text) => {
    if (!apiKey) {
        console.error('TYP_API_KEY is not set in the environment variables.');
        throw new Error('Missing TYP_API_KEY');
    }

    try {
        const response = await axios.post(
            `${baseUrl}/chat/completions`,
            {
                model: "typhoon-v1.5x-70b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "คุณเป็นผู้ช่วยที่เป็นประโยชน์ คุณต้องตอบเฉพาะในภาษาไทยเท่านั้น และคุณเป็นโมเดลภาษาขนาดใหญ่ที่ถูกฝึกมาเพื่อช่วยในการสรุปข้อความ\
                         กรุณาวิเคราะห์ข้อความที่ให้มาและให้ผลลัพธ์ในรูปแบบดังนี้: \n\n1.\
                         สรุป:[ให้สรุปโดยเป็นรูปเเบบบูลเลทพ้อย ห้า ประเด็นหลักสำคัญจากข้อความโดยใช้คำที่เข้าใจง่ายโดยใช้ตัวเลขนำหน้าประโยคเช่น 1.ตัวอย่าง 2.ตัวอย่าง สรุปโดยไม่ใช้คำราชาศัพท์ ใช้โทนการเขียนที่น่าสนใจเเละง่ายต่อความเข้าใจ]\
                          "
                    },
                    { 
                        role: "user", 
                        content: text 
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
            const summarizedText = response.data.choices[0].message.content;
            return summarizedText;
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        if (error.response) {
            console.error('Error summarizing text:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Error summarizing text: No response received', error.request);
        } else {
            console.error('Error summarizing text:', error.message);
        }
        throw error;
    }
};

module.exports = summarizeText;
