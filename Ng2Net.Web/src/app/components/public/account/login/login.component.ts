import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAccountService, ContentService } from '../../../../services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicForgotPasswordComponent, PublicResendActivationComponent, PublicSignupComponent } from '../../';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class PublicLoginComponent implements OnInit {

  public currentUser: any = {};
  @ViewChild('myForm')
  private myForm: NgForm;
  private login: boolean = true;
  private isModel: boolean = true;
  private forgotPassword: boolean = false;
  private resendActivation: boolean = false;
  public redirectTo: string;
  constructor( private activeModal: NgbActiveModal, 
  private userAccountService: UserAccountService,
  private contentService: ContentService,
  private modalService: NgbModal,
 ) {
  }

  ngOnInit() { 
  }

  userLogin() {
    if (!this.myForm.valid)
      return;
    this.userAccountService.login(this.currentUser).subscribe((result) => {
      if (!result.error) {
        this.activeModal.close();
        if (this.redirectTo) {
          let signupModal = this.modalService.open(PublicSignupComponent, { keyboard: false });
          this.userAccountService.getCurrentUser(true).subscribe(result => signupModal.componentInstance.currentUser = result);
        }
      }
    });
  }

    hideAllDivs() {
    this.login = false;
    this.forgotPassword = false;
    this.resendActivation = false;
  }



  openResendEmail() {
    this.activeModal.close();
    this.modalService.open(PublicResendActivationComponent, { size: 'sm', keyboard: false });
  }

  openForgotPassword() {
    this.activeModal.close();
    this.modalService.open(PublicForgotPasswordComponent, { size: 'sm', keyboard: false});
  }

}
