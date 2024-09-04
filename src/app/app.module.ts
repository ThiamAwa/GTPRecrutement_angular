import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagerComponent } from './manager/manager.component';
import { HttpClientModule } from '@angular/common/http';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { OffreComponent } from './offre/offre.component';
import { PostulerComponent } from './postuler/postuler.component';
import { SuiviMissionsComponent } from './suivi-missions/suivi-missions.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    ManagerComponent,
    StatistiqueComponent,
    ConsultantComponent,
    OffreComponent,
    PostulerComponent,
    SuiviMissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
