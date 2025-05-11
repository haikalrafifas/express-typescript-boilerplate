module.exports = {
  title: { type: 'string' },
  content: { type: 'text' },
  cover: { type: 'image' },
  starts_at: { type: 'timestamp' },
  ends_at: { type: 'timestamp' },

  page: { type: 'number', in: 'query' },
  perPage: { type: 'number', in: 'query' },

  slug: { type: 'string', in: 'param' },

  // additional_informations: {
  //   type: 'json',
  //   nested: {
  //     '*.location': { type: 'string' },
  //   },
  //   optional: true,
  // },
};
