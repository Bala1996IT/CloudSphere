const submitBtn = document.getElementById('submitBtn');
const userPrompt = document.getElementById('userPrompt');

submitBtn.addEventListener('click', async () => {

    const prompt = userPrompt.value.trim();

    if (!prompt) {
        alert('Please enter a command.');
        return;
    }

    try {

        const response = await fetch('http://localhost:3000/api/command', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        alert(data.response);

    } catch (error) {
        console.error(error);
        alert('Failed to connect to CloudSphere API');
    }

});