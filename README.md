<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/19a25747-f90f-479d-bbc3-03ac69582fe1

## Run Locally

**Prerequisites:**  Node.js


## Deployment

### Deploy to Vercel

1.  Push your changes to your GitHub repository.
2.  Connect your repository to [Vercel](https://vercel.com).
3.  In the Vercel project settings, add the following environment variable:
    -   `GEMINI_API_KEY`: Your Google Gemini API key.
4.  Vercel will automatically detect the Vite framework and deploy your app.

---

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
