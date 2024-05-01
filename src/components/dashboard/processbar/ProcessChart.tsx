/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Andrew
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import { TopTeamByUnresolvedIncident } from "@/constants/api-interface";

/**
 * @description Progressbar component.
 */
interface Props extends TopTeamByUnresolvedIncident {
  percentage: number;
}

export default function Progressbar({ incident }: { incident: Props }) {


  return (
    <div className="flex flex-col items-start">
      {/* Progress bar */}
      <div className="w-full h-[9px] bg-disabledColor rounded-full relative overflow-hidden">
        <div
          className="h-full rounded-lg transition-all duration-500 bg-gradient-to-r from-violetColor via-violetColor to-hotPinkColor"
          style={{
            width: `${incident?.percentage}%`,
          }}
        ></div>
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center w-full mt-1">
        <h4 className="text-violetColor">{incident?.teamName}</h4>
        <h5>{incident?.percentage}%</h5>
      </div>
    </div>
  );
}
