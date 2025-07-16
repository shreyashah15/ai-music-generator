# 🎵 AI Music Generator

A fun and interactive web app to generate music from text prompts using Facebook's MusicGen model.

## 🚀 Live Demo
Hosted with GitHub Pages: [https://shreyashah15.github.io/ai-music-generator](https://shreyashah15.github.io/ai-music-generator)

## ✨ Features
- Generate music from natural language descriptions
- Choose duration (10s, 20s, 30s)
- Play and download the generated track

## 🛠️ Tech Stack
- HTML, CSS, JavaScript (Frontend)
- Hugging Face Space with Gradio and MusicGen (Backend)

## 🔧 How It Works
1. Enter a prompt (e.g., "upbeat electronic music with heavy bass")
2. Choose duration
3. Click "Generate Music"
4. The app sends the input to your Hugging Face Space API
5. Receives and plays back a generated `.wav` file

## 🔗 Backend API
Deployed at: [`https://shreyashah15-musicgen-api.hf.space`](https://shreyashah15-musicgen-api.hf.space)

## 📦 Setup Locally
Clone this repo and open `index.html` in any browser:
```bash
git clone https://github.com/shreyashah15/ai-music-generator.git
cd ai-music-generator
```

## 🧠 Credits
- [Meta MusicGen](https://huggingface.co/facebook/musicgen-small)
- [Gradio](https://gradio.app)
- [Hugging Face Spaces](https://huggingface.co/spaces)