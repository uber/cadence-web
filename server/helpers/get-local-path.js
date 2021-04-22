import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getLocalPath = filePath => path.join(__dirname, filePath);

export default getLocalPath;
