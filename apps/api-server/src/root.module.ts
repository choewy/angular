import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { ApiServerModule } from './modules';

@Module({
  imports: [CoreModule, ApiServerModule],
})
export class RootModule {}
