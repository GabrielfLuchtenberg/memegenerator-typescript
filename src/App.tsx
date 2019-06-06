import React, { useEffect, useState } from "react";
import "./App.css";
import { getTemplates, getMeme } from "./services/api";
import { Template, Params } from "./services/types";
import { Meme } from "./Meme";

const App: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [template, setTemplate] = useState<Template>();
  const [topText, setTopText] = useState<string>("");
  const [bottomText, setBottomText] = useState<string>("");
  const [meme, setMeme] = useState<any>("");

  useEffect(() => {
    let didCancelFetch = false;
    const fetchTemplates = async () => {
      setTemplates(await getTemplates());
    };
    if (didCancelFetch) return;

    fetchTemplates();
    return () => {
      didCancelFetch = true;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {meme && <img src={meme} />}
        {template && (
          <form
            onSubmit={async e => {
              e.preventDefault();
              // add logic to create meme from api
              const params: Params = {
                template_id: template.id,
                texts: [topText, bottomText]
              };
              const image = await getMeme(params);

              setMeme(image);
            }}
          >
            <Meme onClick={() => console.log("object")} template={template} />
            <input
              placeholder="top text"
              value={topText}
              onChange={e => setTopText(e.target.value)}
            />
            <input
              placeholder="bottom text"
              value={bottomText}
              onChange={e => setBottomText(e.target.value)}
            />
            <button type="submit">create meme</button>
          </form>
        )}
        {!template && (
          <>
            <h1>Pick a template</h1>
            {templates.map(template => {
              return (
                <Meme
                  key={template.id}
                  template={template}
                  onClick={() => {
                    setTemplate(template);
                  }}
                />
              );
            })}
          </>
        )}
      </header>
    </div>
  );
};

export default App;
