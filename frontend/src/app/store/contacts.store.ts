import { Injectable } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, filter, tap, concatMap } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { ContactsService } from '../services/contacts.service';
import { AddContactComponent } from '../components/add-contact/add-contact.component';

export interface ContactsState {
  contacts: Contact[];
  searchString: string;
}

@Injectable()
export class ContactsStore extends ComponentStore<ContactsState> {
  constructor(
    private contactsServices: ContactsService,
    private toast: HotToastService,
    private dialog: DialogService
  ) {
    super({ contacts: [], searchString: '' });

    this.fetchContacts();
  }

  readonly setContacts = this.updater((state, contacts: Contact[]) => ({
    ...state,
    contacts,
  }));

  readonly fetchContacts = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.contactsServices.fetchContacts().pipe(
          this.toast.observe({
            loading: 'Fetching...',
            success: 'Contacts Fetched!',
            error: 'Could not fetch!',
          }),
          tap((contacts: Contact[]) => {
            this.setContacts(contacts);
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly filteredContacts$: Observable<Contact[]> = this.select(
    ({ contacts, searchString }) =>
      contacts.filter((c) =>
        c.name.toLowerCase().includes(searchString.toLowerCase())
      )
  );

  readonly showAddDialog = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.dialog.open(AddContactComponent).afterClosed$),
      filter((contact) => !!contact),
      tap((contact) => {
        this.addContact(contact);
      })
    )
  );

  readonly addContact = this.effect<any>((contact$) =>
    contact$.pipe(
      concatMap((contact) =>
        this.contactsServices.addContact(contact).pipe(
          tap(() => this.fetchContacts()),
          this.toast.observe({
            loading: 'adding contact...',
            success: 'Contact added!',
            error: 'Could not add!',
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  readonly deleteContact = this.effect<Contact>((contact$) =>
    contact$.pipe(
      concatMap((contact) =>
        this.contactsServices.deleteContact(contact).pipe(
          this.toast.observe({
            loading: 'Deleting contact...',
            success: 'Contact deleted!',
            error: 'could not delete!',
          }),
          tap(() => this.fetchContacts()),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
