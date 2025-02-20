import React from "react";
import { AiOutlineFilePdf, AiOutlineFileText, AiOutlineDelete } from "react-icons/ai";

const UploadModal = ({ modalType, setModalType, uploadedFiles, handleFileUpload, handleDrop, handleDelete, errorMessage }) => {
  if (!modalType) return null; // Do not render if modalType is null

  return (
    <div className="regForm-modal-overlay">
      <div className="regForm-modal-content">
        <div className="regForm-modal-header">
          <h3 className="regForm-modal-heading">Upload Files</h3>
          <button onClick={() => setModalType(null)} className="regForm-close-button">&times;</button>
        </div>
        
        <div
          className="regForm-drag-and-drop-container"
          onDrop={(e) => handleDrop(e, modalType)}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="regForm-modal-description">Please upload your {modalType}</p>

          {errorMessage && <p className="regForm-error-message" style={{ color: 'red' }}>{errorMessage}</p>}
          
          {/* Custom file input */}
          <label htmlFor="fileInput" className="regForm-custom-button">
            Drag & drop to upload<br />
            <span className="browse-text">or browse</span>
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            multiple={modalType !== "Business Logo"}
            className="regForm-file-input"
            style={{ display: 'none' }} // Hide the default file input button
          />
        </div>

        {uploadedFiles[modalType]?.length > 0 && (
          <div className="regForm-uploaded-files">
            {uploadedFiles[modalType].map((file, index) => {
              const isImage = file.name.match(/\.(jpg|jpeg|png|gif)$/i);
              const previewURL = isImage ? URL.createObjectURL(file) : null;
              let IconComponent;

              if (!isImage) {
                if (file.name.match(/\.(pdf)$/i)) {
                  IconComponent = AiOutlineFilePdf;
                } else if (file.name.match(/\.(docx?|txt)$/i)) {
                  IconComponent = AiOutlineFileText;
                }
              }

              return (
                <div key={index} className="regForm-file-item">
                  <div className="icon-file">
                    {isImage ? (
                      <img
                        src={previewURL}
                        alt="Uploaded Preview"
                        style={{ width: "2rem", height: "2rem", objectFit: "cover", borderRadius: "4px" }}
                      />
                    ) : (
                      IconComponent && <IconComponent size={"2rem"} style={{ color: '#000839' }} />
                    )}
                    <div className="regForm-file-details">
                      <h2 className="regForm-file-name">{file.name}</h2>
                      <span className="regForm-file-size">{(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(index)} className="regForm-delete-button">
                    <AiOutlineDelete size={24} style={{ color: 'red' }} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
