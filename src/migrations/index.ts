import * as migration_20260909_182033_init from './20260909_182033_init';

export const migrations = [
  {
    up: migration_20260909_182033_init.up,
    down: migration_20260909_182033_init.down,
    name: '20260909_182033_init'
  },
];
