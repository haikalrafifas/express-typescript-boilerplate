import app from './app';
import { log } from '@/utilities/logger';

const port = process.env.PORT || 3000;

app.listen(port, () => log(`Server running on port ${port}`));
