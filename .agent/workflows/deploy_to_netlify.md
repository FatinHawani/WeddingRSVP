---
description: How to deploy the Wedding RSVP app to Netlify
---

# Deploy to Netlify

This guide will help you deploy your Next.js application to Netlify.

## Prerequisites

1.  **GitHub Repository**: Ensure your project is pushed to a GitHub repository.
2.  **Netlify Account**: You need a Netlify account.

## Steps

1.  **Push to GitHub**
    If you haven't already, commit your changes and push to GitHub:
    ```bash
    git add .
    git commit -m "Prepare for deployment"
    git push origin main
    ```

2.  **Connect to Netlify**
    - Go to [Netlify](https://app.netlify.com/).
    - Click "Add new site" > "Import an existing project".
    - Select "GitHub".
    - Authorize Netlify to access your GitHub account.
    - Select your `wedding-rsvp` repository.

3.  **Configure Build Settings**
    Netlify should automatically detect the settings, but verify them:
    - **Build command**: `npm run build`
    - **Publish directory**: `.next` (or leave default)

4.  **Add Environment Variables**
    **Crucial Step**: You must add your Supabase keys for the app to work.
    - In the "Site settings" or during the setup wizard, find "Environment variables".
    - Add the following keys (copy values from your local `.env.local` file):
        - `NEXT_PUBLIC_SUPABASE_URL`
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5.  **Deploy**
    - Click "Deploy site".
    - Netlify will build your site. You can watch the build logs.

## Troubleshooting

-   **Build Failures**: Check the build logs. Common issues are type errors or linting errors. Run `npm run build` locally to debug.
-   **Supabase Connection**: If the app loads but data doesn't show, double-check your Environment Variables in Netlify.
