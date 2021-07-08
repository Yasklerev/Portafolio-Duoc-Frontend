import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiningRoomComponent } from './pages/dining-room/dining-room.component';
import { Graph1Component } from './pages/graph1/graph1.component';
import { LoadUsersComponent } from './pages/load-users/load-users.component';
import { ManageCustomersComponent } from './pages/manage-customers/manage-customers.component';
import { ManageDiningRoomComponent } from './pages/manage-dining-room/manage-dining-room.component';
import { ManageEmployeesComponent } from './pages/manage-employees/manage-employees.component';
import { ManageGuestsComponent } from './pages/manage-guests/manage-guests.component';
import { ManageHostelComponent } from './pages/manage-hostel/manage-hostel.component';
import { ManageInvoicesComponent } from './pages/manage-invoices/manage-invoices.component';
import { ManagePurchasesComponent } from './pages/manage-purchases/manage-purchases.component';
import { ManageRoomsComponent } from './pages/manage-rooms/manage-rooms.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { ManageVendorsComponent } from './pages/manage-vendors/manage-vendors.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { ServicesClientComponent } from './pages/services-client/services-client.component';
import { SolicitudesRealizadasComponent } from './pages/solicitudes-realizadas/solicitudes-realizadas.component';
import { StartComponent } from './pages/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'graph1', component: Graph1Component },
      { path: 'progress', component: ProgressComponent },
      { path: 'inicio', component: StartComponent },
      { path: 'adm-facturas', component: ManageInvoicesComponent },
      { path: 'adm-hostel', component: ManageHostelComponent },
      { path: 'adm-ventas', component: ManagePurchasesComponent },
      { path: 'adm-usuarios', component: ManageUsersComponent },
      { path: 'adm-clientes', component: ManageCustomersComponent },
      { path: 'adm-huespedes', component: ManageGuestsComponent },
      { path: 'adm-proveedores', component: ManageVendorsComponent },
      { path: 'adm-empleados', component: ManageEmployeesComponent },
      { path: 'carga-usuarios', component: LoadUsersComponent },
      { path: 'servicios-cliente', component: ServicesClientComponent },
      { path: 'adm-habitaciones', component: ManageRoomsComponent },
      { path: 'adm-comedor', component: ManageDiningRoomComponent },
      { path: 'minuta-comedor', component: DiningRoomComponent },
      { path: 'solicitudes-realizadas', component: SolicitudesRealizadasComponent },
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
