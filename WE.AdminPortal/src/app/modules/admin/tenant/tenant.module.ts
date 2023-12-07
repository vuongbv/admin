import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TenantRoutingModule } from './tenant-routing.module';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [TenantListComponent, TenantFormComponent],
  imports: [
    CommonModule,
    TenantRoutingModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    DialogModule,
    FormsModule,
    MessageModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule
  ],
})
export class TenantModule {}
