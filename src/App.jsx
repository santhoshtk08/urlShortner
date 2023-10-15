import "./App.css";
import validURl from "valid-url";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

function App() {
  const [urlInput, setUrlInput] = useState("");
  const [invalidMsg, setInvalidMsg] = useState("");
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const handleShorten = async () => {
    if (!validURl.isUri(urlInput)) {
      setInvalidMsg("Invalid URL");
      return;
    }
    try {
      fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          Authorization: `Bearer 858d570073d4a5468334719c4aaf12cc1e01492d`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: urlInput,
        }),
      })
        .then((res) => res.json())
        .then((data) => setShortenLink(data.link));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App bg-gradient-to-br from-blue-300 to-blue-500 w-full h-screen flex justify-center items-center">
      <section className="bg-white rounded-md md:w-[50%] p-5 shadow-lg overflow-hidden">
        <input
          onChange={(e) => setUrlInput(e.target.value)}
          value={urlInput}
          type="text"
          placeholder="Enter URL"
          className="w-full rounded-md p-2 focus:outline-none border-2 mb-4"
        />
        <button
          onClick={handleShorten}
          className="bg-green-400 text-white rounded-md p-2 w-full font-bold mb-4 hover:scale-105 duration-150"
        >
          Shorten URL
        </button>
        <p className="text-red-500 font-bold mb-4">
          {invalidMsg.length !== 0 ? invalidMsg : ""}
        </p>
        <div className="flex items-center rounded-lg w-full relative">
          <input
            value={shortenLink}
            type="text"
            placeholder="Result..."
            className="rounded-lg focus:outline-none w-full border-2 p-2"
          />
          <div className="bg-gray-200 cursor-pointer px-4 py-2 absolute right-0 h-full rounded-r-lg">
            <CopyToClipboard
              text={shortenLink}
              onCopy={() => setCopied(!copied)}
            >
              <i className="fa-solid fa-copy" />
            </CopyToClipboard>
          </div>
        </div>
        <p className="text-blue-500 font-bold mt-4">{copied ? "Copied" : ""}</p>
      </section>
    </div>
  );
}

export default App;
