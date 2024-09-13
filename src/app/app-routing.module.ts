import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { ManagerComponent } from './manager/manager.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { PostulerComponent } from './postuler/postuler.component';
import { OffreComponent } from './offre/offre.component';
import { AddOffreComponent } from './add-offre/add-offre.component';
import { DetailOffreComponent } from './detail-offre/detail-offre.component';
import { MissionComponent } from './mission/mission.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { SuiviMissionsComponent } from './suivi-missions/suivi-missions.component';
import { ClientComponent } from './client/client.component';
import { ConsulteMissionComponent } from './consulte-mission/consulte-mission.component';
import { SoumettreBesionComponent } from './soumettre-besion/soumettre-besion.component';
import { ListeMissionDemanderComponent } from './liste-mission-demander/liste-mission-demander.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '**', redirectTo: '/dashboard' },
  { path: 'login', component: AuthComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'statistique', component: StatistiqueComponent},
  { path: 'consultant', component: ConsultantComponent},
  // { path: 'postuler', component: PostulerComponent},
  { path: 'postuler/:id', component: PostulerComponent },
  {path:'offre',component:OffreComponent},
  {path:'AjoutOffre',component:AddOffreComponent},
  { path: 'detail-offre/:id', component:DetailOffreComponent },
  { path: 'mission', component:MissionComponent },
  { path: 'AddMission', component:AddMissionComponent },
  { path: 'missionActuelle', component:SuiviMissionsComponent },
  {path : 'client',component:ClientComponent},
  {path : 'ConsulteMission',component:ConsulteMissionComponent},
  {path : 'soumettreBesion',component:SoumettreBesionComponent},
  { path: 'listeMissionDemander', component: ListeMissionDemanderComponent },


 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
