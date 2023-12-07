import { Component, Input, OnInit } from '@angular/core';
import {
  DeviceDto,
  StyleSetting,
  Tab,
  WidgetAdditionalDataList,
  WidgetDto,
  WidgetSetting,
  WidgetTemplateDto,
} from 'src/api-service/share-services/models';

import { WidgetService } from 'src/api-service/share-services/services';
import {
  aggregateTypes,
  ChartTypes,
  OperatorType,
  Periodicities,
  ResultTypes,
  WidgetTypes,
} from 'src/helpers/enum';
import { ToastService } from 'src/helpers/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartStyleSettingDto } from 'src/api-service/iot-services/models';
import { TenantSettingService } from 'src/api-service/iot-services/services';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss'],
})
export class AddWidgetComponent implements OnInit {
  @Input() widget: WidgetDto = {};
  @Input() widgetTemplates: WidgetTemplateDto[] = [];
  @Input() tabs:Tab[]= []
  widgetTypes = WidgetTypes;
  chartTypes = ChartTypes;
  aggregateTypes = aggregateTypes;
  resultTypes = ResultTypes;
  periodicities = Periodicities;
  operatortype = OperatorType;

  devices: DeviceDto[] = [];
  widgetSetting: WidgetSetting = {};
  isShowSetting: boolean = true;
  styleList: StyleSetting[] = [];
  styleHeaders: string[] = [];
  chartList: WidgetAdditionalDataList[] = [];
  chartHeaders: string[] = [];
  dataIcon: any;
  ChartStyleSettings:ChartStyleSettingDto[] = []

  HTMLConfig: any = {
    base_url: '/admin/assets/tinymce',
    height: 500,
    menubar: true,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'print',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      ' fullscreen',
      'insertdatetime',
      'media',
      'table',
      'paste',
      'code',
      ' help',
      'wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help',
  };

  constructor(
    private toastService: ToastService,
    private widgetService: WidgetService,
    private sanitizer: DomSanitizer,
    private tenantSetting : TenantSettingService
  ) {}

  ngOnInit(): void {
    this.loadChartStyleSeting();
    if (this.widget.widget_data_icon)
      this.dataIcon = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.widget.widget_data_icon
      );
    if (this.widget.setting) {
      this.widgetSetting = this.widget.setting;

      this.styleList = this.widgetSetting.style_setting_list
        ? this.widgetSetting.style_setting_list
        : [];
      if (this.styleList.length) {
        this.styleHeaders = this.getHeaderStyle(this.styleList);
      }

      this.chartList = this.widgetSetting.widget_additional_data_list
        ? this.widgetSetting.widget_additional_data_list
        : [];
      if (this.chartList.length) {
        this.chartHeaders = this.getHeaderChart(this.chartList);
      }
    }
  }
  loadChartStyleSeting(){
    this.tenantSetting.tenantsettingListchartstylesettingGet().subscribe(i=> this.ChartStyleSettings = i);
  }
  save() {
    const body = {
      ...this.widget,
      setting: {
        ...this.widgetSetting,
        style_setting_list: this.styleList,
        widget_additional_data_list: this.chartList,
      },
    };
    if (this.styleList.length) {
      this.styleHeaders = this.getHeaderStyle(body.setting.style_setting_list);
    }
    if (this.chartList.length) {
      this.chartHeaders = this.getHeaderChart(
        body.setting.widget_additional_data_list
      );
    }
    if (this.widget.id) {
      this.widgetService
        .widgetIdPut({
          id: this.widget.id!,
          body,
        })
        .subscribe((i) => {
          this.toastService.success('Update widget successfull');
        });
    } else {
      this.widgetService
        .widgetPost({
          body,
        })
        .subscribe((i) => {
          this.toastService.success('Create widget successfull');
        });
    }
  }

  onChangeTemplate(widgetSelected: WidgetTemplateDto) {
    this.widget.chart_type = widgetSelected.template?.chart_type;
    this.widget.data_aggregate_type = widgetSelected.template?.data_aggregate_type;
    this.widget.data_point = widgetSelected.template?.data_point;
    this.widget.data_result_type = widgetSelected.template?.data_result_type;
    this.widget.periodicity = widgetSelected.template?.periodicity;
    this.widget.power_type = widgetSelected.template?.power_type;
    this.widget.widget_name = widgetSelected.template?.widget_name;
    this.widget.widget_type = widgetSelected.template?.widget_type;
  }

  addStyle() {
    this.styleList.unshift({
      value_from: null,
      value_to: null,
      value_equal: null,
      operator: undefined,
      color: null,
    });
    this.styleHeaders = this.getHeaderStyle(this.styleList);
  }

  getHeaderStyle(arr: StyleSetting[]) {
    const results: string[] = [];
    for (let value of arr) {
      const operator = value.operator ? `Operator: ${value.operator} - ` : '';
      const valueFrom = value.value_from ? `From: ${value.value_from} - ` : '';
      const valueTo = value.value_to ? `To: ${value.value_to} - ` : '';
      const valueEqual = value.value_equal ? `Eq: ${value.value_equal} - ` : '';
      const color = value.color ? `Color: ${value.color}` : '';
      const text = operator + valueFrom + valueTo + valueEqual + color;
      results.push(text);
    }
    return results;
  }

  addChart() {
    this.chartList.unshift({
      indicator_name: null,
      source_id: null,
      data_point: null,
      data_path: null,
      sub_id: null,
      unit: null,
      color: null,
    });
    this.chartHeaders = this.getHeaderChart(this.chartList);
  }

  removeActionMultiChart(index: number) {
    this.chartList.splice(index, 1);
  }

  getHeaderChart(arr: WidgetAdditionalDataList[]) {
    const results: string[] = [];
    for (let value of arr) {
      const indicatorName = value.indicator_name
        ? `Indicator Name: ${value.indicator_name} - `
        : '';
      const sourceId = value.source_id
        ? `Source Id: ${value.source_id} - `
        : '';
      const color = value.color ? `Color: ${value.color}` : '';
      const text = indicatorName + sourceId + color;
      results.push(text);
    }
    return results;
  }

  onSelect(event: any) {
    this.convertToBase64(event.files[0]);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return (this.widget = {
        ...this.widget,
        widget_data_icon: reader.result?.toString(),
      });
    };
  }

  onDeleteIcon() {
    this.widget = {
      ...this.widget,
      widget_data_icon: '',
    };
  }
}
