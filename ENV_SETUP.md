# Environment Setup Guide

This project requires several environment variables to run properly. Follow the steps below to configure your `.env` file.

## Quick Start

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in the values for each variable (see below for instructions)

## Environment Variables

### Database Configuration

**DB_HOST**
- The hostname/IP of your MySQL database server
- Default for local development: `localhost`
- Cloud example: `your-db-hostname.mysql.database.azure.com`

**DB_USER**
- MySQL username
- Default for local: `root`

**DB_PASS**
- MySQL password
- Keep this secure and never commit to version control

**DB_NAME**
- Name of your MySQL database
- Default: `bookcover`

### Stripe Configuration

**STRIPE_SECRET_KEY**
- Your Stripe secret API key (starts with `sk_`)
- Get it from: https://dashboard.stripe.com/apikeys
- ⚠️ Keep this secret - never share it

**STRIPE_PUBLISHABLE_KEY**
- Your Stripe publishable API key (starts with `pk_`)
- Get it from: https://dashboard.stripe.com/apikeys
- This can be safely exposed in client code

### Google Gemini API

**API_KEY**
- Your Google Generative AI API key
- Get it from: https://aistudio.google.com/app/apikey
- Required for AI-generated book cover art

### Server Configuration

**PORT**
- The port your API server runs on
- Default: `4000`
- For production, use port `3000` or your hosting provider's default

**NODE_ENV**
- Set to `development` for local development
- Set to `production` for deployed environments

## Local Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up your .env file with local values
cp .env.example .env
# Edit .env and fill in local database credentials

# 3. Make sure MySQL is running
# For Mac with Docker:
docker run --name mysql -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 mysql:8.0

# 4. Create database (if not exists)
mysql -u root -p -e "CREATE DATABASE bookcover;"

# 5. Start development server
npm run dev
```

## Production Deployment (Vercel/Azure)

Set these environment variables in your hosting platform's secrets/configuration:
- DB_HOST
- DB_USER
- DB_PASS
- DB_NAME
- STRIPE_SECRET_KEY
- STRIPE_PUBLISHABLE_KEY
- API_KEY

**Do NOT use the `.env` file in production** - use your platform's secure secrets manager instead.

## Safety Reminders

⚠️ **Important Security Notes:**
- Never commit `.env` file to git (it's already in .gitignore)
- Never share or expose `STRIPE_SECRET_KEY` or `API_KEY`
- Use different keys for development, staging, and production
- Rotate keys regularly
- If a key is accidentally exposed, revoke it immediately
