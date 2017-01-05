import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-furnizor-signup',
  templateUrl: './furnizor-signup.component.html',
  styleUrls: ['./furnizor-signup.component.css']
})
export class FurnizorSignupComponent implements OnInit {

  private currentStep: string = 'createAccount';

  constructor() { }

  ngOnInit() {
  }

}
