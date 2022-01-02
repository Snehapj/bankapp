import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent implements OnInit {

  @Input() item: string | null | undefined
  @Output() onDelete = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.onDelete.emit(this.item)

  }

  cancel() {
    this.onCancel.emit()
  }
}
