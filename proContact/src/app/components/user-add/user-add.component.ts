import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  contact: any = {
    name: '',
    job: '',
  };

  @Output() create = new EventEmitter<{ name: string; job: string }>();

  constructor() {}

  ngOnInit(): void {}

  onAdd() {
    this.contact.name = this.contact.name.trim();
    this.contact.job = this.contact.job.trim();

    this.create.emit(this.contact);
  }
}
