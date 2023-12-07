import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { GroupRoutingModule } from './groups-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PageListComponent } from './page-list/page-list.component';
import { PageFormComponent } from './page-form/page-form.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupFormComponent,
    PageListComponent,
    PageFormComponent,
    AddWidgetComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    MessageModule,
    DropdownModule,
    GroupRoutingModule,
    InputTextModule,
    ListboxModule,
    AccordionModule,
    MultiSelectModule,
    CheckboxModule,
    InputNumberModule,
    InputTextareaModule,
    EditorModule,
    FileUploadModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class GroupsModule {}
