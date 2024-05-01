import { User } from "./user";

export interface IncidentsResponse {
  totalIncident: number;
  avgHandlingDuration: number;
  minHandlingDuration: number;
  maxHandlingDuration: number;
  closePercentage: "0 %";
  currentPage: number;
  list: Incident[];
}

export interface Incident {
  ticketNo?: string;
  ticketTitle: string;
  facilityName: string;
  teamName?: any;
  dateReported: string;
  systemId: number;
  provinceId: number;
  districtId: number;
  facilityId: number;
  priorityId?: any;
  expertId?: any;
  assignTeamId?: any;
  assignId?: any;
  startDate: string;
  openByAdmin?: any;
  openByAgent?: any;
  openBySupervisor?: any;
  openByExpertLead?: any;
  openByExpert?: any;
  ticketClosed?: any;
  totalTime?: any;
  status: string;
  expertLeadName?: any;
  expertName?: any;
  agentName?: any;
  supervisorName?: any;
  ticketOpenedBy: string;
  provinceName: string;
  districtName: string;
  description: string;
  firstLevelCategoryId?: any;
  secondLevelCategoryId?: any;
  thirdLevelCategoryId?: any;
  firstLevelCategory?: any;
  secondLevelCategory?: any;
  thirdLevelCategory?: any;
  priority?: any;
  totalPendingTime?: any;
  systemName: string;
  callerName?: any;
  callerCellphone?: any;
  callerEmail?: any;
  callerCountryCode?: any;
  callerJobTitle?: any;
  callingDate?: any;
  reassignedTo?: any;
  reassignDate?: any;
  assignedToState?: any;
  dateOfIncident: string;
  clientName: string;
  adminName?: any;
  fundingAgencyName: string;
  implementingPartnerName: string;
  userCellphone: string;
  userEmail?: string;
  // startDate: string;
  fullname?: string;
  oid?: number;
  dateResolved?: any;
  isResolved?: boolean;
  isOpen?: boolean;
  projectName?: string;
  provincName?: string;
  reportedBy?: number;
  fullName?: string;
  phoneNumber?: string;
  assignedTo?: number | string;
  assignedName?: string;
  hasImg?: boolean;
  isReassigned?: boolean;
  dateCreated?: any;
  dateModified?: any;
  createdBy?: any;
  modifiedBy?: any;
  incidentFundingAgencies?: any;
  incidentImplemenentingPartners?: any;
  teamId?: string;
  userEmailts?: string;
}

export interface Notifications {
  ticketTitle: string;
  incidentId: number;
  dateOfIncident: string;
  totalMessage: number;
}

export type Project = {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  title: string;
  description: string;
};

export type IncidentActionLog = {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  incidentId?: number;
  incident?: Incident;
  agentId?: number | null;
  userAccountAgents?: User;
  agentDateModified?: string | null;
  supervisedId?: number | null;
  userAccountsSuperviseds?: User;
  supervisedDateModified?: string | null;
  teamLeadId?: number | null;
  userAccountsTeamLeads?: User;
  teamLeadDateModified?: string | null;
  expertId?: number | null;
  userAccountExperts?: User;
  expertDateModified?: string | null;
  adminId?: number | null;
  userAccountAdmins?: User;
  adminDateModified?: string | null;
  closeUserAccountId?: number | null;
  userAccountsClosed?: User;
  dateClosed?: string | null;
};
export interface TypeIncidentEdit {
  oid?: string;
  ticketNo?: string;
  ticketTitle?: string;
  facilityName?: string;
  startDate?: string;
  openByAdmin?: any;
  openByAgent?: any;
  openBySupervisor?: any;
  openByExpertLead?: any;
  openByExpert?: any;
  ticketClosed?: any;
  totalTime?: any;
  status?: string;
  expertLeadName?: any;
  expertName?: string;
  agentName?: any;
  supervisorName?: any;
  ticketOpenedBy?: string;
  provinceName?: string;
  districtName?: string;
  description?: string;
  firstLevelCategory?: string;
  secondLevelCategory?: string;
  thirdLevelCategory?: string;
  priority?: string;
  totalPendingTime?: any;
  systemName?: string;
  callerName?: string;
  callerCellphone?: string;
  callerEmail?: string;
  callerJobTitle?: string;
  callingDate?: any;
  reassignedTo?: any;
  reassignDate?: any;
  assignedToState?: any;
  dateOfIncident?: string;
  clientName?: any;
  adminName?: any;
  fundingAgencyName?: string;
  implementingPartnerName?: string;
  userCellphone?: string;
  userEmail?: string;
  provinceId: string;
  districtId: string;
  facilityId: string;
  firstLevelCategoryId: string;
  secondLevelCategoryId: string;
  thirdLevelCategoryId: string;
  teamId: string;
  systemId?: string;
  assignedTo?: string;
  teamLeadId?: string;
  priorityId?: string;
  isOpen: boolean;
  isReassigned?: boolean;
  screenshots?: string[];
  incidentFundingAgencies: [] | null;
  incidentImplemenentingPartners: [] | null;
  fundingAgencyId: [] | null;
  implementingPartnerId: [] | null;
}

export interface TypeIncidentEditData {
  totalIncident: number;
  currentPage: number;
  list: List[];
}

export interface List {
  ticketNo?: string;
  ticketTitle: string;
  facilityName: string;
  teamName?: any;
  dateReported: string;
  systemId: number;
  provinceId: number;
  districtId: number;
  facilityId: number;
  priorityId?: any;
  expertId?: any;
  assignTeamId?: any;
  assignId?: any;
  startDate: string;
  openByAdmin?: any;
  openByAgent?: any;
  openBySupervisor?: any;
  openByExpertLead?: any;
  openByExpert?: any;
  ticketClosed?: any;
  totalTime?: any;
  status: string;
  expertLeadName?: any;
  expertName?: any;
  agentName?: any;
  supervisorName?: any;
  ticketOpenedBy: string;
  provinceName: string;
  districtName: string;
  description: string;
  firstLevelCategoryId?: any;
  secondLevelCategoryId?: any;
  thirdLevelCategoryId?: any;
  firstLevelCategory?: any;
  secondLevelCategory?: any;
  thirdLevelCategory?: any;
  priority?: any;
  totalPendingTime?: any;
  systemName: string;
  callerName?: any;
  callerCellphone?: any;
  callerEmail?: any;
  callerCountryCode?: any;
  callerJobTitle?: any;
  callingDate?: any;
  reassignedTo?: any;
  reassignDate?: any;
  assignedToState?: any;
  dateOfIncident: string;
  clientName: string;
  adminName?: any;
  fundingAgencyName: string;
  implementingPartnerName: string;
  userCellphone: string;
  userEmail?: string;
  // startDate: string;

  oid?: number;
  dateResolved?: any;
  isResolved?: boolean;
  isOpen?: boolean;
  projectName?: string;
  provincName?: string;
  reportedBy?: number;
  fullName?: string;
  phoneNumber?: string;
  assignedTo?: number | string;
  assignedName?: string;
  hasImg?: boolean;
  isReassigned?: boolean;
  dateCreated?: any;
  dateModified?: any;
  createdBy?: any;
  modifiedBy?: any;
  incidentFundingAgencies?: any;
  incidentImplemenentingPartners?: any;
  teamId?: string;
  userEmailts?: string;
}

export interface IncidentByUserName {
  totalIncidents: number;
  resolvedIncidents: number;
  unresolvedIncidents: number;
  totalUsers: number;
  totalAssigned: number;
  totalUnassigned: number;
  totalUrgent: number;
  totalPendingRecoveryRequest: number;
  topProvincesByIncidents: TopProvincesByIncident[];
  topSystemByIncidents: TopSystemByIncident[];
  topTeamByUnresolvedIncidents: TopTeamByUnresolvedIncident[];
  incidentInfoPerDays: IncidentInfoPerDay[];
  lastMonthTotalTickets: LastMonthTotalTicket[];
}

export interface IncidentInfoPerDay {
  incidentDate: Date;
  totalOpenIncident: number;
  totalClosedIncident: number;
}

export interface LastMonthTotalTicket {
  month: string;
  count: number;
}

export interface TopProvincesByIncident {
  proviceName: string;
  incidentCount: number;
}

export interface TopSystemByIncident {
  systemName: string;
  incidentCount: number;
}

export interface TopTeamByUnresolvedIncident {
  teamName: string;
  incidentCount: number;
}

export interface ClientIncdent {
  totalTickets: number;
  totalCloseTickets: number;
  totalOpenTickets: number;
  lastMonthTotalTickets: LastMonthTotalTicket[];
}
