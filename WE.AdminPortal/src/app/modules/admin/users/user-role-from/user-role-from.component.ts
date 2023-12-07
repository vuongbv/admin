import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
  UserViewModel,
  TenantDto,
  Role,
} from 'src/api-service/share-services/models';
import {
  UserService,
  TenantService,
} from 'src/api-service/share-services/services';
import { UserInfoService } from 'src/app/services/user.service';
import { ToastService } from 'src/helpers/services/toast.service';

@Component({
  selector: 'app-user-role-from',
  templateUrl: './user-role-from.component.html',
  styleUrls: ['./user-role-from.component.scss'],
})
export class UserRoleFromComponent {
  user: UserViewModel = {};
  tenants: TenantDto[] = [];
  LIST_ROLE: Role[] = [];
  selectedRoleName: string[] = [];
  tenantName = '';
  constructor(
    private userService: UserService,
    private tenantService: TenantService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private userInfoService: UserInfoService
  ) {
    this.tenantName = this.userInfoService.getTenantName();
  }

  loadTenant() {
    this.tenantService
      .tenantSearchGet()
      .subscribe((i) => (this.tenants = i.items!));
  }

  ngOnInit(): void {
    this.loadTenant();
    this.loadRole();
    if (this.config.data.id) {
      this.userService
        .tenantNameUserIdGet({
          tenant_name: this.tenantName,
          id: this.config.data.id,
        })
        .subscribe((i) => {
          this.user = i;
          this.user.roles?.forEach((role) => {
            this.selectedRoleName.push(role.name!);
          });
        });
    }
  }
  loadRole() {
    this.userService
      .tenantNameUserListrolesGet({ tenant_name: this.tenantName })
      .subscribe((i) => {
        this.LIST_ROLE = i;
      });
  }
  save() {
    this.userService
      .tenantNameUserIdPut({
        tenant_name: this.tenantName,
        id: this.config.data.id,
        body: this.user,
      })
      .subscribe((i) => {
        this.toastService.success('Update User successfull');
        this.ref.close();
      });
  }
}
