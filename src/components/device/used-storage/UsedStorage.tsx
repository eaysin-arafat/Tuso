/*
 * Created by: Andrew
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import { Driver } from "@/constants/api-interface";
import { closeViewModal } from "@/features/modal/modal-slice";
import { useDispatch } from "react-redux";

// storage details props types
type Props = {
  data: Driver[];
};

/**
 * @description used storage details component
 */
const UsedStorageDetails = ({ data }: Props) => {
  // action dispatcher
  const dispatch = useDispatch();

  // close modal handler
  const closeModal = () => {
    dispatch(closeViewModal());
  };
  return (
    <div>
      {/* Modal */}
      <DefaultModal toggler={closeModal} title="Driver Details" size="2xl">
        <div className="overflow-x-auto ">
          {data.map((item, index) => (
            <div key={index}>
              {/* TITLE */}
              <h4 className="text-center mb-3 font-bold">
                Drive : {item?.name?.split(":")[0]}
              </h4>

              {/* TABLE */}
              <table className="table text-textColor text-xs 2xl:text-sm border border-borderColor rounded-md ">
                {/* TABLE HEAD */}
                <thead>
                  <tr className="border-borderColor">
                    <th>Driver Format</th>
                    <th>{item?.driveFormat}</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  <tr className="bg-whiteColor border-borderColor ">
                    <td>Total Size</td>
                    <td>{item?.totalSize}</td>
                  </tr>
                  <tr className="bg-whiteColor border-borderColor">
                    <td>Free Space</td>
                    <td>{item?.freeSpace}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </DefaultModal>
    </div>
  );
};

export default UsedStorageDetails;
