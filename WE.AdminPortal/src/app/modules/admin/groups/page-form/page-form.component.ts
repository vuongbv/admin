import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DeviceDto } from 'src/api-service/iot-services/models';
import { DeviceService } from 'src/api-service/iot-services/services';
import {
  CreatePanelModel,
  GroupDto,
  PanelDto,
  Role,
  WidgetDto,
  WidgetTemplateDto,
} from 'src/api-service/share-services/models';
import {
  GroupsService,
  PanelService,
  SettingService,
  UserService,
} from 'src/api-service/share-services/services';
import { UserInfoService } from 'src/app/services/user.service';
import { WidgetInfoService } from 'src/app/services/widget.services';
import { ToastService } from 'src/helpers/services/toast.service';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss'],
})
export class PageFormComponent implements OnInit {
  panel: PanelDto = { widgets: [], tabs: [] };
  widgets: WidgetDto[] = [];
  groups: GroupDto[] = [];
  devices: DeviceDto[] = [];
  LIST_ROLE: Role[] = [];
  widgetTemplates: WidgetTemplateDto[] = [];

  constructor(
    private groupService: GroupsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService,
    private panelSevice: PanelService,
    private userInfoService: UserInfoService,
    private WidgetInfoService: WidgetInfoService,
    private widgetTemplateService: SettingService,
    private deviceService: DeviceService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.deviceService.deviceGet().subscribe((i) => (this.devices = i.items!));
    this.loadRole();
    this.groupService
      .tenantNameGroupsSearchGet({
        tenant_name: this.userInfoService.getTenantName(),
      })
      .subscribe((i) => (this.groups = i.items!));
    this.loadTemplate();
    if (this.config.data.id) {
      this.panelSevice
        .apiPanelIdGet({
          id: this.config.data.id,
        })
        .subscribe((i) => {
          const formatData = {
            ...i,
            device_id: i.device_id ? i.device_id.split(',') : '',
          };
          this.panel = formatData as CreatePanelModel;
        });
    }
  }
  loadRole() {
    this.userService
      .tenantNameUserListrolesGet({ tenant_name:this.userInfoService.getTenantName() })
      .subscribe((i) => {
        this.LIST_ROLE = i;
      });
  }
  loadTemplate() {
    this.widgetTemplateService
      .settingWidgettemplateGet()
      .subscribe((i) => (this.widgetTemplates = i!));
  }
  addTab() {
    this.panel.tabs?.unshift({});
  }
  save() {
    const body = {
      ...this.panel,
      device_id: this.panel.device_id ? this.panel.device_id.toString() : '',
    };
    if (this.config.data.id) {
      this.panelSevice
        .apiPanelIdPut({
          id: this.config.data.id,
          body,
        })
        .subscribe((i) => {
          this.toastService.success('Update Page successfull');
          this.ref.close(true);
          this.WidgetInfoService.loadLeftMenu(
            this.userInfoService.getTenantName()
          );
        });
    } else {
      this.panelSevice
        .apiPanelPost({
          body,
        })
        .subscribe((i) => {
          this.toastService.success('Create Page successfull');
          this.WidgetInfoService.loadLeftMenu(
            this.userInfoService.getTenantName()
          );
          this.ref.close(true);
        });
    }
  }

  addWidget() {
    this.panel.widgets?.unshift({
      panel_id: this.panel.id,
      position: { height: 1, width: 1, x: 0, y: 0 },
    });
  }
}
