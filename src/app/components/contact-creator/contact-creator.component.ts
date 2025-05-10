import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Contact, ContactService, Social, Yuu } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'path';


@Component({
  selector: 'app-contact-creator',
  imports: [FormsModule, NgIf, NgFor, RouterLink, NgClass],
  templateUrl: './contact-creator.component.html',
  styleUrl: './contact-creator.component.css'
})



export class ContactCreatorComponent {
  editing = false;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  //Pages Stuff
  pages: string[] = ['Body', 'Head', 'Eyes', 'Mouth', 'Nose', 'Hair', 'Beard', 'Glasses', 'Save'];
  selectedPageIndex: number = 0;
  maxPage: number = 1;
  darkMode: boolean = true;
  editID: number = 0;

  ngOnInit(): void {
    let contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      try {
        this.editID = Number(contactId);
      } catch (error) {
        console.error(error);
      }
      this.editing = true;
      this.contactService.getContactById(+contactId).subscribe(contact => {
        this.contactName = contact.name;
        this.contactNotes = contact.notes;
        this.contactPhone = contact.phone;
        this.contactEmail = contact.email;
        this.contactAddress = contact.address;
        this.contactBirthday = new Date(contact.birthday);
        this.contactSocials = contact.socials;
        this.selectedHead = contact.yuu.selectedHead;
        this.hue = contact.yuu.hue;
        this.brightness = contact.yuu.brightness;
        this.saturation = contact.yuu.saturation;
        this.xOffset = contact.yuu.xOffset;
        this.yOffset = contact.yuu.yOffset;
        this.xScale = contact.yuu.xScale;
        this.yScale = contact.yuu.yScale;
        this.selectedEyes = contact.yuu.selectedEyes;
        this.selectedMouth = contact.yuu.selectedMouth;
        this.selectedHair = contact.yuu.selectedHair;
        this.selectedBackHair = contact.yuu.selectedBackHair;
        this.selectedBeard = contact.yuu.selectedBeard;
        this.selectedNose = contact.yuu.selectedNose;
        this.selectedGlasses = contact.yuu.selectedGlasses;
        this.maxPage = this.pages.length;
      });
    }
  }






  //// Yuu stuff

  //Modifiers
  hue: number[] = [0, 0, 0, 0, 0, 0, 0];
  brightness: number[] = [100, 100, 100, 100, 100, 100, 100];
  saturation: number[] = [100, 100, 100, 100, 100, 100, 100];
  xOffset: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  yOffset: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  xScale: number[] = [10, 10, 0, 0, 0, 0, 0, 0];
  yScale: number[] = [10, 10, 0, 0, 0, 0, 0, 0];

  //Head
  headOptions: string[] = ['Head1', 'Head2'];
  selectedHead: string = '';

  //Eyes
  eyeOptions: string[] = ['Eyes1', 'Eyes2', 'Eyes3'];
  selectedEyes: string = '';

  //Mouths
  mouthOptions: string[] = ['Mouth1', 'Mouth2', 'Mouth3'];
  selectedMouth: string = '';

  //Hair
  hairOptions: string[] = ['Hair0', 'Hair1', 'Hair2', 'Hair3', 'Hair4', 'Hair5'];
  selectedHair: string = '';
  backHairOptions: string[] = ['BackHair0', 'BackHair1', 'BackHair2'];
  selectedBackHair: string = '';
  beardOptions: string[] = ['Beard0', 'Beard1', 'Beard2', 'Beard3'];
  selectedBeard: string = '';

  //Nose
  noseOptions: string[] = ['Nose1', 'Nose2', 'Nose3', 'Nose4', 'Nose5', 'Nose6'];
  selectedNose: string = '';

  //Glasses
  glassesOptions: string[] = ['Glasses0', 'Glasses1', 'Glasses2', 'Glasses3'];
  selectedGlasses: string = '';



  /// Contact Stuff


  contactName: string = 'New Yuu';
  contactNotes: string = 'Notes';
  contactPhone: string = 'Phone';
  contactEmail: string = 'Email';
  contactAddress: string = 'Address';
  contactTags: boolean[] = [false, false, false, false, false];
  contactSocials: Social[] = [];
  contactBirthday: Date = new Date();

  addSocial(): void {
    if (this.contactSocials.length < 10){
      
    }
    let newSocial = new Social('', '', '');
    this.contactSocials.push(newSocial);
  }
  removeSocial(index: number): void {
    if (index > -1) {
      this.contactSocials.splice(index, 1);
    }
  }


  addContact(
    name: string,
    notes: string,
    phone: string,
    email: string,
    address: string,
    birthday: Date,
  ): void {

    let newYuu = new Yuu( this.selectedHead, this.selectedEyes, this.selectedMouth, this.selectedHair, this.selectedBackHair, this.selectedBeard, this.selectedNose, this.selectedGlasses,
      this.hue, this.brightness, this.saturation, this.xOffset, this.yOffset, this.xScale, this.yScale);

    const newContact = new Contact(
      0,
      name,
      notes,
      phone,
      email,
      address,
      [false, false, false, true, false],
      this.contactSocials,
      birthday,
      newYuu

    );

    this.contactService.addContact(newContact);
  }




  unlockPage(index: number): void {
    if (index > this.maxPage) {
      this.maxPage = index;
    }
  }



  saveYuu(): void {
    let newYuu = new Yuu(
      this.selectedHead, this.selectedEyes, this.selectedMouth, this.selectedHair, this.selectedBackHair,
      this.selectedBeard, this.selectedNose, this.selectedGlasses,
      this.hue, this.brightness, this.saturation,
      this.xOffset, this.yOffset, this.xScale, this.yScale
    );
  
    const newContact = new Contact(
      0,
      this.contactName,
      this.contactNotes,
      this.contactPhone,
      this.contactEmail,
      this.contactAddress,
      [false, false, false, true, false],
      this.contactSocials,
      this.contactBirthday,
      newYuu
    );
  
    
  
    if (this.editing) {
      this.contactService.updateContact(this.editID, newContact).subscribe({
        next: response => {
          console.log("Contact successfully updated:", response);
        },
        error: err => {
          console.error("Error updating contact:" + this.editID, err);
        }
      });
    } else {
      this.contactService.addContact(newContact).subscribe({
        next: response => {
          console.log("Contact successfully added:", response);
        },
        error: err => {
          console.error("Error adding contact:", err);
        }
      });
      
    }

  }

}
