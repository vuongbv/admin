import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { UserInfoService } from 'src/app/services/user.service';

import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  items: MenuItem[] = [];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  showMenu = true;
  userName: any;
  tenant = '';
  isNusUser: boolean = false;
  constructor(
    public layoutService: LayoutService,
    private userService: UserInfoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.items.push({
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.userService.signOut();
      },
    });
    this.getUserName();
    this.tenant = this.userService.getTenantName();
    this.isNusUser = this.tenant === 'nus' ? true : false;
  }
  onMenuToggle() {
    this.layoutService.onMenuToggle();
    this.showMenu = !this.showMenu;
  }

  getUserName(): void {
    this.userName = localStorage.getItem('user');
    if (this.userName) {
      this.userName = JSON.parse(this.userName);
    }
  }
}
