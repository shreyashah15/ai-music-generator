let generatedAudioBlob = null;

function setPrompt(prompt) {
    document.getElementById("prompt").value = prompt;
}

async function generateMusic() {
    const prompt = document.getElementById("prompt").value.trim();
    const duration = document.getElementById("duration").value;

    if (!prompt) {
        showError("Please enter a music description");
        return;
    }

    const generateBtn = document.querySelector(".generate-btn");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    generateBtn.disabled = true;
    loading.style.display = "block";
    result.style.display = "none";
    clearError();

    try {
        const response = await fetch("https://shreyashah15-musicgen-api.hf.space/run/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: [prompt, parseInt(duration)]
            })
        });

        if (!response.ok) {
            throw new Error("Server error: " + response.status);
        }

        const resultJson = await response.json();
        const audioUrl = resultJson.data[0];

        if (!audioUrl || typeof audioUrl !== "string") {
            throw new Error("No valid audio returned from model.");
        }

        const audioResponse = await fetch(audioUrl);
        const audioBlob = await audioResponse.blob();

        const audioObjectUrl = URL.createObjectURL(audioBlob);

        const audioPlayer = document.getElementById("audioPlayer");
        const downloadBtn = document.getElementById("downloadBtn");

        audioPlayer.src = audioObjectUrl;
        downloadBtn.href = audioObjectUrl;
        downloadBtn.download = `generated_music_${Date.now()}.wav`;

        result.style.display = "block";

    } catch (error) {
        console.error(error);
        showError(error.message || "Failed to generate music. Please try again.");
    } finally {
        generateBtn.disabled = false;
        loading.style.display = "none";
    }
}

function showError(message) {
    clearError();
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = message;
    document.querySelector(".container").appendChild(errorDiv);
}

function clearError() {
    const existingError = document.querySelector(".error");
    if (existingError) {
        existingError.remove();
    }
}

// Optional: Save API key (if needed later)
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        generateMusic();
    }
});
