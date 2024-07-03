// Editable.js
import React, { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import CustomImage from "../../utils/ImageFormat";
import CustomVideo from "../../utils/VideoEmbedFormat";
import QuillViewer from "../quilViewer";

const Editable = ({ htmlContent, onSave }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(htmlContent);
  Quill.register("modules/blotFormatter", BlotFormatter);
  Quill.register({ "formats/image": CustomImage });
  Quill.register({ "formats/video": CustomVideo });
  Quill.debug("warning");

  //   Quill.register(CustomText);

  useEffect(() => {
    setEditedContent(htmlContent);
  }, [htmlContent]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
    onSave(editedContent);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
    ],
    clipboard: {
      matchVisual: false,
    },
    blotFormatter: {},
  };

  return (
    <div>
      {isEditMode ? (
        <div>
          <div className="mb-4">
            <span className="text-gray-500 text-xs mr-2">Save</span>
            <SaveIcon
              className="text-gray-400 hover:cursor-pointer hover:text-black"
              onClick={handleSaveClick}
            />
          </div>

          <ReactQuill
            modules={modules}
            theme="snow"
            value={editedContent}
            onChange={setEditedContent}
          />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <span className="text-gray-500 text-xs mr-2">Edit Content</span>
            <EditIcon
              className="text-gray-400 hover:cursor-pointer hover:text-black"
              onClick={handleEditClick}
            />
          </div>

          <QuillViewer content={editedContent} />
        </div>
      )}
    </div>
  );
};

export default Editable;
