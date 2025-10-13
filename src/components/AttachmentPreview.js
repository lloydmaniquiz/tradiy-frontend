import React, { useState } from "react";
import "../styles/AttachmentPreview.css";

function AttachmentPreview({ attachments }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  if (!attachments || attachments.length === 0) return null; // nothing rendered if empty

  const isImage = (file) => /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file);

  return (
    <div className="attachments-section">
      <h3 className="attachments-title">Attachments</h3>

      <div className="attachments">
        {attachments.map((file, i) => (
          <div
            key={i}
            className="attachment-item"
            onClick={() => {
              if (isImage(file)) {
                setSelected(i);
                setOpen(true);
              } else {
                window.open(file, "_blank"); // open docs directly
              }
            }}
          >
            {isImage(file) ? (
              <img
                src={file}
                alt={`attachment-${i}`}
                className="attachment-thumb"
              />
            ) : (
              <div className="attachment-doc">
                <span role="img" aria-label="doc">
                  📄
                </span>
                <p className="attachment-name">{file.split("/").pop()}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox for images only */}
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={() => setOpen(false)}>
              ✕
            </button>
            <img src={attachments[selected]} alt="full-preview" />
            {attachments.filter(isImage).length > 1 && (
              <div className="lightbox-nav">
                <button
                  onClick={() =>
                    setSelected((prev) =>
                      prev === 0 ? attachments.length - 1 : prev - 1
                    )
                  }
                >
                  ◀
                </button>
                <button
                  onClick={() =>
                    setSelected((prev) =>
                      prev === attachments.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AttachmentPreview;
