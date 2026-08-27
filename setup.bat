@echo off
REM Easy Loan Services Chatbot - Quick Setup & Test Script for Windows
REM This script will:
REM 1. Check if Node.js is installed
REM 2. Install dependencies
REM 3. Check .env file
REM 4. Test the backend

echo.
echo ======================================
echo Easy Loan Services Chatbot - Setup Test
echo ======================================
echo.

REM Check Node.js
echo Step 1: Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please download and install from: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo ✓ Found: %%i
echo.

REM Check npm
echo Step 2: Checking npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm not found!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo ✓ Found: %%i
echo.

REM Check .env file
echo Step 3: Checking .env file...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please run: copy .env.example .env
    echo Then add your OpenAI API key to .env
    pause
    exit /b 1
)
echo ✓ .env file exists
echo.

REM Check if OPENAI_API_KEY is set
for /f "tokens=1,2 delims==" %%A in (.env) do (
    if "%%A"=="OPENAI_API_KEY" (
        if not "%%B"=="" (
            echo ✓ OPENAI_API_KEY is configured
        ) else (
            echo ERROR: OPENAI_API_KEY is empty!
            echo Please add your API key to .env file
            pause
            exit /b 1
        )
    )
)
echo.

REM Install dependencies
echo Step 4: Installing dependencies...
if not exist node_modules (
    echo Running: npm install
    call npm install
    if errorlevel 1 (
        echo ERROR: npm install failed!
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencies already installed
)
echo.

echo ======================================
echo ✓ All checks passed!
echo ======================================
echo.
echo Next steps:
echo 1. Open Terminal 1: Run "node server.js"
echo 2. Open Terminal 2: Open index.html with Live Server
echo 3. Click the chat button on the website
echo.
echo For detailed instructions, see: CHATBOT_SETUP.md
echo.
pause
