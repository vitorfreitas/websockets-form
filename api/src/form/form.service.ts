import { Injectable } from '@nestjs/common';

@Injectable()
export class FormService {
  formSaves = {};

  incrementRoomSaveCount(roomId: string) {
    const currentCount = this.formSaves[roomId] || 0;
    this.formSaves[roomId] = currentCount + 1;
  }

  decrementRoomSaveCount(roomId: string) {
    const currentCount = this.formSaves[roomId] || 0;
    this.formSaves[roomId] = currentCount - 1;
  }

  reset(roomId: string) {
    this.formSaves[roomId] = 0;
  }
}
