import { useEffect, useState } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Footer = () => {

  const [fact, setFact] = useState("");
  const location = useLocation();
  useEffect(() => {
    axios("https://dog-api.kinduff.com/api/facts").then((res) => {
      setFact(res.data.facts[0]);
    });
  },[location]);
  return (
        <div className="bg-slate-200 px-10 py-4 dark:bg-gray-900 dark:text-gray-300">
          <div className="text-2xl text-center">Did You Know?</div>
          <div className="text-center">{fact}</div>
        </div>
  )
}

export default Footer;