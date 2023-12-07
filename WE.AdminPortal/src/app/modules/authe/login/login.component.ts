import { Component, Inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
} from '@azure/msal-browser';
import { filter } from 'rxjs';
import {
  AuditService,
  UserService,
} from 'src/api-service/share-services/services';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/helpers/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  valCheck: string[] = ['remember'];

  password!: string;
  identifier: string = '';
  isNusUser: boolean = false;
  modelLeftMenu: any[] = [];
  subdomain = '';
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private userServices: UserService,
    private toartService: ToastService,
    private auditService: AuditService,
    private router: Router
  ) {
    this.subdomain = environment.production
      ? window.location.host.split('.')[0]
      : 'show';
  }

  ngOnInit(): void {
    this.onLoginMicrosoft();

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS||
            msg.eventType === EventType.LOGIN_FAILURE
        )
      )
      .subscribe((result: EventMessage) => {
        if(result.eventType ==  EventType.LOGIN_FAILURE){
          this.onLoginMicrosoft();
          return;
        }
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.checkAndSetActiveAccount();
        localStorage.setItem('token', payload?.accessToken!);
        // localStorage.setItem('user', JSON.stringify(i));
        localStorage.setItem('user_login_provider', 'microsoft');
        this.userServices
          .tenantNameUserGetinfoGet({ tenant_name: this.subdomain })
          .subscribe((i) => {
            if (i.roles?.some((i) => i.name == 'TenantAdmin')) {
              localStorage.setItem('user', JSON.stringify(i));
              localStorage.setItem('user_login_provider', 'microsoft');

              this.router.navigate(['']);
              this.auditService
                .tenantNameAuditLastLoginPost({
                  tenant_name: i.tenant_name!,
                  body: { user_info: i },
                })
                .subscribe();
            } else {
              this.toartService.error('Login failed');
              localStorage.clear();
            }
          });
        return result;
      });
  }

  onLoginMicrosoft() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }
  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }
}
