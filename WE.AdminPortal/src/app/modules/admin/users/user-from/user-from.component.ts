import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  CreateUserModel,
  Role,
  TenantDto,
  UserSource,
  UserViewModel,
} from 'src/api-service/share-services/models';
import {
  TenantService,
  UserService,
} from 'src/api-service/share-services/services';
import { UserInfoService } from 'src/app/services/user.service';
import { ToastService } from 'src/helpers/services/toast.service';

@Component({
  selector: 'app-user-from',
  templateUrl: './user-from.component.html',
  styleUrls: ['./user-from.component.scss'],
})
export class UserFromComponent implements OnInit {
  user: CreateUserModel = {
    user_source: UserSource.AzureAdB2C,
  };
  tenants: TenantDto[] = [];
  LIST_ROLE: Role[] = [];
  selectedRoleName: string[] = [];
  tenantName = '';
  isUserSource: boolean = false;

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
    let body: CreateUserModel = this.user;
    if (!this.isUserSource) {
      body = {
        email: body.email,
        password: body.password,
        roles: body.roles,
      };
    }
    this.userService
      .tenantNameUserPost({
        tenant_name: this.tenantName,
        body,
      })
      .subscribe((i) => {
        this.toastService.success('Create User successfull');
        this.ref.close();
      });
  }
}
