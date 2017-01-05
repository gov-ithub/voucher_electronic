import { Routes } from '@angular/router';
import { ClaimsGuardService } from '../../services';
import { HomeComponent, HomeMasterComponent, ProposalsPageComponent, FurnizorSignupComponent } from './';
import { HtmlPageComponent } from '../shared';

export const PublicRoutes: Routes = [
      { path: '', component: HomeMasterComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'inscriere-furnizori', component: FurnizorSignupComponent },
      { path: 'acte-normative', component: ProposalsPageComponent },
      { path: 'acte-normative/:arhiva', component: ProposalsPageComponent },
      { path: 'p/:url', component: HtmlPageComponent },
      { path: 'reset-password/:userId', component: HomeComponent, data: { action: 'resetPassword' } },
      { path: 'confirm-account/:userId', component: HomeComponent, data: { action: 'confirmAccount' } },
      { path: 'unsubscribe', component: HomeComponent, data: { action: 'unsubscribe' } },
]} ];
