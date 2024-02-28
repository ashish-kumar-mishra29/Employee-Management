import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './Employee/display/display.component';
import { AddEditComponent } from './Employee/add-edit/add-edit.component';

const routes: Routes = [
  { path: '', component: DisplayComponent },
  { path: 'add', component: AddEditComponent },
  { path: 'employee/edit/:id', component: AddEditComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
