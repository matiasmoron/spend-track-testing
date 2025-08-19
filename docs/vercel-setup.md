# Vercel Deployment Setup Guide

This guide helps you set up automated deployment of Playwright test reports to Vercel.

## Prerequisites

- Vercel account
- GitHub repository with this codebase
- Node.js and yarn/npm installed

## Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

## Step 2: Initial Vercel Setup

1. Navigate to your project directory
2. Run the Vercel setup:

```bash
cd /path/to/spend-track-testing
vercel
```

3. Follow the prompts:
   - **Set up and deploy?** → Yes
   - **Which scope?** → Your personal account or team
   - **Link to existing project?** → No (first time)
   - **Project name** → `spend-track-testing-reports` (or your preference)
   - **Directory** → `./` (root directory)
   - **Override settings?** → No

## Step 3: Configure Vercel Project

The `vercel.json` configuration is already set up to:

- Build the `playwright-report` directory
- Serve HTML reports as static files
- Use clean URLs

## Step 4: Get Vercel Token

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Create a new token
3. Copy the token value

## Step 5: Configure GitHub Repository

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add a new repository secret:
   - **Name**: `VERCEL_TOKEN`
   - **Value**: The token from Step 4

## Step 6: Configure Vercel Environment Variables (Optional)

If your tests need environment variables:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add your variables:
   - `APP_URL`
   - `TEST_EMAIL`
   - `TEST_PASSWORD`

## Step 7: Test the Setup

1. Push changes to your repository
2. Check the GitHub Actions workflow runs
3. Verify the deployment in Vercel dashboard
4. Visit your Vercel URL to see the test reports

## Manual Deployment

You can also deploy manually:

```bash
# Run tests and generate reports
yarn build:reports

# Deploy to Vercel
yarn deploy:reports

# Or use the convenience script
./scripts/deploy-reports.sh --deploy
```

## Troubleshooting

### Common Issues

1. **Token Issues**: Make sure `VERCEL_TOKEN` is correctly set in GitHub secrets
2. **Build Failures**: Check that `playwright-report` directory exists after tests
3. **Permission Errors**: Ensure Vercel has access to your GitHub repository

### Debugging Commands

```bash
# Check Vercel project status
vercel list

# View deployment logs
vercel logs [deployment-url]

# Test local build
yarn build:reports
vercel dev
```

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions with Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
- [Playwright HTML Reporter](https://playwright.dev/docs/test-reporters#html-reporter)

## Success Criteria

When properly configured, you should see:

✅ GitHub Actions workflow completes successfully  
✅ Vercel deployment succeeds  
✅ Test reports are accessible via Vercel URL  
✅ New commits trigger automatic deployments  
✅ Pull requests get automated test result comments

---

**Next Steps**: After setup, your test reports will be automatically deployed on every push, making it easy to share test results with your team!
