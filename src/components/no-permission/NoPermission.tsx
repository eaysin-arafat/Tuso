/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import BackIcon from "@/assets/icons/Back";
import React from "react";
import { useNavigate } from "react-router-dom";

// No permission component
const NoPermission: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] ">
      <h1 className="text-2xl font-bold mb-4 text-violetColor">
        You have no permission for this page
      </h1>
      <button onClick={() => navigate(-1)} className="main_btn">
        {" "}
        <BackIcon /> Go Back
      </button>
    </div>
  );
};

export default NoPermission;
