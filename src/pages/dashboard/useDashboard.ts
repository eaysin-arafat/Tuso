/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { RootState } from "@/app/store";
import { useReadDeviceControlsQuery } from "@/features/device-control/device-control-api";
import {
  useReadIncidentCountByClientCountQuery,
  useReadIncidentCountQuery,
} from "@/features/incidents/incidents-api";
import { useReadRecoveryRequestsQuery } from "@/features/recovery-request/recovery-request";
import { useReadUserAccountsQuery } from "@/features/user-accounts/user-accounts-api";
import useDeviceData from "@/hooks/device/useDeviceData";
import { useSelector } from "react-redux";

const useDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { deviceData } = useDeviceData();

  const {
    data: incidents,
    isLoading: isIncidentLoading,
    isError: isIncidentError,
    isSuccess: isIncidentSuccess,
  } = useReadIncidentCountQuery(user?.username, {
    skip: !user?.username || user?.roleId === 1,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: clientIncident,
    isLoading: isClientIncidentLoading,
    isError: isClientIncidentError,
    isSuccess: isClientIncidentSuccess,
  } = useReadIncidentCountByClientCountQuery(user?.username, {
    skip: !user?.username || user?.roleId !== 1,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: deviceControlData,
    isLoading: isDeviceControlLoading,
    isError: isDeviceControlError,
    isSuccess: isDeviceControlSuccess,
  } = useReadDeviceControlsQuery(undefined, {
    skip: user?.roleId === 1,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: userCountData,
    isLoading: isUserCountDataLoading,
    isError: isUserCountDataError,
    isSuccess: isUserCountDataSuccess,
  } = useReadUserAccountsQuery(undefined, {
    skip: user?.roleId === 1,
    refetchOnMountOrArgChange: true,
  });
  const {
    data: pendingPasswordRequest,
    isLoading: isPendingPassLoading,
    isSuccess: isPendingPassSuccess,
    isError: isPendingPassError,
  } = useReadRecoveryRequestsQuery(undefined, {
    skip: user?.roleId === 1,
    refetchOnMountOrArgChange: true,
  });

  const isLoading =
    isIncidentLoading ||
    isUserCountDataLoading ||
    isDeviceControlLoading ||
    isClientIncidentLoading ||
    isPendingPassLoading;
  const isSuccess =
    isPendingPassSuccess ||
    isUserCountDataSuccess ||
    isDeviceControlSuccess ||
    isClientIncidentSuccess ||
    isIncidentSuccess;
  const isError =
    isPendingPassError ||
    isUserCountDataError ||
    isDeviceControlError ||
    isClientIncidentError ||
    isIncidentError;

  const isDashboardLoading = isLoading && !isError && !isSuccess;
  const isDashboardSuccess = !isLoading && !isError && isSuccess;

  const onlineDevice = deviceData?.filter((device) => device?.isOnline)?.length;
  const offLineDevice = deviceData?.filter(
    (device) => !device?.isOnline
  )?.length;

  const unhealthyDevices = deviceData?.filter((device) => {
    const memoryUserPercent = Math.round(device?.usedMemoryPercent * 100);
    const cpuUsesPercent = Math.round(device?.cpuUtilization * 100);

    return (
      memoryUserPercent > deviceControlData?.data?.[0]?.memoryUses ||
      cpuUsesPercent > deviceControlData?.data?.[0]?.cpuUses
    );
  });

  const teamunresolve = incidents?.data?.topTeamByUnresolvedIncidents;
  const totalIncidentCount = teamunresolve?.reduce(
    (total, team) => total + team?.incidentCount,
    0
  );

  const teamsWithPercentage = teamunresolve?.map((team) => ({
    teamName: team?.teamName,
    incidentCount: team?.incidentCount,
    percentage: Math?.round((team.incidentCount / totalIncidentCount) * 100),
  }));

  const ticketStatusChartData = [
    {
      name: "Open",
      y: incidents?.data?.unresolvedIncidents,
      sliced: true,
      selected: true,
    },
    {
      name: "Closed",
      y: incidents?.data?.resolvedIncidents,
    },
  ];

  const clientStatusChartData = [
    {
      name: "Open",
      y: clientIncident?.data?.totalOpenTickets,
      sliced: true,
      selected: true,
    },
    {
      name: "Closed",
      y: clientIncident?.data?.totalCloseTickets,
    },
  ];

  const isClient = user?.roleId === 1;
  const isAgent = user?.roleId === 2;
  const isSupervisor = user?.roleId === 3;
  const isExpert = user?.roleId === 4;
  const isAdministrator = user?.roleId === 5;
  // const isExpertTeamLeader = user?.roleId === 4 && user?.isTeamLead;

  const isRoleWithoutClient =
    isAgent || isSupervisor || isExpert || isAdministrator;

  const activityStatusData = [
    {
      name: "Active Devices",
      y: onlineDevice,
      sliced: true,
      selected: true,
    },
    {
      name: "Inactive Devices",
      y: offLineDevice,
    },
  ];

  const deviceHealthData = [
    {
      name: "Healthy Devices",
      y: deviceData?.length - unhealthyDevices?.length,
      sliced: true,
      selected: true,
    },
    {
      name: "Unhealthy Devices",
      y: unhealthyDevices?.length,
    },
  ];

  const topFiveProvinceByIncident =
    incidents?.data?.topProvincesByIncidents?.map((item) => ({
      name: item?.proviceName,
      data: [{ y: item?.incidentCount }],
    }));

  const topTeamwiseUnresolveIncident =
    incidents?.data?.topTeamByUnresolvedIncidents?.map((item) => ({
      name: item?.teamName,
      data: [{ y: item?.incidentCount }],
    }));

  const lastMonthIncident = incidents?.data?.lastMonthTotalTickets?.map(
    (item) => ({
      name: item?.month,
      data: [{ y: item?.count }],
    })
  );

  const lastMonthClientIncident =
    clientIncident?.data?.lastMonthTotalTickets?.map((item) => ({
      name: item?.month,
      data: [{ y: item?.count }],
    }));

  return {
    lastMonthIncident,
    topTeamwiseUnresolveIncident,
    topFiveProvinceByIncident,
    deviceHealthData,
    activityStatusData,
    isRoleWithoutClient,
    isClient,
    isSupervisor,
    isAdministrator,
    isAgent,
    isExpert,
    userCountData,
    pendingPasswordRequest,
    teamsWithPercentage,
    ticketStatusChartData,
    incidents,
    clientIncident: clientIncident?.data,
    clientStatusChartData,
    lastMonthClientIncident,
    isDashboardLoading,
    isDashboardSuccess,
  };
};

export default useDashboard;
