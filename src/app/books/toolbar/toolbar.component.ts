import { Component, OnInit } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'books-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private authServ: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  callLogout() {
    this.authServ.doLogout().then(res => {
      this.router.navigate(['/login']);
    }, err => console.log('Error on Logout: ' + err));
  }

}
