export interface ProfilePicture {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  oid: number;
  profilePictures: string;
  dateCreated?: any;
  createdBy?: any;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}
