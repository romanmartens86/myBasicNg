import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanning',
  templateUrl: './scanning.component.html',
  styleUrls: ['./scanning.component.scss']
})
export class ScanningComponent implements OnInit {

  scannerEnabled: boolean = true;
  information: string = 'No information detected...';

  constructor() { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any) {
    
    // disable scanner 
    this.scannerEnabled = false;

    // set information text
    this.information = 'information detected....';

    console.log($event);
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = 'whatever you want to do...';
  }

}
