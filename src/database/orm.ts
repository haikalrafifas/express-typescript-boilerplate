/**
 * Initiate Object Relational Mapping
 */
import { Model } from 'objection';
import queryBuilder from './query-builder.js';

Model.knex(queryBuilder);

export default Model;
