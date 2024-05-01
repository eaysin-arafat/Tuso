/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import SettingsLoader from "@/components/core/loader/SettingsLoader";
import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";
import ErrorBoundaryFallback from "@/components/error-boundary/ErrorBoundaryFallback";
import NoPermission from "@/components/no-permission/NoPermission";
import SettingsSidebar from "@/components/sidebar/Settings";
import usePermissions from "@/components/sidebar/sidebar-routes-array/usePermissions";
import {
  setEmailNotification,
  setSystems,
} from "@/features/client-form/client-form-slice";
import { useReadEmailTemplatesQuery } from "@/features/email-template/email-template-api";
import { useReadSystemsQuery } from "@/features/systems/system-api";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const SeetingsLayout = () => {
  const { settingsPermission } = usePermissions();
  const dispatch = useDispatch();

  const { data: emailNotification } = useReadEmailTemplatesQuery();
  const { data: systems } = useReadSystemsQuery();
  dispatch(setEmailNotification(emailNotification));
  dispatch(setSystems(systems));

  return (
    <div className="md:grid md:grid-cols-3 px-4 gap-5 bg-bgColor">
      <div className="md:col-span-1">
        <SettingsSidebar />
      </div>
      <main className="w-full md:mt-2 md:col-span-2">
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          <Suspense fallback={<SettingsLoader />}>
            {settingsPermission ? <Outlet /> : <NoPermission />}
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default SeetingsLayout;
