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
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { MissionComponent } from './mission/mission.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client/client.component';
import { ConsulteMissionComponent } from './consulte-mission/consulte-mission.component';
import { SoumettreBesionComponent } from './soumettre-besion/soumettre-besion.component';
import { ListeMissionDemanderComponent } from './liste-mission-demander/liste-mission-demander.component';
import { AttribuermissionComponent } from './attribuermission/attribuermission.component';

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
    SuiviMissionsComponent,
    NavbarComponent,
    SidebarComponent,
    AddOffreComponent,
    DetailOffreComponent,
    MissionComponent,
    AddMissionComponent,
    ClientComponent,
    ConsulteMissionComponent,
    SoumettreBesionComponent,
    ListeMissionDemanderComponent,
    AttribuermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
