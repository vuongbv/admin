import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'tenants',
    loadChildren: () =>
      import('./tenant/tenant.module').then((n) => n.TenantModule),
  }, {
    path: 'devices',
    loadChildren: () =>
      import('./device-manage/device-manage.module').then((n) => n.DeviceManageModule),
  },
  {
    path: 'groups',
    loadChildren: () =>
      import('./groups/groups.module').then((n) => n.GroupsModule),
  },
  
  {
    path: 'notification-setting',
    loadChildren: () =>
      import('./setting/setting.module').then((n) => n.SettingModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((n) => n.UsersModule),
  },
  {
    path: 'apikey',
    loadChildren: () =>
      import('./api-key/api-key.module').then((n) => n.ApiKeyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
