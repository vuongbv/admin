import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-router.module';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [],
  imports: [AdminRoutingModule,CommonModule],
  providers: [DialogService],
})
export class AdminModule {}
