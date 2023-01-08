import { CommonModule } from '@app/common';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [CommonModule],
})
export class CoreModule {}
