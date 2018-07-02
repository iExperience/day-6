import { get, param, HttpErrors, post, requestBody } from "@loopback/rest";
import { Pizza } from "../models/pizza";
import { repository } from "@loopback/repository";
import { PizzaRepository } from "../repositories/pizza.repository";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class PizzaController {

  constructor(
    @repository(PizzaRepository.name) private pizzaRepo: PizzaRepository
  ) {}

  @get("/pizzas")
  async getAllPizzas(
    @param.query.string("toppings") toppings: string
  ): Promise<Array<any>> {
    // var pizzas = []; //new Array<any>();

    // if (toppings == "pineapple") {
    //   pizzas.push("With Pinapple");
    // } else {
    //   pizzas.push("Yum");
    // }

    // return pizzas;

    return await this.pizzaRepo.find();
  }

  @get("/pizzas/{pizzaId}")
  getSpecificPizza(
    @param.path.string("pizzaId") pizzaId: string
  ): any {
    if (pizzaId == "A") {
      return "ABC";
    }

    if (pizzaId == "B") {
      return "BCD";
    }

    throw new HttpErrors.NotFound("Sorry, pizza not found");
  }

  @post("/pizzas")
  async createPizza(
    @requestBody() pizza: Pizza
  ): Promise<Pizza> {
    
    let createdPizza = await this.pizzaRepo.create(pizza);
    return createdPizza;

  }
}
