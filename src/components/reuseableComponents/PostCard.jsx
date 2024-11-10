import React, { useEffect } from "react";
import parse from "html-react-parser";
import { MyTypoGraphy } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAllImagesThunk } from "../../features/fileSlice";

export default function PostCard({ myClass = "", post }) {
  const { title, shortDescription, status, blogImage, $createdAt, $updatedAt } =
    post;
  let date = new Date($createdAt);
  let date2 = new Date($updatedAt);
  const dispatch = useDispatch();
  const { preview_URL_Arr } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(getAllImagesThunk());
  }, []);

  return (
    <div
      className={`${myClass} shadow-lg shadow-gray-500 rounded-xl relative h-[25rem] flex flex-col justify-between`}
    >
      {preview_URL_Arr.some((preview) => preview.fileId === blogImage) && (
        <img
          src={
            preview_URL_Arr.find((preview) => preview.fileId === blogImage)
              ?.URL || ""
          }
          alt={`${title}'s image`}
          className="h-1/2 w-full rounded-md"
        />
      )}

      <div className="p-3 h-1/2 flex flex-col justify-between">
        <MyTypoGraphy myClass="text-2xl font-bold capitalize">
          {title}
        </MyTypoGraphy>
        <h1 className="text-gray-600">{parse(shortDescription)}</h1>

        <MyTypoGraphy myClass="capitalize absolute bg-customPurple top-2 left-2 text-white rounded-md text-[0.7rem] px-2 py-1">
          {status}
        </MyTypoGraphy>
        <div className="flex justify-between">
          <MyTypoGraphy myClass="text-[0.8rem]">
            Post Date: {date.toLocaleDateString()}
          </MyTypoGraphy>
          <MyTypoGraphy myClass="text-[0.8rem]">
            Update Date: {date2.toLocaleDateString()}
          </MyTypoGraphy>
        </div>
      </div>
    </div>
  );
}
