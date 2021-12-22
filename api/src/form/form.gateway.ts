import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FormService } from './form.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class FormGateway {
  @WebSocketServer()
  server: Server;

  constructor(private formService: FormService) {}

  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() content: { roomId: string; field: string; value: string },
  ): void {
    this.server.to(content.roomId).emit('receive_message', content);
  }

  @SubscribeMessage('increment_save')
  incrementSave(@MessageBody() roomId: string): void {
    this.formService.incrementRoomSaveCount(roomId);
    this.server.to(roomId).emit('receive_save_count', {
      roomId,
      saveCount: this.formService.formSaves[roomId],
    });
    if (this.formService.formSaves[roomId] === 3) {
      this.formService.reset(roomId);
    }
  }

  @SubscribeMessage('decrement_save')
  decrementSave(@MessageBody() roomId: string): void {
    this.formService.decrementRoomSaveCount(roomId);
    this.server.to(roomId).emit('receive_save_count', {
      roomId,
      saveCount: this.formService.formSaves[roomId],
    });
  }

  @SubscribeMessage('join_room')
  joinRoom(@MessageBody() roomId: string): void {
    this.server.socketsJoin(roomId);
  }

  @SubscribeMessage('leave_room')
  leaveRoom(@MessageBody() roomId: string): void {
    this.server.socketsLeave(roomId);
  }
}
