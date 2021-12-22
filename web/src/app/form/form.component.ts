import {Component, OnDestroy, OnInit} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {ActivatedRoute} from "@angular/router";
import {Clipboard} from "@angular/cdk/clipboard";
import {MatDialog} from "@angular/material/dialog";
import {FormSuccessDialogComponent} from "../form-success-dialog/form-success-dialog.component";

type FormSocketResponse = {
  field: 'season' | 'food' | 'place'
  value: string
  roomId: string
}

type ReceiveSaveCount = {
  roomId: string
  saveCount: number
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  season: string = ''
  food: string = ''
  place: string = ''

  roomId: string = ''

  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.socket.on('connect', () => {
      this.roomId = `room_${this.route.snapshot.params['id']}`
      this.socket.emit('join_room', this.roomId)
    })
    this.socket.on('receive_message', ({ field, value, roomId }: FormSocketResponse) => {
      if (roomId === this.roomId) {
        this[field] = value
      }
    })
    this.socket.on('receive_save_count', ({ roomId, saveCount }: ReceiveSaveCount) => {
      console.log({ roomId, saveCount })
      if (roomId === this.roomId && saveCount === 3) {
        console.log('form saved')
        this.dialog.open(FormSuccessDialogComponent, {
          disableClose: true
        })
      }
    })
    window.onbeforeunload = () => this.ngOnDestroy()
  }

  ngOnDestroy(): void {
    this.socket.emit('leave_room', this.roomId)
  }

  sendMessage(field: string, value: string) {
    this.socket.emit('send_message', {
      field,
      value,
      roomId: this.roomId
    })
  }

  submit() {
    this.socket.emit('increment_save', this.roomId)
  }

  copyLink() {
    this.clipboard.copy(location.href)
  }
}
