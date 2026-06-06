# Deployment Guide: Vercel & Render

This guide explains how to connect and deploy your Attendance Management System:
- **Backend API**: Hosted on **Render** (free-tier Web Service)
- **Frontend App**: Hosted on **Vercel** (free-tier Vite React app)

---

## Step 1: Deploy Backend to Render

Render is ideal for persistent Express servers. 

1. Go to [Render.com](https://render.com/) and log in (using your GitHub account).
2. Click the **New +** button and select **Web Service**.
3. Choose **Connect a repository** and select your `attendance_management-system` repository.
4. Set the following configuration values:
   - **Name**: `attendance-ams-backend` (or any name you prefer)
   - **Region**: Select the region closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend` *(Very Important)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **Deploy Web Service**.
6. Once deployed, copy the **Web Service URL** provided at the top left of the dashboard (e.g., `https://attendance-ams-backend.onrender.com`).

---

## Step 2: Deploy Frontend to Vercel

Vercel is optimized for frontend applications like Vite + React.

1. Go to [Vercel.com](https://vercel.com/) and log in (using your GitHub account).
2. Click **Add New** and select **Project**.
3. Import your `attendance_management-system` repository.
4. In the Project configuration screen:
   - **Framework Preset**: `Vite` (Vercel should auto-detect this)
   - **Root Directory**: Click *Edit* and select **frontend** *(Very Important)*
5. Expand the **Environment Variables** section and add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: The Render backend URL you copied in Step 1, appended with `/api` (e.g., `https://attendance-ams-backend.onrender.com/api`).
6. Click **Deploy**.

---

## Step 3: Connect Frontend and Backend

Once both steps are complete:
1. Your frontend is live on Vercel (e.g., `https://attendance-management-system.vercel.app`).
2. When the frontend loads, it uses the `VITE_API_URL` environment variable to send API requests (such as logging in or marking attendance) to your Render backend.
3. The Render backend communicates with your MongoDB Atlas database automatically.

> [!NOTE]
> Under Render's free tier, the backend web service spins down after 15 minutes of inactivity. When you open the frontend for the first time after some inactivity, the first API request (e.g., logging in) might take 50 seconds to respond while the backend wakes up. This is normal for the free plan.
