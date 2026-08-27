# Chatbot deployment

## Local development

1. Install Node.js 18 or newer.
2. Run `npm install` in the project root.
3. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.
4. Set `FRONTEND_URL` to the local site origin if needed.
5. Start the API with `npm start`.
6. Serve the site with VS Code Live Server, then open the site through that server.

The browser automatically uses port 3000 only when the page is opened on `localhost` or `127.0.0.1`. Production pages use `/api` unless a build-time API URL is configured.

## Backend deployment

Netlify deployment is supported directly through `netlify/functions`. The default production API is same-origin `/api`, which Netlify redirects to these Functions. This is the simplest option for this static site.

If you prefer a separate backend, deploy the existing Node/Express project containing `server.js` to a Node host such as Render, Railway, Fly.io, or a VPS. Configure these server environment variables on that host:

- `OPENAI_API_KEY`: server-side OpenAI key
- `OPENAI_MODEL`: optional model name, default `gpt-3.5-turbo`
- `PORT`: provided by the host, or `3000` locally
- `FRONTEND_URL`: comma-separated production frontend origins, for example `https://www.easyloanservices.in,https://easyloanservices.in`

The backend health check is `GET /api/health`. The chatbot endpoint is `POST /api/chat`; lead capture is `POST /api/lead`.

## Netlify deployment

This is a static HTML site, so Netlify does not expose environment variables directly to browser JavaScript. The included Netlify build runs `npm run build`, which reads `LOAN_API_URL` (or `VITE_API_URL`) and generates the public runtime config.

In Netlify, open **Site configuration > Environment variables**, add:

`LOAN_API_URL=https://your-real-backend-host.example.com`

Use the real public URL of the deployed Express backend. Do not use a placeholder, `localhost`, or `127.0.0.1`. Trigger a new deploy after adding or changing it.

For the included Netlify Functions, leave `LOAN_API_URL` empty and the frontend will use `/api`. Set `OPENAI_API_KEY` in Netlify as a server environment variable; it is never placed in browser code.

## Verification

After deployment, open the browser developer network panel and send `hello`. Confirm the request goes to the configured public backend `/api/chat`, returns HTTP 200, and the assistant response appears in the chat. Also submit the lead form and confirm `/api/lead` returns a lead ID.
