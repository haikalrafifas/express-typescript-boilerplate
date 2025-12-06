import authV1 from '@/domains/v1/auth/route';
import bookV1 from '@/domains/v1/books/route';

export default {
  v1: {
    auth: authV1,
    books: bookV1,
  },
};
