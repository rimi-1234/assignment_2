import app from "./app.js";
import config from "./config/index.js";
import { initDB } from "./db/index.js";

// Initialize database connection
initDB();

// Only listen on a port if we are NOT running in Vercel's serverless environment
if (!process.env.VERCEL) {
    app.listen(config.port, () => {
        console.log(`server running at http://localhost:${config.port}`);
    });
}

// Export the app for Vercel to use as a serverless function handler
export default app;
