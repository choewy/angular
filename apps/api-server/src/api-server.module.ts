import { CommonModule } from '@app/common';
import { SchemaModule } from '@app/schema';
import { Module } from '@nestjs/common';
import { ApiServerController } from './api-server.controller';
import { ApiServerService } from './api-server.service';

@Module({
  imports: [CommonModule, SchemaModule],
  controllers: [ApiServerController],
  providers: [ApiServerService],
})
export class ApiServerModule {}
