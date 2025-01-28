import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// YouTube URL regex pattern
const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=)|youtu\.be\/)[\w-]{11,}$/;

const FormSchema = z.object({
  url: z.string().regex(youtubeUrlRegex, "Please enter a valid YouTube URL (Video or Playlist)."),
  prompt: z
    .string()
    .min(2, "Prompt must be at least 2 characters.")
    .max(200, "Prompt must not exceed 200 characters.")
    .regex(/^[a-zA-Z0-9\s]+$/, "Prompt must contain only letters, numbers, and spaces."),
  youtube_api_key: z.string().min(1, "YouTube API Key is required."),
  gemini_api_key: z.string().min(1, "Gemini API Key is required."),
});

const UserInput = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      prompt: "",
      youtube_api_key: "",
      gemini_api_key: "",
    },
  });

  const { handleSubmit, control, formState } = form;
  const { errors } = formState;

  // Get the first error key (field name) based on the form field order
  const fieldOrder = ["url", "prompt", "gemini_api_key", "youtube_api_key"];
  const firstErrorKey = fieldOrder.find((key) => errors[key]);
  const firstErrorMessage = firstErrorKey ? errors[firstErrorKey]?.message : null;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission here
  };

  return (
    <div className="flex flex-col shadow-lg bg-white rounded p-3 gap-5">
      <div className="font-bold">User Input</div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            control={control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter YouTube URL (Video or Playlist)" {...field} />
                </FormControl>
                {firstErrorKey === "url" && <FormMessage>{firstErrorMessage}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter User Prompt" {...field} />
                </FormControl>
                {firstErrorKey === "prompt" && <FormMessage>{firstErrorMessage}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="gemini_api_key"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Gemini API Key" {...field} />
                </FormControl>
                {firstErrorKey === "gemini_api_key" && <FormMessage>{firstErrorMessage}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="youtube_api_key"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="YouTube API Key" {...field} />
                </FormControl>
                {firstErrorKey === "youtube_api_key" && <FormMessage>{firstErrorMessage}</FormMessage>}
              </FormItem>
            )}
          />
          <Button type="submit">Generate</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
