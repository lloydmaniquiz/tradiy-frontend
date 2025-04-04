import { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Close, ArrowBack, ArrowForward } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Gallery = ({ workImages }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:1024px)");

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
    <div className="gallery-container">
      {workImages.length > 0 && (
        <>
          {isMobile ? (
            <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
              {workImages.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Work-${index}`}
                    className="carousel-image"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className={`grid-layout images-${workImages.length}`}>
              {/* Large Image */}
              <div className="main-image" onClick={() => handleOpen(0)}>
                <img src={workImages[0]} alt="Main Work" />
              </div>

              {/* 2x2 Grid */}
              <div className="grid-images">
                {workImages.slice(1, 5).map((img, index) => (
                  <div
                    key={index + 1}
                    className="gallery-item"
                    onClick={() => handleOpen(index + 1)}
                  >
                    <img src={img} alt={`Work-${index + 1}`} />

                    {/* Overlay on the 4th image */}
                    {index === 3 && workImages.length > 5 && (
                      <div
                        className="more-overlay"
                        onClick={() => handleOpen(4)}
                      >
                        <span>+{workImages.length - 4}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }

          .grid-layout {
            display: grid;
            gap: 10px;
            grid-template-columns: 1fr 1fr 1fr;
            width: 100%;
          }

          .main-image {
            grid-column: span 2;
            width: 100%;
            height: 310px;
            cursor: pointer;
            overflow: hidden;
            position: relative;
          }

          .grid-images {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            width: 100%;
          }

          .gallery-item {
            width: 100%;
            height: 150px;
            cursor: pointer;
            overflow: hidden;
            position: relative;
          }

          .gallery-item img,
          .main-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }

          .more-overlay {
            position: absolute;
            top: 0;
            left: 0;
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

          .carousel-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default Gallery;
