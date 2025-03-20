import { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Close, ArrowBack, ArrowForward } from "@mui/icons-material";

const Gallery = ({ workImages }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedIndex(null);
    setOpen(false);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : workImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < workImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className={`gallery-container images-${workImages.length}`}>
      {workImages.length > 0 && (
        <>
          {workImages
            .slice(0, Math.min(workImages.length, 5))
            .map((img, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => handleOpen(index)}
              >
                <img src={img} alt={`Work-${index}`} />
              </div>
            ))}

          {workImages.length > 5 && (
            <div className="more-overlay" onClick={() => handleOpen(5)}>
              <span>+{workImages.length - 5}</span>
            </div>
          )}
        </>
      )}

      {/* Image Preview Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent className="modal-container">
          <IconButton className="close-btn" onClick={handleClose}>
            <Close />
          </IconButton>

          <IconButton className="prev-btn" onClick={handlePrev}>
            <ArrowBack />
          </IconButton>

          <img
            src={workImages[selectedIndex]}
            alt="Selected Work"
            className="modal-image"
          />

          <IconButton className="next-btn" onClick={handleNext}>
            <ArrowForward />
          </IconButton>
        </DialogContent>
      </Dialog>

      {/* CSS Styles */}
      <style>
        {`
          .gallery-container {
            display: grid;
            gap: 10px;
          }

          /* Smaller Gallery Item */
          .gallery-item {
            width: 100%;
            height: 400px; /* Reduce the height */
            cursor: pointer;
            overflow: hidden;
          }

          /* Image styling */
          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }

          /* Dynamic Layouts */
          .gallery-container.images-1,
          .gallery-container.images-2 {
            grid-template-columns: repeat(2, 1fr);
          }

          .gallery-container.images-3 {
            grid-template-columns: repeat(3, 1fr);
          }

          .gallery-container.images-4 {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
          }

          .gallery-container.images-5 {
            grid-template-columns: 1fr 1fr;
          }

          /* Overlay for the more images button */
          .more-overlay {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            font-size: 24px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 8px;
          }

          /* Modal Image Styling */
          .modal-container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background: #000839;
            max-width: 80vw;
            height: 80vh;
          }

          .modal-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          /* Close, Previous and Next Buttons */
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
          }

          .prev-btn,
          .next-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
          }

          .prev-btn {
            left: 10px;
          }

          .next-btn {
            right: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;
