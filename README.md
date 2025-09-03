# Weather Assistant
# Overview
I designed this as a conversational weather assistant that understands natural language queries. Instead of traditional weather apps with forms and dropdowns, users can ask questions like "Will it rain in Tokyo tomorrow evening?" and get intelligent responses.

# Technology Stack
 - FrontEnd : React Js
 - Styling: CSS
 - Model: Large Language Models(LLMs)
 - Additional: Weather API, GeoCoding API, Hugging Face API
 
# API Used
1. Open-Meteo Weather API
    Purpose -Free, reliable weather data with hourly forecasts
            -No API key required, excellent data quality, supports global locations
3. Open-Meteo Geocoding API
    Purpose -Convert city names to coordinates
            -Weather API requires lat/lng coordinates, not city names
4. Hugging Face Inference API
   Purpose -Extract entities from user queries and generate friendly weather advice
# Authentication
- Requires API key (stored in localStorage for demo purposes)
- User enters Hugging Face API key (one-time setup)
- We can directly put API key on client side but which is not a good practice.
  So when User open this site, he has to enter API Key (Hugging Face API).
  Then it takes to main application, This is one kind of login Page.
# How to Run
 Prerequisites
 - Node.js
 - npm
 - Hugging Face API Key
# Clone the Project
https://github.com/Navakanth99/WeatherAssistant.git
# Screen Shots
<img width="1920" height="1080" alt="Screenshot (385)" src="https://github.com/user-attachments/assets/d867afb2-b71c-4210-bc20-b5321bf3c109" />

<img width="1920" height="1080" alt="Screenshot (386)" src="https://github.com/user-attachments/assets/cce1a4b6-6b89-456b-844b-9ba8f3cca527" /> 

Live Project Link 
https://weather-assistant-6yo5.vercel.app/
