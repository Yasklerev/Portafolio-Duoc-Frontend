import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ComponentsModule } from '../components/components.module';
import { StartComponent } from './start/start.component';
import { ManageInvoicesComponent } from './manage-invoices/manage-invoices.component';
import { ManageHostelComponent } from './manage-hostel/manage-hostel.component';
import { ManagePurchasesComponent } from './manage-purchases/manage-purchases.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MaterialModule } from '../material.module';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { DeleteInvoiceComponent } from './components/delete-invoice/delete-invoice.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { DetailInvoiceComponent } from './components/detail-invoice/detail-invoice.component';
import { NewHostalComponent } from './components/new-hostal/new-hostal.component';
import { DeleteHostalComponent } from './components/delete-hostal/delete-hostal.component';
import { DetailHostalComponent } from './components/detail-hostal/detail-hostal.component';
import { NewPurchaseComponent } from './components/new-purchase/new-purchase.component';
import { DeletePurchaseComponent } from './components/delete-purchase/delete-purchase.component';
import { DetailPurchaseComponent } from './components/detail-purchase/detail-purchase.component';
import { ManageCustomersComponent } from './manage-customers/manage-customers.component';
import { ManageGuestsComponent } from './manage-guests/manage-guests.component';
import { ManageVendorsComponent } from './manage-vendors/manage-vendors.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './components/customers/delete-customer/delete-customer.component';
import { DeleteGuestsComponent } from './components/guests/delete-guests/delete-guests.component';
import { UpdateGuestsComponent } from './components/guests/update-guests/update-guests.component';
import { UpdateVendorsComponent } from './components/vendors/update-vendors/update-vendors.component';
import { DeleteVendorsComponent } from './components/vendors/delete-vendors/delete-vendors.component';
import { DeleteEmployeesComponent } from './components/employees/delete-employees/delete-employees.component';
import { UpdateEmployeesComponent } from './components/employees/update-employees/update-employees.component';
import { NewCustomerComponent } from './components/customers/new-customer/new-customer.component';
import { DetailGuestComponent } from './components/guests/detail-guest/detail-guest.component';
import { NewVendorComponent } from './components/vendors/new-vendor/new-vendor.component';
import { LoadUsersComponent } from './load-users/load-users.component';
import { ServicesClientComponent } from './services-client/services-client.component';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';
import { ManageDiningRoomComponent } from './manage-dining-room/manage-dining-room.component';
import { DiningRoomComponent } from './dining-room/dining-room.component';
import { ServicesUserComponent } from './components/services-user/services-user.component';
import { SolicitudesRealizadasComponent } from './solicitudes-realizadas/solicitudes-realizadas.component';
import { DetalleServicioComponent } from './components/detalle-servicio/detalle-servicio.component';
import { DeleteRoomComponent } from './components/delete-room/delete-room.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { DetailRoomComponent } from './components/detail-room/detail-room.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';

@NgModule({
  declarations: [
    ProgressComponent,
    Graph1Component,
    DashboardComponent,
    PagesComponent,
    StartComponent,
    ManageInvoicesComponent,
    ManageHostelComponent,
    ManagePurchasesComponent,
    ManageUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    NewUserComponent,
    DeleteInvoiceComponent,
    NewInvoiceComponent,
    DetailInvoiceComponent,
    NewHostalComponent,
    DeleteHostalComponent,
    DetailHostalComponent,
    NewPurchaseComponent,
    DeletePurchaseComponent,
    DetailPurchaseComponent,
    ManageCustomersComponent,
    ManageGuestsComponent,
    ManageVendorsComponent,
    ManageEmployeesComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    DeleteGuestsComponent,
    UpdateGuestsComponent,
    UpdateVendorsComponent,
    DeleteVendorsComponent,
    DeleteEmployeesComponent,
    UpdateEmployeesComponent,
    NewCustomerComponent,
    DetailGuestComponent,
    NewVendorComponent,
    LoadUsersComponent,
    ServicesClientComponent,
    ManageRoomsComponent,
    ManageDiningRoomComponent,
    DiningRoomComponent,
    ServicesUserComponent,
    SolicitudesRealizadasComponent,
    DetalleServicioComponent,
    DeleteRoomComponent,
    NewRoomComponent,
    DetailRoomComponent,
    UpdateRoomComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SidebarModule,
    ComponentsModule,
    MaterialModule,
  ],
  exports: [ProgressComponent, Graph1Component, DashboardComponent],
})
export class PagesModule {}
