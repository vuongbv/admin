import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { UserDto } from 'src/api-service/share-services/models';
import { Role } from 'src/api-service/share-services/models/role';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private authService: MsalService, private router: Router) {}
  static isAdmin: any;
  getTenantName() {
    const userInlocal = localStorage.getItem('user');
    const userLoginProvider = localStorage.getItem('user_login_provider');
    if (userInlocal) {
      const user: UserDto = JSON.parse(userInlocal);
      return user.tenant_name!;
    }
    return '';
  }
  isAdmin() {
    const userInlocal = localStorage.getItem('user');
    const userLoginProvider = localStorage.getItem('user_login_provider');
    if (userInlocal) {
      const user: UserDto = JSON.parse(userInlocal);
      return user.roles?.some((i: Role) => i.name == 'Admin');
    }
    return false;
  }

  checkRole(role: string[]) {
    const userInlocal = localStorage.getItem('user');
    const userLoginProvider = localStorage.getItem('user_login_provider');
    if (userInlocal) {
      const user: UserDto = JSON.parse(userInlocal);
      const checkRole = user.roles?.filter((i: Role) => role.includes(i.name!));
      return checkRole && checkRole.length > 0;
    }
    return false;
  }
  signOut() {
    const userLoginProvider = localStorage.getItem('user_login_provider');
    if (userLoginProvider == 'microsoft') {
      this.authService
        .logoutRedirect()
        .subscribe((i) => {
          localStorage.clear();
          this.router.navigate(['/auth']);
        });
    } else {
      localStorage.clear();
      this.router.navigate(['/auth']);
    }
  }
}
