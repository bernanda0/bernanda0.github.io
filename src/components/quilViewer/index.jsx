import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import CustomImage from "../../utils/ImageFormat";
import CustomVideo from "../../utils/VideoEmbedFormat";

const QuillViewer = ({ content }) => {
  Quill.register({ "formats/image": CustomImage });
  Quill.register({ "formats/video": CustomVideo });
  Quill.debug('warning');

  return (
    <div className="quill-viewer-container">
      <ReactQuill
        modules={{
          toolbar: false,
        }}
        value={content}
        readOnly={true}
      />
    </div>
  );
};

export default QuillViewer;
