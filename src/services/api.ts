import { Params, Meme, Template } from "./types";

const apiUrl = "https://api.imgflip.com";

const objectToQueryParam = (obj: object) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return params.join("&");
};

const authorization = {
  username: "kragrtr",
  password: "kragrtr"
};

const getTemplates = async (): Promise<Template[]> => {
  const response = await fetch(`${apiUrl}/get_memes`);
  const json = await response.json();

  return json.data.memes;
};

const getMeme = async (params: Params): Promise<Meme> => {
  const { template_id, texts } = params;
  const textsParam = texts.map((text, indice) => ({ [`text${indice}`]: text }));
  const response = await fetch(
    `${apiUrl}/caption_image?${objectToQueryParam({
      template_id,
      ...authorization,
      ...textsParam[0],
      ...textsParam[1]
    })}`
  );
  const json = await response.json();

  return json.data.url;
};

export { getTemplates, getMeme };
