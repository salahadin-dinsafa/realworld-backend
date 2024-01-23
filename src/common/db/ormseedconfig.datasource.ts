import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

import { ormConfig } from "./ormconfig.datasource";

const seedDataSource = (): MysqlConnectionOptions => ({
    ...ormConfig(),
    migrations: [__dirname + '/seed/**/*{.ts,.js}'],
})

const datasource: DataSource = new DataSource(seedDataSource());

export default datasource;