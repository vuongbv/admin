import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeviceDto } from 'src/api-service/iot-services/models';
import { DeviceService } from 'src/api-service/iot-services/services';
import {
  ApplicationName,
  CreatePanelModel,
  GroupViewModel,
  Role,
} from 'src/api-service/share-services/models';
import {
  ApplicationNameService,
  GroupsService,
  UserService,
} from 'src/api-service/share-services/services';
import { UserInfoService } from 'src/app/services/user.service';
import { WidgetInfoService } from 'src/app/services/widget.services';

import { ToastService } from 'src/helpers/services/toast.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  group: GroupViewModel = {
    location: {},
    app_id: '',
  };
  devices: DeviceDto[] = [];
  panels: CreatePanelModel[] = [];
  deviceslst: Array<string> = [];
  LIST_ROLE: Role[] = [];
  appNames: ApplicationName[] = [];

  constructor(
    private groupService: GroupsService,
    private applicationName: ApplicationNameService,
    private userInfoService: UserInfoService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private widgetInfoService: WidgetInfoService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadApplicationName();
    this.loadRole();
    if (this.config.data.id) {
      this.groupService
        .tenantNameGroupsIdGet({
          id: this.config.data.id,
          tenant_name: this.config.data.tenantName,
        })
        .subscribe((i) => (this.group = i as GroupViewModel));
    }
  }

  loadApplicationName() {
    this.applicationName
      .applicationnameGet({
        page_index: 1,
        page_size: 50,
      })
      .subscribe((i) => {
        this.appNames = i.items!;
        console.log(this.appNames);
      });
  }
  loadRole() {
    this.userService
      .tenantNameUserListrolesGet({
        tenant_name: this.userInfoService.getTenantName(),
      })
      .subscribe((i) => {
        this.LIST_ROLE = i;
      });
  }
  save() {
    if (this.config.data.id) {
      this.groupService
        .tenantNameGroupsIdPut({
          id: this.config.data.id,
          tenant_name: this.config.data.tenantName,
          body: this.group,
        })
        .subscribe(() => {
          this.toastService.success('Update Group successfull');
          this.widgetInfoService.loadLeftMenu(this.config.data.tenantName);
          this.ref.close();
        });
    } else {
      this.groupService
        .tenantNameGroupsPost({
          tenant_name: this.config.data.tenantName,
          body: this.group,
        })
        .subscribe(() => {
          this.toastService.success('Create Group successfull');
          this.widgetInfoService.loadLeftMenu(this.config.data.tenantName);
          this.ref.close();
        });
    }
  }
  addPanel() {
    this.panels.push({});
  }
}
