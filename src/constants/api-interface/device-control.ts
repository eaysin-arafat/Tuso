export interface DeviceControl {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  cpuUses?: number | null;
  memoryUses?: number | null;
}

export interface DeviceControlTypes {
  statusCode: number;
  message: string;
  data: Device[];
  isSuccess: boolean;
}

interface Device {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  cpuUses?: number | null;
  memoryUses?: number | null;
}
