// export interface DeviceLog {}
export interface Device {}
export interface RdpLoginInfo {}

export interface ConnectResponse {
  statusCode: number;
  message: string;
  data: string;
  isSuccess: boolean;
}

export interface RDPDeviceInfo {
  oid: number;
  userName: string;
  deviceId: string;
  privateIp: string;
  macAddress: string;
  motherBoardSerial: string;
  publicIp: string;
  facilityName: string;
  districtName: string;
  provinceName: string;
  userTypeName: string;
  dateCreated: string;
  createdBy: string;
  dateModified: string;
  modifiedBy: string;
  isDeleted: boolean;
}

export interface RDPDevice {
  agentVersion: string;
  alerts: any;
  alias: any;
  cpuUtilization: number;
  currentUser: string;
  deviceGroup: any;
  deviceGroupID: any;
  deviceName: string;
  drives: Driver[];
  id: string;
  is64Bit: boolean;
  isOnline: boolean;
  onlineStatus: any;
  lastOnline: string;
  notes: any;
  organizationID: string;
  osArchitecture: number;
  osDescription: string;
  platform: string;
  processorCount: number;
  publicIP: string;
  serverVerificationToken: string;
  tags: string;
  totalMemory: number;
  totalStorage: number;
  usedMemory: number;
  usedMemoryPercent: number;
  usedStorage: number;
  usedStoragePercent: number;
  webRtcSetting: number;
  offlineHours: string;
  onlineHours: string;
  onlineHoursInDigit: number;
  offlineHoursInDigit: number;
  provinceId: string;
  districtId: string;
  facilityId: string;
}

export interface Driver {
  driveType: number;
  rootDirectory: string;
  name: string;
  driveFormat: string;
  freeSpace: number;
  totalSize: number;
  volumeLabel: string;
}

export interface DeviceLog {
  statusCode: number;
  message: string;
  data: DeviceLogData[];
  isSuccess: boolean;
}
export interface DeviceLogData {
  deviceID: string;
  deviceName: string;
  onlineHours: string;
  offlineHours: string;
  sl: number;
  userName: string;
  provinceName?: any;
  districtName?: any;
  facilityName?: any;
  itExpertName: string;
  userType?: any;
  platform: string;
  processors: string;
  usedStorage: number;
  publicIP: string;
  privateIP: string;
  macAddress: string;
  motherboardSerial: string;
  onlineHoursDigit: number;
  offlineHoursDigit: number;
}
export interface DeviceIntermittenceType {
  deviceID: string;
  deviceName: string;
  onlineHours: string;
  offlineHours: string;
  sl: number;
  userName: string;
  provinceName?: any;
  districtName?: any;
  facilityName?: any;
  itExpertName: string;
  userType?: any;
  platform: string;
  processors: string;
  usedStorage: number;
  publicIP: string;
  privateIP: string;
  macAddress: string;
  motherboardSerial: string;
  onlineHoursDigit: number;
  offlineHoursDigit: number;
  oid: number;
  deviceId: string;
  privateIp: string;
  motherBoardSerial: string;
  publicIp: string;
  userTypeName?: any;
  dateCreated: string;
  createdBy?: any;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}