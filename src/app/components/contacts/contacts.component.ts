import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contacts',
  imports: [ FormsModule, NgIf, NgFor , RouterLink],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  //Pages Stuff
  pages: string[] = ['Body', 'Head', 'Eyes', 'Mouth', 'Nose', 'Hair', 'Beard', 'Glasses', 'Save'];
  selectedPageIndex: number = 0;
  maxPage:number = 1;


  //Modifiers
  hue: number[] = [0, 0, 0, 0, 0, 0, 0];
  brightness: number[] = [100, 100, 100, 100, 100, 100, 100];
  saturation: number[] = [100, 100, 100, 100, 100, 100, 100];
  xOffset: number[] = [0,0,0,0,0,0,0,0];
  yOffset: number[] = [0,0,0,0,0,0,0,0];
  xScale: number[] = [10,10,0,0,0,0,0,0];
  yScale: number[] = [10,10,0,0,0,0,0,0];

  //Head
  headOptions: string[] = ['Head1', 'Head2'];
  selectedHead : string = '';

  //Eyes
  eyeOptions: string[] = ['Eyes1', 'Eyes2', 'Eyes3'];
  selectedEyes : string = '';

  //Mouths
  mouthOptions: string[] = ['Mouth1', 'Mouth2', 'Mouth3'];
  selectedMouth : string = '';

  //Hair
  hairOptions: string[] = ['Hair0','Hair1', 'Hair2', 'Hair3', 'Hair4', 'Hair5'];
  selectedHair : string = '';
  backHairOptions: string[] = ['BackHair0','BackHair1','BackHair2'];
  selectedBackHair : string = '';
  beardOptions: string[] = ['Beard0','Beard1','Beard2','Beard3'];
  selectedBeard : string = '';

    //Nose
    noseOptions: string[] = ['Nose1', 'Nose2', 'Nose3', 'Nose4', 'Nose5', 'Nose6'];
    selectedNose : string = '';

        //Glasses
        glassesOptions: string[] = ['Glasses0', 'Glasses1', 'Glasses2', 'Glasses3'];
        selectedGlasses : string = '';




  // headOptions: string[] = ['Head1', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9', 'Head10'];


  unlockPage(index: number): void {
    if (index > this.maxPage) {
      this.maxPage = index;
    }
  }



  saveYuu(): void {
    // Save the Yuu data to local storage or send it to the server
    const yuuData = {
      head: this.selectedHead,
      eyes: this.selectedEyes,
      mouth: this.selectedMouth,
      hair: this.selectedHair,
      backHair: this.selectedBackHair,
      beard: this.selectedBeard,
      nose: this.selectedNose,
      glasses: this.selectedGlasses,
      hue: this.hue,
      brightness: this.brightness,
      saturation: this.saturation,
      xOffset: this.xOffset,
      yOffset: this.yOffset,
      xScale: this.xScale,
      yScale: this.yScale
    };
    console.log('Yuu data saved:', yuuData);
  }

}
