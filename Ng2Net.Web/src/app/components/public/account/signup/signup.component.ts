import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAccountService, ContentService, InstitutionService } from '../../../../services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HtmlPopupComponent } from '../../../shared';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class PublicSignupComponent implements OnInit {

  public currentUser: any = { };
  @ViewChild('myForm')
  private myForm: NgForm;
  private signup: boolean = true;
  private signupResult: boolean = false;
  private showError: boolean = false;
  private showUnsubResult: boolean = false;
  private error: string;

  @Input()
  public edit: boolean;
  private institutions: any[];
  constructor( 
    private userAccountService: UserAccountService,
    private contentService: ContentService,
    private institutionService: InstitutionService,
    public route: ActivatedRoute,
 ) { }

  ngOnInit() {
    if (this.userAccountService.currentUser.id)
      this.currentUser = this.userAccountService.currentUser;
    this.institutionService.getInstitutions().subscribe(result => { 
      this.institutions = result;
      if (this.currentUser.subscriptions)
        this.institutions.forEach(sub => {
          let institution = this.currentUser.subscriptions.filter(inst => inst.id === sub.id)[0];
          if (institution) {
            sub.selected = true;
          }
        });
    });
  }


  userRegister() {
    if (!this.myForm.valid) {
      this.showError = true;
      return;
    }
    console.log(this.currentUser);
    this.userAccountService.register(this.currentUser).subscribe((result) => {
      if (!result.error) {
        this.signup=false;
        this.signupResult=true;
      }
    });
  }

  openResendEmail() {
    // let modal = this.modalService.open(PublicSignupComponent, { keyboard: false });
  }

  unsubscribe() {
    if (confirm('Doresti sa te dezabonezi de la notificari?'))
      this.userAccountService.unsubscribe().subscribe((result) => {
        if (!result.error) {
          this.showUnsubResult = true;
          this.userAccountService.getCurrentUser(true).subscribe(() => 
          this.currentUser = this.userAccountService.currentUser);
        }
      });
  }

  openTerms() {
//    let component = this.modalService.open(HtmlPopupComponent);
//    component.componentInstance.contentName = 'public.termsandconditions.content';
//    component.componentInstance.titleName = 'public.termsandconditions.title';
  }
}
