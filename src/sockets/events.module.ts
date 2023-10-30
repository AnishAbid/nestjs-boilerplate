import { Module } from '@nestjs/common';
import { ApplicationGateway } from './events.gateway';

@Module({
  providers: [ApplicationGateway],
  exports:[ApplicationGateway]
})
export class SocketModule {}