import app from './app.js';
import { log } from './utilities/logger.js';

const port = process.env.PORT || 3000;

app.listen(port, () => log(`Server running on port ${port}`));
