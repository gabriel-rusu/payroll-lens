# Deploying PayrollLens to Cloudflare Pages

This guide walks you through deploying your Angular app to Cloudflare Pages.

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- Your project pushed to GitHub
- A domain registered (or using a Cloudflare Pages subdomain)

## Method 1: Automatic Deployment (Recommended)

### Step 1: Prepare GitHub Secrets

1. Go to your Cloudflare dashboard: https://dash.cloudflare.com
2. Navigate to **Account Settings** → **API Tokens**
3. Create a new API token with the following permissions:
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Account** → **Account Settings** → **Read**
4. Copy the token and save it

5. Get your **Account ID**:
   - Go to **Workers & Pages** in your Cloudflare dashboard
   - Copy your Account ID from the sidebar

6. Go to your GitHub repository:
   - Settings → Secrets and variables → Actions
   - Add two new secrets:
     - `CLOUDFLARE_API_TOKEN` = (paste your API token)
     - `CLOUDFLARE_ACCOUNT_ID` = (paste your Account ID)

### Step 2: Deploy

Push code to your `main` branch. The GitHub Actions workflow will automatically:
1. Install dependencies using Bun
2. Build your Angular app
3. Deploy to Cloudflare Pages

Check the **Actions** tab in GitHub to monitor the deployment.

## Method 2: Manual Deployment via Cloudflare Dashboard

### Step 1: Build Locally

```bash
bun install
bun run build
```

The built files will be in `dist/payroll-lens/browser/`.

### Step 2: Deploy via Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click **Create a project** → **Direct upload**
3. Upload the entire `dist/payroll-lens/browser` directory
4. Wait for deployment to complete

## Method 3: Deploy with Wrangler CLI

### Step 1: Install Wrangler

```bash
npm install -g @cloudflare/wrangler
# or
bun add -g wrangler
```

### Step 2: Authenticate

```bash
wrangler login
```

### Step 3: Build and Deploy

```bash
bun run build
wrangler pages deploy dist/payroll-lens/browser --project-name=payroll-lens
```

## Important Configuration

### SPA Routing with `_redirects`

The `_redirects` file in the root directory handles Angular Router redirects:

```
/* /index.html 200
```

This ensures all routes redirect to `index.html` where your Angular app handles routing.

## Custom Domain Setup

To use a custom domain:

1. Add your domain to Cloudflare
2. In Cloudflare Pages deployment settings, go to **Domains**
3. Click **Add domain** and follow the setup instructions
4. Update your DNS records if needed

## Environment Variables

If your app needs environment variables:

1. In Cloudflare Pages project settings, go to **Environment variables**
2. Add your variables for different environments (production, preview)
3. Rebuild/redeploy to apply changes

Example for API endpoints:

```
VITE_API_URL=https://api.example.com
```

(Note: You'd need to update your app to read from environment variables)

## Performance Tips

- Angular is very efficient; your build should be under 1MB
- Cloudflare Pages automatically minifies and optimizes assets
- Enable caching headers in `wrangler.toml` as needed
- Use Cloudflare's analytics to monitor performance

## Troubleshooting

### Build Fails

- Check that `bun run build` works locally first
- Verify Node/Bun versions match your local environment
- Check for missing dependencies in `package.json`

### 404 on Refresh

Ensure `_redirects` file is properly copied to the output directory:
- The file should be at `_redirects` in your project root
- It will be automatically deployed

### DNS Issues

- Wait a few minutes for DNS changes to propagate
- Verify your domain records in Cloudflare DNS settings

## Rollback

If you need to revert to a previous deployment:

1. Go to your project in Cloudflare Pages
2. Click **Production deployments** or **Preview deployments**
3. Find the previous version and click **Rollback**

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Angular Deployment Guide](https://angular.dev/guide/build)
