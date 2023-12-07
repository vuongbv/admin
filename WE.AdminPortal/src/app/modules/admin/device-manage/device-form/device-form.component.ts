import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateDeviceModel } from 'src/api-service/iot-services/models';
import { DeviceService } from 'src/api-service/iot-services/services';
import { ToastService } from 'src/helpers/services/toast.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],
})
export class DeviceFormComponent implements OnInit {
  device: CreateDeviceModel = {
    gt_position: {},
  };
  OperationStatuses = [
    { name: 'On', value: 'On' },
    { name: 'Off', value: 'Off' },
  ];
  statuses = [
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' },
  ];
  constructor(
    private deviceService: DeviceService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.config?.data?.id) {
      this.deviceService
        .deviceIdGet({
          id: this.config.data.id,
        })
        .subscribe((i) => (this.device = i as CreateDeviceModel));
    }
  }
  save(deviceForm: NgForm) {
    if (this.config?.data?.id) {
      this.deviceService
        .deviceIdPut({
          id: this.config.data.id,
          body: this.device,
        })
        .subscribe((i) => {
          this.toastService.success('Update Device successfull');
          this.ref.close(true);
        });
    } else {
      this.deviceService
        .devicePost({
          body: this.device,
        })
        .subscribe((i) => {
          this.toastService.success('Create Device successfull');
          deviceForm.resetForm();
          this.ref.close(true);
        });
    }
  }
  autoGenId() {
    if (!this.config.data?.id) {
      this.deviceService.deviceGenerateidGet().subscribe((res) => {
        if (res) this.device.source_id = res;
      });
    }
  }
}
