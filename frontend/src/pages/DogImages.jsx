import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Preview from "../components/Preview";

function DogImages() {

  const {breed, sub_breed} = useParams();
  const targetRef = useRef(null);

  const [imageList, setImageList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {

    axios(sub_breed ? `/images/${breed}/${sub_breed}` : `/images/${breed}`).then(res => {
        setImageList(res.data.imageList);
    })

  }, [breed, sub_breed]);

  function handlePreiewClick(image) {
    document.body.style.overflow = 'hidden';
    setPreviewImage(image);
  }

  function handlePreviewClose() {
    document.body.style.overflow = 'auto';
    setPreviewImage("");
  }

  const title = sub_breed ? sub_breed + ' ' + breed : breed;

  return (
    <>
      <div className="flex flex-col items-center px-10 py-6 h-full dark:bg-black">
      <div className="sticky top-20 flex items-center w-full z-10">
          <Link to={'/'}><IconButton className="backdrop-blur-md backdrop-brightness-75 dark:text-white"><ArrowBackIcon /></IconButton></Link>
          <div className="grow flex justify-center -mt-1 text-center text-2xl dark:text-white"><p className="px-3 w-fit backdrop-blur-md">{title}</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 p-3">
          {imageList.length > 0 && 
            imageList
              .map((imageUrl) => (
                <div key={imageUrl}>
                  <img
                    src={imageUrl}
                    className="image w-full h-64 object-top object-cover cursor-pointer duration-150 hover:scale-105"
                    loading="lazy"
                    onClick={() => handlePreiewClick(imageUrl)}
                    alt=""
                  />
                </div>
              ))}
        </div>
      </div>
      {previewImage && (
        <Preview image={previewImage} imageList={imageList} handlePreviewClose={handlePreviewClose} />
      )}
    </>
  );
}

export default DogImages;