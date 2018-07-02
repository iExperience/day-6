import {DefaultCrudRepository} from '@loopback/repository';
import {inject} from '@loopback/core';
import { DataSource } from 'loopback-datasource-juggler';
import { Pizza } from '../models/pizza';

export class PizzaRepository extends DefaultCrudRepository<
  Pizza,
  typeof Pizza.prototype.id
> 

{
    
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Pizza, datasource);
  }
}
