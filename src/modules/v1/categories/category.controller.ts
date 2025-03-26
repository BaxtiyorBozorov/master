import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  @Get('findAll')
  async findAll() {
    const result = await this.categoryService.findByQuery({});
    return {
      status: 'succes',
      data: result
    }
  
  }
}