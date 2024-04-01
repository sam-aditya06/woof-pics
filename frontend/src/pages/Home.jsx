import { useEffect, useMemo, useRef, useState} from "react";

import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Skeleton from "../components/Skeletons";

export default function Home() {

  const {pageNum} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const ref = useRef();

  const page = pageNum ? parseInt(pageNum) : (location.search ? parseInt(location.search.substring(location.search.lastIndexOf('=') + 1)) : 1);
  
  const contentPerPage = useMemo(() => {
    const num = parseInt((window.innerWidth - 85 - 192)/(224) + 1) * 4;
    return num > 8 ? num : 8;
  }, []);
  
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    //Reset defaults
    window.scrollTo({ top: 0, behavior: "smooth" });
    data.length > 0 && setData([]);
    location.search && setValue(location.search.substring(location.search.indexOf('=') + 1, location.search.indexOf('&')));
    !isLoading && setIsLoading(true);

    //Conditional data fetching and subsequent state updations
    if(location.search){
      let searchValue = location.search.substring(location.search.indexOf('=') + 1, location.search.indexOf('&'));
      axios(`/search?value=${searchValue}&page=${page}&contentPerPage=${contentPerPage}`).then((res) => {
        if(res.data.content.length > 0){
          setData(res.data.content);
          setPageCount(res.data.pageCount);
          isError && setIsError(false);
          setIsLoading(false);
        }
        else{
          setIsError(true);
        }
        setIsLoading(false);
      });
    }
    else{
      axios(`/page/${page}?contentPerPage=${contentPerPage}`).then((res) => {
        setData(res.data.content);
        setPageCount(res.data.pageCount);
        value && setValue('');
        setIsLoading(false);
      });
    }
  }, [location]);

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/search?value=${value}&page=1`);
  }

  return (
    <>
      <div id="scrollContainer" className="flex flex-col items-center gap-6 px-10 py-4 h-full dark:bg-black" ref={ref}>
        { !location.search && page === 1 && 
          <div className="flex flex-col gap-2 dark:text-white">
            <div className="text-center text-2xl">
              Welcome to WoofPics - Your Ultimate Dog Image Search Destination!
            </div>
            <div className="text-center">
              Embark on a tail-wagging adventure through the world of canines with
              WoofPics, where every bark has a picture-perfect moment! Whether
              you&apos;re on a quest to find the adorable face of a specific breed or
              simply seeking some paw-sitively delightful doggy images, WoofPics
              is here to fetch exactly what you need.
            </div>
          </div>
        }
        <form
          className="self-center sticky top-20 flex justify-center gap-2 mt-4 z-10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="rounded-md border p-2 dark:bg-black dark:text-white"
            placeholder="Search a dog..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <Button
            type="submit"
            sx={{ textTransform: "none", width: "fit-content" }}
            className="rounded-md bg-red-600 text-white hover:bg-red-700 curor-pointer"
            disabled={!value}
          >
            Search
          </Button>
        </form>
        <div className="flex flex-wrap justify-center gap-8 p-3">
          {isLoading ? <Skeleton count={contentPerPage} /> :
            data.map((dogInfo) => {
                return (
                  <div
                    key={dogInfo.name}
                    className="flex flex-col items-center"
                  >
                    <Link
                      to={
                        dogInfo.sub_breed
                          ? `/images/${dogInfo.breed}/${dogInfo.sub_breed}`
                          : `/images/${dogInfo.breed}`
                      }
                    >
                      <div className="w-48 h-64 overflow-hidden">
                        <img
                          className="w-48 h-64 cursor-pointer object-cover duration-200 hover:scale-110 hover:brightness-75"
                          src={dogInfo.profile}
                          alt={dogInfo.name}
                        />
                      </div>
                    </Link>
                    <Link
                      className="flex w-fit hover:underline"
                      to={
                        dogInfo.sub_breed
                          ? `/image/${dogInfo.breed}/${dogInfo.sub_breed}`
                          : `/image/${dogInfo.breed}`
                      }
                    >
                      <div className="font-bold dark:text-white">
                        {dogInfo.name}
                      </div>
                    </Link>
                  </div>
                );
              })}
              {isError && <div className="text-2xl font-semibold dark:text-white">No Woofs for this. Try again</div>}
        </div>
        {data.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {page !== 1 && (
              <Link to={location.search ? `/search?value=${value}&page=${page - 1}` : `/page/${page - 1}`}><IconButton
                className="flex justify-center bg-black text-white"
              >
                <ArrowBackIosIcon className="text-white" fontSize="small" />
              </IconButton></Link>
            )}
            {[...Array(pageCount)].map((_, i) => {
              return (
                <Link key={i} to={location.search ? `/search?value=${value}&page=${i + 1}` : `/page/${i + 1}`}><IconButton
                  className={`flex justify-center items-center rounded-full ${
                    i + 1 === page &&
                    "bg-red-600 text-white hover:bg-red-700"
                  } p-2 w-10 h-10 text-base cursor-pointer dark:text-white`}
                >
                  {i + 1}
                </IconButton></Link>
              );
            })}
            {page !== pageCount && (
              <Link to={`/page/${page + 1}`}><IconButton
                className="flex justify-center dark:text-white"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <ArrowForwardIosIcon
                  className="dark:text-white"
                  fontSize="small"
                />
              </IconButton></Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}
