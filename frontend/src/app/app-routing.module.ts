import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'lista', component: TaskListComponent },
      { path: 'calendario', component: CalendarComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }