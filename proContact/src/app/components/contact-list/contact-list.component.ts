import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/core/models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[] = [];
  contactsTrackByFn = (index: number, contact: Contact) => contact.id;

  sort = 'AtoZ';

  assending = (a: { first_name: string }, b: { first_name: string }) => {
    let nameA = a.first_name.toLowerCase();
    let nameB = b.first_name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  descending = (a: { first_name: string }, b: { first_name: string }) => {
    let nameA = a.first_name.toLowerCase();
    let nameB = b.first_name.toLowerCase();
    if (nameA < nameB) return 1;
    if (nameA > nameB) return -1;
    return 0;
  };

  constructor() {}

  ngOnInit(): void {}

  onSort() {
    this.contacts =
      this.sort === 'AtoZ'
        ? this.contacts.sort(this.assending)
        : this.contacts.sort(this.descending);
  }
}
