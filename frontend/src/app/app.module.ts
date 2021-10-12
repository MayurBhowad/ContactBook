import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DialogModule } from '@ngneat/dialog';
import { HotToastModule } from '@ngneat/hot-toast';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ContactsComponent, AddContactComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    DialogModule.forRoot(),
    HotToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
