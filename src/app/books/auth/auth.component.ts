import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  retUrl: string = '';

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.retUrl = this.currentRoute.snapshot.queryParams['retUrl'] || '/home';
  }

  onLoginCompleted() {
    this.router.navigate([this.retUrl]);
  }
}
