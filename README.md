<div align="center">
 
# 🛰️ SatGuard
### AI-Powered Illegal Mining Detection System
 
<br/>
 
![SatGuard](https://img.shields.io/badge/SatGuard-Illegal%20Mining%20Detection-dc2626?style=for-the-badge&logo=satellite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-22c55e?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/Hackathon-Project-f59e0b?style=for-the-badge)
 
<br/>
 
[![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Sentinel-1 SAR](https://img.shields.io/badge/Sentinel_1_SAR-1a73e8?style=flat-square&logo=googleearth&logoColor=white)](https://sentinel.esa.int)
 
<br/>
 
> **Detecting illegal mining activities using Satellite Imagery, AI/ML, and Real-Time Alerts — protecting the environment, one pixel at a time.**
 
</div>
 
---
 ## 🚀 Live Demo
 
| | Link |
|---|---|
| 🌐 **Frontend** | [https://sat-guard.vercel.app](https://sat-guard.vercel.app) |
| 🟢 **API (Swagger Docs)** | [https://illegal-mining-api.onrender.com/api/docs](https://illegal-mining-api.onrender.com/api/docs) |
 
> ⚠️ **Note:** Backend is hosted on **Render Free Tier** — it may take **30–60 seconds to wake up** on first load. Please wait and refresh if it shows an error.
 
---
## 📌 Overview
 
**SatGuard** is an intelligent monitoring platform that uses **Sentinel-2 SAR satellite imagery** and **AI-based analysis** to detect unauthorized and illegal mining activities across large geographical areas.
 
It empowers environmental agencies and law enforcement to:
- 🔍 Identify suspicious land-use changes automatically
- 📍 Track exact coordinates of illegal mining zones
- ⚡ Receive real-time alerts for immediate action
- 📊 Visualize mining trends over time on an interactive dashboard
 
---
 
## ✨ Features
 
| Feature | Description |
|---|---|
| 🛰️ **Satellite Monitoring** | Detects land-use changes using Sentinel-2 SAR imagery |
| 🤖 **AI Detection** | Identifies illegal mining patterns using trained ML models |
| 📍 **Location Tracking** | Pinpoints exact GPS coordinates of suspicious zones |
| ⚠️ **Risk Classification** | Classifies areas as Low / Medium / High / Critical risk |
| 📊 **Analytics Dashboard** | Visualizes mining activity trends and comparisons |
| 🔔 **Notification System** | Sends real-time alerts & email reports to authorities |
| 🗺️ **Map View** | Interactive map with 2D/3D visualization of flagged zones |
| 🔐 **Secure Access** | Role-based authentication for admins and officials |
 
---
 
## 🛠️ Tech Stack
 
### Frontend
![React Native](https://img.shields.io/badge/React%20Native-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
 
### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
 
### Database
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
 
### AI / ML
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=tensorflow&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white)
 
### Satellite Data
[![Sentinel-1 SAR](https://img.shields.io/badge/Sentinel_1_SAR-1a73e8?style=flat-square&logo=googleearth&logoColor=white)](https://sentinel.esa.int)
 
---
  
## ⚙️ Installation & Setup
 
### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB
- Expo CLI
 
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ishikagoyal9/SatGuard.git
cd SatGuard
```
 
### 2️⃣ Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your MongoDB URI and API keys in .env
uvicorn main:app --reload
```
 
### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npx expo start
```
 
---
 
## 📊 How It Works
 
```
  Sentinel-2 SAR Images
        ↓
 Preprocessing & Cleaning
        ↓
    AI Model Inference
        ↓
  Risk Classification
  (Low / Medium / High / Critical)
        ↓
 Dashboard + Map Visualization
        ↓
  Real-Time Alerts to Authorities
```
 
---
 
## 🎯 Problem Statement
 
Illegal mining causes severe **environmental damage**, **revenue loss** to governments, and poses serious **safety risks** to communities. Existing monitoring systems are slow, manual, and cover limited areas.
 
**SatGuard** provides an automated, scalable, real-time solution — using AI and satellite data to detect and prevent illegal mining activities before they escalate.
 
---
 
## 👥 Team
 
| Name | Role |
|---|---|
| Diya Jain    | Backend Engineer  |
| Ishika Goyal | AI/ML Engineer    |
| Deepti Gupta | Frontend Engineer |
 
---
 
<div align="center">
 
**⭐ If you find this project useful, please give it a star!**
 
Made with ❤️ for a better environment 🌿
 
</div>
