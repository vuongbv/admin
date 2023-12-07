import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AutheRoutingModule } from './authe-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutheRoutingModule,
    CheckboxModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    FormsModule,
    MessageModule,
  ],
})
export class AutheModule {}
