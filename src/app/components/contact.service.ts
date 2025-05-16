import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
      return this.http.get<Contact[]>('http://localhost:5254/api/Contact').pipe(

        map(data => data.map(t => new Contact(t.id, t.name, t.notes, t.phone, t.email, t.address, t.tags, t.socials, new Date(t.birthday), new Yuu(t.yuu.selectedHead, t.yuu.selectedEyes, t.yuu.selectedMouth, t.yuu.selectedHair, t.yuu.selectedBackHair, t.yuu.selectedBeard, t.yuu.selectedNose, t.yuu.selectedGlasses,
          t.yuu.hue,
          t.yuu.brightness,
          t.yuu.saturation,
          t.yuu.xOffset,
          t.yuu.yOffset,
          t.yuu.xScale,
          t.yuu.yScale))))
      );
  }



  getContactById(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(`http://localhost:5254/api/Contact/${contactId}`).pipe(
      map(t => new Contact(t.id, t.name, t.notes, t.phone, t.email, t.address, t.tags, t.socials, new Date(t.birthday), new Yuu(t.yuu.selectedHead, t.yuu.selectedEyes, t.yuu.selectedMouth, t.yuu.selectedHair, t.yuu.selectedBackHair, t.yuu.selectedBeard, t.yuu.selectedNose, t.yuu.selectedGlasses,
        t.yuu.hue,
        t.yuu.brightness,
        t.yuu.saturation,
        t.yuu.xOffset,
        t.yuu.yOffset,
        t.yuu.xScale,
        t.yuu.yScale)))
    );
  }

  getContactPage(page: number = 1, pageSize: number = 10, search: string = '', tag: string = ''): Observable<{ data: Contact[], totalItems: number, totalPages: number }> {
    const params: any = {
      page: page.toString(),
      pageSize: pageSize.toString(),
      search: search,
      tag: tag
    };

    interface PagedResponse {
      page: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
      data: any[];
    }

    interface ContactResponse {
      id: number;
      name: string;
      notes: string;
      phone: string;
      email: string;
      address: string;
      tags: boolean[];
      socials: { platform: string; handle: string; link: string }[];
      birthday: string;
      yuu: {
      selectedHead: string;
      selectedEyes: string;
      selectedMouth: string;
      selectedHair: string;
      selectedBackHair: string;
      selectedBeard: string;
      selectedNose: string;
      selectedGlasses: string;
      hue: number[];
      brightness: number[];
      saturation: number[];
      xOffset: number[];
      yOffset: number[];
      xScale: number[];
      yScale: number[];
      }
    }

    let connectionString = 'http://localhost:5254/api';
    return this.http.get<PagedResponse>(`${connectionString}/Contact/paged`, { params: params }).pipe(
      map(response => ({
      data: response.data.map((t: ContactResponse) => new Contact(
        t.id, t.name, t.notes, t.phone, t.email, t.address, t.tags, t.socials.map(s => new Social(s.platform, s.handle, s.link)), 
        new Date(t.birthday), 
        new Yuu(
        t.yuu.selectedHead, t.yuu.selectedEyes, t.yuu.selectedMouth, t.yuu.selectedHair, 
        t.yuu.selectedBackHair, t.yuu.selectedBeard, t.yuu.selectedNose, t.yuu.selectedGlasses,
        t.yuu.hue, t.yuu.brightness, t.yuu.saturation, t.yuu.xOffset, t.yuu.yOffset, 
        t.yuu.xScale, t.yuu.yScale
        )
      )),
      totalItems: response.totalItems,
      totalPages: response.totalPages
      }))
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:5254/api/Contact/', contact)
  }

  updateContact(editID: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`http://localhost:5254/api/Contact/${editID}`, contact)
  }

  deleteContact(editID: number): Observable<Contact> {
    return this.http.delete<Contact>(`http://localhost:5254/api/Contact/${editID}`)
  }


}


export class Social {
  constructor(
    public platform: string,
    public handle: string,
    public link: string
  ) { }
}

export class Contact {
  constructor(
    iId: number, iName: string, iNotes: string, iPhone: string, iEmail: string, iAddress: string, iTags: boolean[], iSocials:Social[], iBirthday: Date, iYuu: Yuu
  ) {
    this.id = iId;
    this.name = iName;
    this.notes = iNotes;
    this.phone = iPhone;
    this.email = iEmail;
    this.address = iAddress;
    this.tags = iTags;
    this.socials = iSocials;
    this.birthday = new Date(iBirthday);
    this.yuu = iYuu;
  }
  id: number = 0;
  name: string = '';
  notes: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  socials: Social[] = [];
  birthday: Date = new Date();
  tags: boolean[] = [false, false, false, false, false];
  yuu: Yuu = new Yuu(
    '', '', '', '', '', '', '', '',
    [100, 100, 100, 100, 100, 100, 100],
    [100, 100, 100, 100, 100, 100, 100],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]);
}

export class Yuu {
  constructor(
    iHead: string, iEyes: string, iMouth: string, iHair: string, iBackHair: string, iBeard: string, iNose: string, iGlasses: string,
    iHue: number[], iBrightness: number[], iSaturation: number[], iXOffset: number[], iYOffset: number[], iXScale: number[], iYScale: number[]
  ) {
    this.selectedHead = iHead;
    this.selectedEyes = iEyes;
    this.selectedMouth = iMouth;
    this.selectedHair = iHair;
    this.selectedBackHair = iBackHair;
    this.selectedBeard = iBeard;
    this.selectedNose = iNose;
    this.selectedGlasses = iGlasses;
    this.hue = iHue;
    this.brightness = iBrightness;
    this.saturation = iSaturation;
    this.xOffset = iXOffset;
    this.yOffset = iYOffset;
    this.xScale = iXScale;
    this.yScale = iYScale;
  }

  selectedHead: string = '';
  selectedEyes: string = '';
  selectedMouth: string = '';
  selectedHair: string = '';
  selectedBackHair: string = '';
  selectedBeard: string = '';
  selectedNose: string = '';
  selectedGlasses: string = '';
  hue: number[] = [0, 0, 0, 0, 0, 0, 0];
  brightness: number[] = [100, 100, 100, 100, 100, 100, 100];
  saturation: number[] = [100, 100, 100, 100, 100, 100, 100];
  xOffset: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  yOffset: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  xScale: number[] = [10, 10, 0, 0, 0, 0, 0, 0];
  yScale: number[] = [10, 10, 0, 0, 0, 0, 0, 0];

}
