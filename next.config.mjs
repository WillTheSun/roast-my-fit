import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local in the grandparent directory
config({ path: join(__dirname, '..', '.env.local') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration
};

export default nextConfig;
