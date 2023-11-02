import { web } from './application/web.js';
import { logger } from './application/logging.js';

web.listen(8000, () => {
  logger.info('Start App');
});
