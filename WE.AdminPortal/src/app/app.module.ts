import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageModule } from 'primeng/message';
import { JwtModule } from '@auth0/angular-jwt';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ApiModule } from 'src/api-service/share-services/api.module';
import { HttpClientModule } from '@angular/common/http';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { AuthGuard } from 'src/helpers/gards/auth-guard.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PanelService } from 'src/api-service/share-services/services';
import { RoleGuard } from 'src/helpers/gards/role-guard.guard';
import { API_INTERCEPTOR_PROVIDER } from 'src/helpers/interceptors';
import { ApiInterceptor } from 'src/helpers/interceptors/ApiIndicator';
import { ToastService } from 'src/helpers/services/toast.service';
import { environment, loginRequest, msalConfig } from 'src/environments/environment';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
} from '@azure/msal-browser';
import { IotApiModule } from 'src/api-service/iot-services/iot-api.module';
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

/**
 * Set your default interaction type for MSALGuard here. If you have any
 * additional scopes you want the user to consent upon login, add them here as well.
 */
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest,
  };
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', [
    'user.read',
  ]); // Prod environment. Uncomment to use.
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: 'red',
      bgsOpacity: 0.5,
      bgsPosition: 'bottom-right',
      bgsSize: 60,
      blur: 5,
      delay: 0,
      fastFadeOut: true,
      fgsColor: 'red',
      fgsPosition: 'center-center',
      fgsSize: 60,
      fgsType: 'cube-grid',
      gap: 24,
      logoPosition: 'center-center',
      masterLoaderId: 'master',
      hasProgressBar: false,
      overlayBorderRadius: '0',
      overlayColor: 'rgba(40, 40, 40, 0.8)',
      pbColor: 'red',
      pbDirection: 'ltr',
      pbThickness: 3,
      text: '',
      textColor: '#FFFFFF',
      textPosition: 'center-center',
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
      minTime: 30,
      exclude: [
        '/measurement/total-power',
        '/measurement/singlechartdata',
        '/measurement/battery',
        '/measurement/temperature',
      ],
    }),
    IotApiModule.forRoot({
      rootUrl: environment.production
        ? window.location.origin + environment.rootIot
        : environment.domainUrl,
    }),
    ApiModule.forRoot({
      rootUrl: environment.production
        ? window.location.origin + environment.rootShare
        : environment.shareUrl,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    MsalModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    MessageService,
    ToastService,
    PanelService,
    API_INTERCEPTOR_PROVIDER,

    ConfirmationService,
    ApiInterceptor,
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
