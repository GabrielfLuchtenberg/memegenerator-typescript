import { Params, Meme, Template } from "./types";

const apiUrl = "https://api.imgflip.com";

const objectToQueryParam = (obj: object) => {
  const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
  return "?" + params.join("&");
};

const authorization = {
  username: "xzk03017",
  password: "xzk03017@cndps.com"
};

const getTemplates = async (): Promise<Template[]> => {
  const response = await fetch(`${apiUrl}/get_memes`);
  const json = await response.json();

  return json.data.memes;
};

const getMeme = async (params: Params): Promise<Meme> => {
  const { template_id, text } = params;
  const response = await fetch(
    `${apiUrl}/caption_image${objectToQueryParam({
      template_id,
      ...text,
      ...authorization
    })}`
  );
  const json = await response.json();

  return json.data.memes;
};

export { getTemplates, getMeme };
