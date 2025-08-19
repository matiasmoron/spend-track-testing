#!/bin/bash

# Script to prepare and deploy test reports to Vercel
# Usage: ./scripts/deploy-reports.sh

set -e

echo "🧪 Preparing test reports for deployment..."

# Run quality checks first
echo "📐 Running code quality checks..."
yarn format:check
yarn type-check
yarn lint

# Generate fresh test reports
echo "🔬 Running tests and generating reports..."
yarn build:reports

# Check if playwright-report directory exists
if [ ! -d "playwright-report" ]; then
    echo "❌ No test reports found. Please run tests first."
    exit 1
fi

# Add deployment info to the report
echo "📝 Adding deployment metadata..."
cat > playwright-report/deployment-info.json << EOF
{
  "deployedAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "gitCommit": "$(git rev-parse HEAD)",
  "gitBranch": "$(git rev-parse --abbrev-ref HEAD)",
  "version": "$(node -p "require('./package.json').version")",
  "environment": "production"
}
EOF

# Create a custom index page if needed
if [ ! -f "playwright-report/index.html" ]; then
    echo "⚠️  No HTML report found. Creating placeholder..."
    cat > playwright-report/index.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>Test Reports - Spend Track Testing</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .status { padding: 20px; border-radius: 8px; margin: 20px 0; }
        .info { background: #e3f2fd; border-left: 4px solid #2196f3; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Spend Track Testing Reports</h1>
            <p>Automated test execution reports</p>
        </div>
        
        <div class="status info">
            <h3>ℹ️ No Recent Test Results</h3>
            <p>No test reports are currently available. This usually means:</p>
            <ul>
                <li>Tests haven't been run yet</li>
                <li>The last test run didn't generate reports</li>
                <li>Reports are being processed</li>
            </ul>
            <p>To generate reports, run: <code>yarn build:reports</code></p>
        </div>
        
        <div class="info">
            <h3>📊 What You'll See Here</h3>
            <p>When tests are run, this page will show:</p>
            <ul>
                <li>✅ Test execution results</li>
                <li>📸 Screenshots and evidence</li>
                <li>🎥 Videos of test failures</li>
                <li>📈 Performance metrics</li>
                <li>🔍 Detailed error analysis</li>
            </ul>
        </div>
    </div>
</body>
</html>
EOF
fi

echo "✅ Reports prepared for deployment!"
echo "📁 Report directory: playwright-report/"
echo "🚀 Deploy with: yarn deploy:reports"

# Optional: Deploy immediately if --deploy flag is passed
if [ "$1" = "--deploy" ]; then
    echo "🚀 Deploying to Vercel..."
    yarn deploy:reports
fi
