import { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

function Preview({ image, imageList, handlePreviewClose }) {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(
    imageList.indexOf(image)
  );

  useEffect(() => {
    function handleClickOutside(event) {
      !ref.current?.contains(event.target) &&
        !(
          event.target.classList.contains("back") ||
          event.target.classList.contains("forward")
        ) &&
        handlePreviewClose();
    }
    function handleKeyPress(event) {
      let pressedKey = event.key;
      if (pressedKey === "Escape") handlePreviewClose();
      else if(pressedKey === 'ArrowRight') setCurrentIndex(prev => prev !== imageList.length - 1 ? prev + 1 : prev);
      else if(pressedKey === 'ArrowLeft') setCurrentIndex(prev => prev !== 0 ? prev - 1 : prev);
    }
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keyup", handleKeyPress, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keyup", handleKeyPress, true);
    };
  }, [handlePreviewClose, imageList.length]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-between bg-black/[.5] backdrop-blur-sm px-4 z-10">
      <IconButton className="absolute top-2 right-2 text-2xl text-white cursor-pointer">
        <CloseIcon />
      </IconButton>
      <IconButton
        className={`back text-2xl text-white cursor-pointer ${
          currentIndex === 0 && "invisible"
        }`}
        onClick={() => setCurrentIndex((prev) => prev - 1)}
      >
        <ArrowBackIosIcon className="back" />
      </IconButton>
      <img src={imageList[currentIndex]} className="max-w-[80%] max-h-[80%] object-contain" ref={ref} alt="" />
      <IconButton
        className={`forward text-2xl text-white cursor-pointer ${
          currentIndex === imageList.length - 1 && "invisible"
        }`}
        onClick={() => setCurrentIndex((prev) => prev + 1)}
      >
        <ArrowForwardIosIcon className="forward" />
      </IconButton>
    </div>
  );
}

export default Preview;