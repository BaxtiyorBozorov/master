import { Controller, Get } from "@nestjs/common";

import { CategoryService } from "./category.service";
import { CategoryInterface } from "./entity/category.interface";

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Get('findAll')
  async findAll(): Promise<{ data: CategoryInterface[] }> {
    const result = await this.categoryService.findByQuery({});
    return {
      data: result
    }
  
  }
}