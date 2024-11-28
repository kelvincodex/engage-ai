import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

function loadEnv(mode: string): void {
    console.log('mode', mode)
    const envFiles = [
        `.env.${mode}.local`,
        `.env.${mode}`,
        '.env.local',
        '.env'
    ];

    for (const file of envFiles) {
        const filePath = path.resolve(process.cwd(), file);

        if (fs.existsSync(filePath)) {
            const envConfig = dotenv.config({ path: filePath });

            if (envConfig.error) {
                console.warn(`Error loading ${file}:`, envConfig.error);
            } else {
                console.log(`Loaded environment from ${file}`);

                // Explicitly set process.env
                for (const k in envConfig.parsed) {
                    if (Object.prototype.hasOwnProperty.call(envConfig.parsed, k)) {
                        process.env[k] = envConfig.parsed[k];
                    }
                }
            }

            // Break after loading the first existing file
            break;
        }
    }
}
module.exports = loadEnv;