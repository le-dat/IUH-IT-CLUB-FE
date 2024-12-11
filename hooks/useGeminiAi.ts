import { useCallback, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const useGeminiAi = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async (data: string) => {
    setLoading(true);
    try {
      const result = await model.generateContent(data);
      console.log(result);

      setData(result?.response?.text());
      return result?.response?.text();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { refresh, data, loading };
};

export default useGeminiAi;
