import Model from '../../../../database/orm.js';
import Role from './role.js';

export default class Permission extends Model {
  static tableName = 'permissions';

  id!: number;
  name!: string;

  static relationMappings = {
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: 'permissions.id',
        through: {
          from: 'role_permissions.permission_id',
          to: 'role_permissions.role_id',
        },
        to: 'roles.id',
      },
    },
  };
}
