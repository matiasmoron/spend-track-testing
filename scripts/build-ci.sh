#!/bin/bash

# Enhanced build script for CI environments
set -e

echo "🚀 Starting CI build process..."

# Detect environment and install browsers accordingly
if [ -n "$VERCEL" ]; then
    echo "📦 Installing Playwright browsers for Vercel..."
    yarn playwright install chromium
else
    echo "📦 Installing Playwright browsers with dependencies..."
    yarn playwright install --with-deps
fi

# Create playwright-report directory if it doesn't exist
mkdir -p playwright-report

# Run tests and capture exit code
echo "🧪 Running Playwright tests..."
if yarn playwright test --reporter=html --project=chromium; then
    echo "✅ All tests passed!"
    exit_code=0
else
    echo "❌ Some tests failed, but continuing to generate report..."
    exit_code=1
fi

# Ensure we have a report to deploy
if [ ! -f "playwright-report/index.html" ]; then
    echo "⚠️ No HTML report generated, creating fallback..."
    cat > playwright-report/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test Results - Build Failed</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
            margin: 40px; 
            background: #f5f5f5; 
        }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; }
        .error { background: #fee; border-left: 4px solid #e74c3c; padding: 20px; margin: 20px 0; }
        .info { background: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 Test Build Results</h1>
        
        <div class="error">
            <h3>❌ Build Failed</h3>
            <p>The test build failed during execution. This usually means:</p>
            <ul>
                <li>Browsers were not properly installed</li>
                <li>Tests encountered runtime errors</li>
                <li>Network or environment issues</li>
            </ul>
        </div>
        
        <div class="info">
            <h3>🔍 Debugging Steps</h3>
            <ol>
                <li>Check the build logs in Vercel or GitHub Actions</li>
                <li>Verify environment variables are set correctly</li>
                <li>Ensure the target application is accessible</li>
                <li>Run tests locally with: <code>yarn build-reports</code></li>
            </ol>
        </div>
        
        <div class="info">
            <p><strong>Build Time:</strong> $(date)</p>
            <p><strong>Environment:</strong> CI/CD Pipeline</p>
        </div>
    </div>
</body>
</html>
EOF
fi

echo "✅ Build process completed!"
exit $exit_code
