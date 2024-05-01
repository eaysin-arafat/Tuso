export interface Pagination {
  key?: string | number;
  start?: number;
  take?: number;
  search?: string;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  status?: string;
  role?: number;
  name?: string;
  userAccountId?: number;
  isresolved?: boolean;
}
export interface AdvanceSearchPagination {
  key?: string;
  start?: number;
  take?: number;
  search?: string;
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  status?: string;
  systemId?: string;
  districtId?: string;
  provinceId?: string;
  facilityId?: string;
  ticketNo?: string;
  toDate?: string;
  fromDate?: string;
  assignedTo?: string;
  userName?: string;
  isresolved?: boolean;
}
