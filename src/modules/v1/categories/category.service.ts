import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/utils/base.service";
import { CategoryInterface } from "./entity/category.interface";


@Injectable()
export class CategoryService extends BaseService<CategoryInterface> {
  constructor() {
    super('categories')
  }
}