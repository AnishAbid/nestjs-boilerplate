import { UseFilters, UseInterceptors } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RequestInterceptor } from './request.interceptor';
import { throwError } from 'rxjs';
import { RequestFilter } from './request.filter';

@WebSocketGateway()
export class ApplicationGateway {
    @WebSocketServer()
    private server: Server;
    private io: Socket;
    private clients=[];
    afterInit(server: Server) {
        console.log('Initialized!');
    }
    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
        this.clients.push(client.id)
        console.log("Clients List",this.clients)
    }
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        let index = this.clients.indexOf(client.id);
        this.clients.splice(index, 1);
    }

    public handleBroadCast(data:string){
        console.log(`Boradcast called`);
        this.server.emit("client",data)
        //("client","Hono lolo hono cactus"+data+"")
    }

    @SubscribeMessage('joinRoom')
    private onJoinRoom(client, data){
    
    }

  @SubscribeMessage('push')
  private onPush(client, data) {
    /* 
    Direct emit event to the client by using @ConnectedSocket() client or with just client.
    */
    client.emit('client',"Pakore Lag gay")

    return {
      event: 'pop',
      data,
    };
  }

  @UseInterceptors(RequestInterceptor)
  @SubscribeMessage('getClient')
  private getPathCalled(client, data) {
    return {
      event: 'popClient',
      data: { ...data, path: client.pattern },
    };
  }

  @UseFilters(RequestFilter)
  @SubscribeMessage('getClientWithError')
  private getPathCalledWithError() {
    return throwError(() => new WsException('This is an error'));
  }
}
