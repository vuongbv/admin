import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/helpers/gards/auth-guard.guard';
import { LayoutComponent } from './shared/layout/layout.component';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authe/authe.module').then((n) => n.AutheModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'tenant-admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then((n) => n.AdminModule),
      },
    ],
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
