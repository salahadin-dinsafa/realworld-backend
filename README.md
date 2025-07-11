## Description



## Installation
1. pnpm install

## Sync database
1. pnpm run db:migrate
2. pnpm run db:seed

## Environment variable
1. DB_HOST
2. DB_PORT
3. DB_USER
4. DB_NAME
5. DB_PASSWORD
6. JWT_SECRET

## Command
1. pnpm run db:create src/common/db/migration/MigrationName
2. pnpm run db:migrate
3. pnpm run db:seed :- only first time