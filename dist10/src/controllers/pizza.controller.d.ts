import { Pizza } from "../models/pizza";
import { PizzaRepository } from "../repositories/pizza.repository";
export declare class PizzaController {
    private pizzaRepo;
    constructor(pizzaRepo: PizzaRepository);
    getAllPizzas(toppings: string): Promise<Array<any>>;
    getSpecificPizza(pizzaId: string): any;
    createPizza(pizza: Pizza): Promise<Pizza>;
}
