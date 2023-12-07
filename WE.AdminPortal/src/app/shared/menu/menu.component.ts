import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LeftMenuDto } from 'src/api-service/share-services/models';
import { VersionService } from 'src/api-service/share-services/services';
import { UserInfoService } from 'src/app/services/user.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  model: MenuItem[] = [];
  admin: any[] = [];
  logoUrl: any; //set by api later

  version: string | null | undefined = "";

  constructor(
    public layoutService: LayoutService,
    private userInfoService: UserInfoService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private versionService: VersionService
  ) {}

  ngOnInit() {

    // this.versionService.versionGet({package_name:'adminportal'}).subscribe(
    //   data  => {
    //     this.version = data.version;
    //   }
    // )

    this.model = [
      {
        label: 'Tenants',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['tenant-admin/tenants'],
      },
      {
        label: 'Device Management',
        items: [
          {
            label: 'On-boarding',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['tenant-admin/devices/onboard'],
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: 'Manage Device',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['tenant-admin/devices/list'],
            routerLinkActiveOptions: { exact: true },
          },
        ],
        expanded: this.checkActiveState(['/devices/list', '/devices/onboard']),
      },
      {
        label: 'Notification Settings',
        icon: 'pi pi-fw pi-check-square',
        routerLink: ['tenant-admin/notification-setting/list'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Api Key Generation',
        icon: 'pi pi-fw pi-key',
        routerLink: ['tenant-admin/apikey/key'],
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Page Management',

        items: [
          {
            label: 'Manage Groups',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['tenant-admin/groups/list'],
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: 'Manage Page',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['tenant-admin/groups/page'],
          },
        ],
        expanded: this.checkActiveState(['/groups/list', '/groups/page']),
      },

      {
        label: 'User Management',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
            routerLink: ['tenant-admin/users/list'],
          },
        ],
        expanded: this.checkActiveState(['/users/list', '/users/roles']),
      },
    ];
  }
  checkActiveState(givenLink: string[] | undefined) {
    console.log(this.router.url);
    if (givenLink && givenLink.indexOf(this.router.url) > -1) {
      return true;
    } else {
      return false;
    }
  }
  // getTenantLogo(): void {
  //   this.tenantSettingService
  //     .tenantsettingGet({ key: 'Logo' })
  //     .subscribe((res) => {
  //       this.logoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
  //         `data:image/png;base64, ${res}`
  //       );
  //     });
  // }
}
