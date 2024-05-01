/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import DashboardCard from "@/components/dashboard/DashboardCard";
import ChartOption from "@/components/dashboard/chart-option/ChartOption";
import LineChart from "@/components/dashboard/line-chart/LineChart";
import PieChartCard from "@/components/dashboard/pie-chart/Pie";
import PieChart from "@/components/dashboard/pie-chart/PieChart";
import Progressbar from "@/components/dashboard/processbar/ProcessChart";
import TicketCategory from "@/components/dashboard/ticket-category/Index/TicketCategory";
import UserCountCard from "@/components/dashboard/user-count/UserCountCard";
import { styles } from "@/utilities/cn";
import { FiLoader } from "react-icons/fi";
import { HiSave } from "react-icons/hi";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const {
    activityStatusData,
    deviceHealthData,
    isAdministrator,
    isAgent,
    isClient,
    isExpert,
    isRoleWithoutClient,
    isSupervisor,
    lastMonthIncident,
    pendingPasswordRequest,
    teamsWithPercentage,
    ticketStatusChartData,
    topFiveProvinceByIncident,
    topTeamwiseUnresolveIncident,
    userCountData,
    incidents,
    clientIncident,
    clientStatusChartData,
    lastMonthClientIncident,
    isDashboardLoading,
    isDashboardSuccess,
  } = useDashboard();

  return (
    <>
      {isDashboardLoading && (
        <div className="flex justify-center items-center h-[90vh] w-full">
          <FiLoader size={35} className="animate-spin" />
        </div>
      )}
      {isDashboardSuccess && (
        <div className="bg-bgColor px-4">
          {/* Header section */}
          <div className="flex items-center md:items-start justify-between py-3">
            <div className="">
              <h1 className="mb-1">Dashboard</h1>
              <p className={"hidden"}>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          {/* Ticket Count Cards */}
          <div className="w-full mb-3">
            <TicketCategory
              incidents={incidents?.data}
              clientIncident={clientIncident}
              isClient={isClient}
              isAgent={isAgent}
              isSupervisor={isSupervisor}
              isExpert={isExpert}
              isAdministrator={isAdministrator}
            />
          </div>

          <div className="grid lg:grid-cols-4 2xl:grid-cols-6 gap-3 overflow-hidden">
            {isRoleWithoutClient && (
              <DashboardCard
                className={styles("col-span-3 md:col-span-2", {
                  "lg:col-span-2 2xl:col-span-3": isExpert,
                })}
                title="Last Seven Days Ticket Status"
              >
                <div className={`bg-whiteColor rounded-lg`}>
                  <div className="flex justify-between p-3">
                    <div>
                      <h3></h3>
                    </div>

                    <div className="hidden">
                      <button className="outline_btn py-[6px] px-5 h-fit">
                        <HiSave size={22} /> Save Report
                      </button>
                    </div>
                  </div>
                  <LineChart incidents={incidents?.data?.incidentInfoPerDays} />
                </div>
              </DashboardCard>
            )}

            {(isAgent || isSupervisor || isAdministrator) && (
              <DashboardCard
                className="col-span-3 md:col-span-2 py-3"
                title="Unresolved Tickets (Top Five)"
              >
                {/* <div className={`bg-whiteColor h-full rounded-lg`}> */}
                {/* <div className="space-y-1 py-2 pb-6">
                <h3>Unresolved Tickets (Top Five)</h3>
              </div> */}

                <div className="flex flex-col gap-5 mt-1">
                  {teamsWithPercentage?.map((item, index) => (
                    <Progressbar incident={item} key={index} />
                  ))}
                </div>
                {/* <button className="badge_btn_2 bg-violet-100 text-violetColor w-full py-[14px] mt-4 md:hidden">
                See More
              </button> */}
                {/* </div> */}
              </DashboardCard>
            )}
            {/* Additional charts */}
            {(isAgent || isSupervisor || isAdministrator) && (
              <DashboardCard
                className="col-span-3 md:col-span-2"
                title="Top Five Systems With Ticket Request"
              >
                <PieChart incidents={incidents?.data?.topSystemByIncidents} />
              </DashboardCard>
            )}

            <DashboardCard
              title="Ticket Status"
              className={styles(
                "col-span-3 md:col-span-2",
                {
                  "col-span-2 md:col-span-3 lg:col-span-2 2xl:col-span-3":
                    isClient,
                },
                { "md:col-span-2 2xl:col-span-3": isExpert }
              )}
            >
              <PieChartCard
                seriesData={
                  isClient ? clientStatusChartData : ticketStatusChartData
                }
                colors={["var(--chartGreenColor)", "var(--chartRedColor)"]}
              />
            </DashboardCard>

            {isRoleWithoutClient && (
              <DashboardCard
                title="Activity Status"
                className={`col-span-3 md:col-span-2 ${
                  isExpert && "col-span-2 lg:col-span-2 2xl:col-span-3"
                }`}
              >
                <PieChartCard seriesData={activityStatusData} />
              </DashboardCard>
            )}

            {(isAgent || isAdministrator) && (
              <DashboardCard
                className="col-span-3 md:col-span-2"
                title="Device Health"
              >
                <PieChartCard seriesData={deviceHealthData} />
              </DashboardCard>
            )}

            {(isAgent || isSupervisor || isAdministrator) && (
              <DashboardCard
                title="Pending Password Recovery Request"
                className="col-span-3 md:col-span-2"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <span className="h-[170px] w-[170px] bg-violetColor flex items-center justify-center rounded-full text-whiteColor text-5xl">
                    {pendingPasswordRequest?.data?.length}
                  </span>
                </div>
              </DashboardCard>
            )}

            {isRoleWithoutClient && (
              <DashboardCard
                title="Top Five Provinces With Ticket Request"
                className={styles(
                  "col-span-3 md:col-span-2",
                  {
                    "col-span-3 md:col-span-2": isExpert,
                  },
                  {
                    "col-span-3 md:col-span-2 lg:col-span-2 2xl:col-span-3":
                      isSupervisor,
                  },
                  {
                    "col-span-3 md:col-span-2 lg:col-span-2 2xl:col-span-3":
                      isExpert,
                  }
                )}
              >
                <ChartOption chartData={topFiveProvinceByIncident} />
              </DashboardCard>
            )}

            {(isAgent || isSupervisor || isAdministrator) && (
              <DashboardCard
                title="Teamwise Unresolved Tickets (Top Five)"
                className={styles("col-span-3 md:col-span-2", {
                  "col-span-3 md:col-span-2 lg:col-span-2 2xl:col-span-3":
                    isSupervisor,
                })}
              >
                <ChartOption chartData={topTeamwiseUnresolveIncident} />
              </DashboardCard>
            )}

            {!isExpert && (
              <DashboardCard
                title="Last Five Month Ticket Status"
                className={styles(
                  "col-span-3 md:col-span-2",
                  {
                    "col-span-2 md:col-span-3 lg:col-span-2 2xl:col-span-3":
                      isClient || isAgent,
                  },
                  {
                    "col-span-3 md:col-span-2 lg:col-span-2 2xl:col-span-3":
                      isSupervisor,
                  },
                  {
                    "col-span-3 md:col-span-2 lg:col-span-2 2xl:col-span-3":
                      isAdministrator,
                  }
                )}
              >
                <ChartOption
                  chartData={
                    isClient ? lastMonthClientIncident : lastMonthIncident
                  }
                  // title="Last Five Month Ticket Status"
                />
              </DashboardCard>
            )}

            {(isAgent || isSupervisor || isAdministrator) && (
              <DashboardCard
                title="User Data"
                className={styles(
                  "col-span-3 md:col-span-2",
                  {
                    "col-span-3 md:col-span-2 lg:col-span-full 2xl:col-span-3":
                      isAgent,
                  },
                  {
                    "col-span-3 md:col-span-2 lg:col-span-2 2xl:col-span-3":
                      isSupervisor,
                  },
                  {
                    "col-span-3 md:col-span-3 lg:col-span-full 2xl:col-span-3":
                      isAdministrator,
                  }
                )}
              >
                <div className="h-full lg:h-auto w-full flex flex-col gap-2">
                  <div className="flex gap-2 h-full">
                    <UserCountCard
                      title="Total User"
                      data={userCountData?.data?.totalUser}
                    />

                    <UserCountCard
                      title="Supervisor Users"
                      data={userCountData?.data?.totalSuperUser}
                    />
                  </div>

                  <div className="flex gap-2 h-full">
                    <UserCountCard
                      title="Client Users"
                      data={userCountData?.data?.totalClientUser}
                    />

                    <UserCountCard
                      title="Agent Users"
                      data={userCountData?.data?.totalAgentUser}
                    />

                    <UserCountCard
                      title="Expert Users"
                      data={userCountData?.data?.totalExpertUser}
                    />
                  </div>
                </div>
              </DashboardCard>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
