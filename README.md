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
 - 
