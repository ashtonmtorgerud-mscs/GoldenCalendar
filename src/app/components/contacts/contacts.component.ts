import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Contact, Yuu, Social, ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  imports: [FormsModule, NgIf, NgFor, RouterLink, NgClass],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {


  constructor(private contactService: ContactService) { }

  log(iString: string) {
    console.log(iString);
  }


  //Pages Stuff
  tags: string[] = ['All', 'Favorites', 'Family', 'Friends', 'Work', 'Academia'];
  selectedPageIndex: number = 0;
  maxPage: number = 1;


  darkMode: boolean = false;



  // Yuus
  defaultYuu: Yuu = new Yuu('/Yuu/Heads/Head1.png', '/Yuu/Eyes/EyesUnknown.png', '/Yuu/Mouths/MouthUnknown.png', '', '', '', '', '',
    [100, 100, 100, 100, 100, 100, 100],
    [0, 0, 100, 100, 100, 100, 100],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [10, 10, 0, 0, 0, 0, 0],
    [10, 10, 0, 0, 0, 0, 0]);


  contacts: Contact[] = [];

  selectedContact: Contact = new Contact(
    0, '', '', '', '', '', [false, false, false, true, false], [], new Date(), this.defaultYuu);
  selectedContactIndex: number = 0;

  ngOnInit() {
    let defaultContact = new Contact(
      0,
      'Mr. Nobody',
      '',
      '',
      '',
      '',
      [false, false, false, true, false],
      [],
      new Date(),
      this.defaultYuu
    );



    this.selectedContact = defaultContact;

    this.GetContacts();

    if (this.selectedPageIndex !== 0) {
      const selectedTagIndex = this.selectedPageIndex - 1;
      this.contacts = this.contacts.filter(contact => contact.tags[selectedTagIndex]);
    }

  }


  GetContacts() {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        if (this.contacts.length > 0) {
          this.selectedContact = this.contacts[0];
          this.selectedContactIndex = 0;
        }
      },
      error: (err) => {
        console.error('Failed to load contacts', err);
      }
    });
  }

  DeleteContact(input:number) {
    this.contactService.deleteContact(input).subscribe({
      next: (contacts) => {
        console.log('Deleted contact: ', contacts);
        this.GetContacts();
      },
      error: (err) => {
        console.error('Failed to delete contact: ', err);
      }
    });
  }



}




