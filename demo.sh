#!/bin/bash

# BRAINFORCE Landing Page Demo Script
# This script helps you run the landing page locally

echo "🎮 BRAINFORCE Landing Page Demo"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the landing page directory."
    exit 1
fi

echo "✅ Found landing page files"
echo ""

# Check for available web servers
echo "🚀 Starting local web server..."
echo ""

# Try different methods to start a local server
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python 3..."
    echo "📱 Open your browser to: http://localhost:8000"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Using Python 2..."
    echo "📱 Open your browser to: http://localhost:8000"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v node &> /dev/null; then
    echo "🟢 Using Node.js..."
    echo "📱 Open your browser to: http://localhost:3000"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    npx serve . -p 3000
elif command -v php &> /dev/null; then
    echo "🐘 Using PHP..."
    echo "📱 Open your browser to: http://localhost:8000"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000
else
    echo "❌ No web server found. Please install Python, Node.js, or PHP."
    echo ""
    echo "Alternatively, you can:"
    echo "1. Open index.html directly in your browser"
    echo "2. Use any other local web server"
    echo "3. Deploy to a web hosting service"
    exit 1
fi
