const speechToText = require('./speechToText');
const summarizeText = require('./summarize');
const summarize = require('./summarize');

// Function to process audio, convert it to text, and summarize the text
async function processAudio(filePath) {
  try {
    // Convert speech to text
    const text = await speechToText(filePath);
    console.log('Text:',text);

    const summarize_text = await summarizeText(text);
    console.log('Summarize:',summarize_text);
  } catch (error) {
    console.error('Error processing audio:', error);
  }
}

// Example usage: process an audio file
const audioFilePath = 'Test/30.mp4'; // Update with your audio file path
processAudio(audioFilePath);