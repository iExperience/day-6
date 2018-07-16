import { DefaultCrudRepository } from '@loopback/repository';
import { DataSource } from 'loopback-datasource-juggler';
import { Pizza } from '../models/pizza';
export declare class PizzaRepository extends DefaultCrudRepository<Pizza, typeof Pizza.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
