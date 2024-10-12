import Groq from "groq-sdk";
import { API_KEY } from "../env-variables";

const groq = new Groq({
  apiKey: API_KEY,
});

export const llamaModel = "llama3-8b-8192";

export default groq;
