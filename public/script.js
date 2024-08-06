document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const errorElement = document.getElementById('error');
    const textElement = document.getElementById('text');
    const summaryElement = document.getElementById('summary');
    const resultsElement = document.getElementById('results');

    if (!fileInput.files.length) {
        errorElement.textContent = 'Please select a file to upload.';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    errorElement.textContent = '';
    textElement.textContent = '';
    summaryElement.textContent = '';
    resultsElement.style.display = 'none';

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error uploading file');
        }

        const data = await response.json();
        textElement.textContent = data.text;
        summaryElement.textContent = data.summary;
        resultsElement.style.display = 'block';
    } catch (error) {
        errorElement.textContent = 'Error processing file: ' + error.message;
    }
});
