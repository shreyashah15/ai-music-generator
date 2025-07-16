
const form = document.getElementById('musicForm');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const errorDiv = document.getElementById('error');
const audioPlayer = document.getElementById('audioPlayer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = document.getElementById('prompt').value;
  loading.style.display = 'block';
  result.style.display = 'none';
  errorDiv.style.display = 'none';

  try {
    // ❗️Replace this with a secure backend in production
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/musicgen-small', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_HUGGINGFACE_TOKEN_HERE',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } })
    });

    if (!response.ok) throw new Error("Error generating music");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    audioPlayer.src = url;
    result.style.display = 'block';
  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = 'block';
  } finally {
    loading.style.display = 'none';
  }
});
