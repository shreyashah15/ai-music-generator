async function generateMusic() {
  const prompt = document.getElementById("prompt").value.trim();
  const duration = document.getElementById("duration").value;

  if (!prompt) {
    alert("Please enter a music description.");
    return;
  }

  const generateBtn = document.querySelector(".generate-btn");
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  generateBtn.disabled = true;
  loading.style.display = "block";
  result.style.display = "none";

  try {
    const response = await fetch("https://shreyashah15-musicgen-api.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [prompt, parseInt(duration)] })
    });

    const contentType = response.headers.get("content-type") || "";
    const text = await response.text();

    if (!contentType.includes("application/json")) {
      console.error("Non-JSON response:", text);
      throw new Error("Server responded with an error. Please check the backend logs.");
    }

    const resultJson = JSON.parse(text);
    const audioUrl = resultJson.data?.[0];

    if (!audioUrl) throw new Error("No audio URL returned from the model.");

    const audioResponse = await fetch(audioUrl);
    const audioBlob = await audioResponse.blob();
    const audioObjectUrl = URL.createObjectURL(audioBlob);

    document.getElementById("audioPlayer").src = audioObjectUrl;
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.href = audioObjectUrl;
    downloadBtn.download = `generated_music_${Date.now()}.wav`;

    result.style.display = "block";
  } catch (error) {
    console.error(error);
    alert(error.message || "Something went wrong.");
  } finally {
    generateBtn.disabled = false;
    loading.style.display = "none";
  }
}
