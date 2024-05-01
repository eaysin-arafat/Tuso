/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

import React, { forwardRef, useState } from "react";
import { FaCloudUploadAlt, FaTimesCircle } from "react-icons/fa";

type Props = {
  onChange?: (base64Images: string[]) => void;
  accept?: string;
  disabled?: boolean;
  className?: string;
  isImage?: string[];
  onRemove?: () => void;
};

const MultipleFileInput = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const {
      onChange,
      accept = ".jpg,.png",
      disabled,
      className,
      isImage,
      onRemove,
    } = props;

    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleImageChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const files = e.target.files;
      if (!files) return;

      const base64Images: string[] = [];

      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        if (file?.type === "image/jpeg" || file?.type === "image/png") {
          const reader = new FileReader();
          reader?.readAsDataURL(file);
          reader.onload = () => {
            const base64WithoutPrefix = (reader?.result as string)?.split(",")[1];
            base64Images.push(base64WithoutPrefix);
            setFileNames((prevState) => [...prevState, file?.name]);
            if (base64Images?.length === files?.length && onChange) {
              onChange(base64Images);
            }
          };
          reader.onerror = (error) => {
            console.error(
              "Error occurred while converting image to base64:",
              error
            );
          };
        } else {
          console.error("Invalid file type:", file.type);
        }
      }
    };

    const handleRemove = () => {
      setFileNames([]);
      if (onRemove) {
        onRemove();
      }
    };

    return (
      <div className={`relative ${className}`}>
        {isImage?.length > 0 && (
          <button
            type="button"
            className="text-redColor hover:text-redColor absolute right-2 top-2"
            onClick={handleRemove}
          >
            <FaTimesCircle />
          </button>
        )}
        <label
          htmlFor="multipleFileInput"
          className="cursor-pointer flex items-center gap-4 px-5 py-3 rounded-xl border border-borderColor bg-whiteColor"
        >
          <div className="p-2 flex items-center justify-center bg-violetColor text-whiteColor rounded-lg">
            <FaCloudUploadAlt className="text-whiteColor" />
          </div>
          <div className="">
            <h4 className="block font-semibold text-textColor">
              {fileNames?.length > 0
                ? `${fileNames?.length} ${
                    fileNames?.length > 1 ? "Attachment" : "Attachment"
                  } Added`
                : "Add Attachment"}
            </h4>
            {fileNames?.map((fileName, index) => (
              <p key={index} className="mt-0.5 block text-grayTextColor">
                {fileName}
              </p>
            ))}
            <p className="mt-0.5 block text-grayTextColor">
              Please choose only jpg or png files
            </p>
          </div>
        </label>
        <input
          type="file"
          id="multipleFileInput"
          accept={accept}
          multiple
          onChange={handleImageChange}
          disabled={disabled}
          className="hidden"
          ref={ref}
        />
      </div>
    );
  }
);

export default MultipleFileInput;
