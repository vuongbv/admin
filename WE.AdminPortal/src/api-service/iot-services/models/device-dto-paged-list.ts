/* tslint:disable */
/* eslint-disable */
import { DeviceDto } from './device-dto';
export interface DeviceDtoPagedList {
  has_next_page?: boolean;
  has_previous_page?: boolean;
  index_from?: number;
  items?: null | Array<DeviceDto>;
  page_index?: number;
  page_size?: number;
  total_count?: number;
  total_pages?: number;
}
