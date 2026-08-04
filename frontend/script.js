const submitBtn = document.getElementById('submitBtn');
const userPrompt = document.getElementById('userPrompt');
const chatContainer = document.getElementById('chatContainer');

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
        
        chatContainer.innerHTML += `
    <div class="chat-message user-message">
        ${prompt}
    </div>
`;

chatContainer.innerHTML += `
    <div class="chat-message cloudsphere-message">
        ${data.message}
    </div>
`;
userPrompt.value = "";
chatContainer.scrollTop = chatContainer.scrollHeight;

    } catch (error) {
        console.error(error);
        alert('Failed to connect to CloudSphere API');
    }

});

window.addEventListener("load", () => {
    chatContainer.innerHTML = `
        <div class="chat-message cloudsphere-message">
            Welcome to CloudSphere.<br><br>
            I can assist with infrastructure operations, knowledge retrieval and automation.<br><br>
            How may I assist you today?
        </div>
    `;
});

userPrompt.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        submitBtn.click();
    }

});