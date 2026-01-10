import authV1 from '../domains/v1/auth/route.js';
import bookV1 from '../domains/v1/book/route.js';

export default {
  v1: {
    auth: authV1,
    books: bookV1,
  },
};
