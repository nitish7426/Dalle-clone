import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const getImage = async () => {
    setLoading(true);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setLoading(false);
    console.log(response.data.data[0].url);
    setImage(response.data.data[0].url);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt) {
      setPrompt("");
      getImage();
    }
  };
  return (
    <div className="px-4 py-8 space-y-4">
      <h1 className="text-6xl font-medium font-serif text-center">Dall E </h1>

      <form
        className="max-w-lg mx-auto overflow-hidden border text-lg md:text-xl rounded-lg flex items-center border-black/50"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="px-4 py-3 w-full outline-none"
          placeholder="An astronaut riding horse!"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="py-2 px-4 bg-teal-500 text-white font-semibold rounded-md m-1">
          Generate
        </button>
      </form>
      <div className="max-w-sm rounded-xl overflow-hidden mx-auto aspect-square">
        {loading ? (
          <div className="h-full w-full bg-neutral-300 animate-pulse"></div>
        ) : (
          <img src={image} alt="" />
        )}
      </div>
    </div>
  );
};

export default App;
