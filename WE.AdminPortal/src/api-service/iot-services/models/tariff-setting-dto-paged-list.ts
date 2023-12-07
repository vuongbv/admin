/* tslint:disable */
/* eslint-disable */
import { TariffSettingDto } from './tariff-setting-dto';
export interface TariffSettingDtoPagedList {
  has_next_page?: boolean;
  has_previous_page?: boolean;
  index_from?: number;
  items?: null | Array<TariffSettingDto>;
  page_index?: number;
  page_size?: number;
  total_count?: number;
  total_pages?: number;
}
