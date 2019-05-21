import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getTemplates } from "./services/api";
import { Template } from "./services/types";
import { Meme } from "./Meme";

const App: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [template, setTemplate] = useState<Template>();

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
