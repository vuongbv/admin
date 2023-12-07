import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/helpers/gards/role-guard.guard';

import { TenantListComponent } from './tenant-list/tenant-list.component';

const routes: Routes = [
  {
    path: '',
    component: TenantListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['TenantAdmin'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantRoutingModule {}
