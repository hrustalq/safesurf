import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/pagination.util';
import { ApiEndpoint, ApiPaginatedResponse, ApiResponse200, ApiErrorResponses } from '../decorators/swagger.decorator';

class ExampleDto {
  id: string;
  name: string;
}

@ApiTags('Examples')
@Controller('examples')
export class ExampleController {
  @Get()
  @ApiEndpoint('Get all examples', 'Retrieves a paginated list of examples')
  @ApiPaginatedResponse(ExampleDto)
  @ApiErrorResponses()
  async findAll(@Query() query: PaginationDto) {
    // Implementation
  }

  @Get(':id')
  @ApiEndpoint('Get example by ID')
  @ApiResponse200(ExampleDto)
  @ApiErrorResponses()
  async findOne() {
    // Implementation
  }
} 