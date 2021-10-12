import { Component, OnInit } from '@angular/core';
import { ContactsStore } from 'src/app/store/contacts.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  search = false;

  constructor(private contactsStore: ContactsStore) {}

  ngOnInit(): void {}

  showSearch() {
    this.search = true;
  }
  hideSearch() {
    this.search = false;
  }

  searchContacts(searchString: string): void {
    // console.log(searchString);
    this.contactsStore.patchState({ searchString });
  }

  addContact() {
    this.contactsStore.showAddDialog();
  }
}
