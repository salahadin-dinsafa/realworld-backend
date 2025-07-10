import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { ormConfig } from "src/common/db/ormconfig.datasource";

const seedDataSource = (): PostgresConnectionOptions => ({
    ...ormConfig(),
    migrations: [__dirname + '/seed/**/*{.ts,.js}'],
})

const datasource: DataSource = new DataSource(seedDataSource());

export default datasource;