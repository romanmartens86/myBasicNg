import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  @Output() successEmitter = new EventEmitter();

  constructor(private authServ: AuthService) { }



  ngOnInit(): void {
  }


  login(provider: string) {
    this.authServ.chooseProviderLogin(provider).then(res => this.successEmitter.emit(), err => { console.log(err) });
  }

}
