import axios from "axios";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// eslint-disable-next-line react/prop-types
const LinkResult = ({ inputValue }) => {
  // console.log(inputValue);
  // eslint-disable-next-line no-unused-vars
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(false);
      const res = await axios(
        `https://api.shrtco.de/v2/shorten?url=${inputValue}`
      );
      setShortenLink(res.data.result.full_short_link);
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

   if (loading) {
     return <p className="noData">Loading...</p>;
   }

   if (error) {
     return <p className="noData">Something went wrong 😟</p>;
   }
  console.log(shortenLink);
  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>

          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              Copy to clipboard
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default LinkResult;
