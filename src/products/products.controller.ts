import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ROLES } from 'src/user/constants/roles.constants';
import { ApiAuth } from 'src/user/decorators/api.decorator';

@ApiAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth([ROLES.EMPLOYEE, ROLES.MANAGER])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Auth([ROLES.EMPLOYEE, ROLES.MANAGER])
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth([ROLES.EMPLOYEE, ROLES.MANAGER])
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findOne(id);
  }

  @Auth([ROLES.EMPLOYEE, ROLES.MANAGER])
  @Get('provider/:id')
  findByProviderId(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.findByProviderId(id);
  }

  @Auth([ROLES.EMPLOYEE, ROLES.MANAGER])
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Auth([ROLES.EMPLOYEE, ROLES.MANAGER])
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.remove(id);
  }
}
