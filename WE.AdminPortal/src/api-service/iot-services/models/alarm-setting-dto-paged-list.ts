/* tslint:disable */
/* eslint-disable */
import { AlarmSettingDto } from './alarm-setting-dto';
export interface AlarmSettingDtoPagedList {
  has_next_page?: boolean;
  has_previous_page?: boolean;
  index_from?: number;
  items?: null | Array<AlarmSettingDto>;
  page_index?: number;
  page_size?: number;
  total_count?: number;
  total_pages?: number;
}
