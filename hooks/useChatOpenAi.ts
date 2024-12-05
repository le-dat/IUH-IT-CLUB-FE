import OpenAI from 'openai';
import { useCallback, useState } from 'react';

const client = new OpenAI({
  apiKey: '',
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const useChatOpenAi = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ],
    });

      setData(response.choices[0].message);
      return response.choices[0].message;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { refresh, data, loading };
};

export default useChatOpenAi;
