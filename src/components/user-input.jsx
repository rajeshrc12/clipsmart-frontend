import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useSendVideoDataMutation } from "@/services/videoApi";

// YouTube URL regex pattern
const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|playlist\?list=)|youtu\.be\/)[\w-]{11,}$/;

const FormSchema = z.object({
  url: z.string().regex(youtubeUrlRegex, "Please enter a valid YouTube URL (Video or Playlist)."),
  prompt: z
    .string()
    .min(2, "Prompt must be at least 2 characters.")
    .max(200, "Prompt must not exceed 200 characters.")
    .regex(/^[a-zA-Z0-9\s]+$/, "Prompt must contain only letters, numbers, and spaces."),
});

const UserInput = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      prompt: "",
    },
  });

  const { handleSubmit, control, formState } = form;
  const { errors } = formState;

  // Get the first error key (field name) based on the form field order
  const fieldOrder = ["url", "prompt"];
  const firstErrorKey = fieldOrder.find((key) => errors[key]);
  const firstErrorMessage = firstErrorKey ? errors[firstErrorKey]?.message : null;
  const [sendVideoData, { isLoading, error, data }] = useSendVideoDataMutation(); // RTK Query mutation hook
  console.log(data);
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Dispatch the RTK Query mutation to send URL and prompt to the backend
    sendVideoData(data)
      .then((response) => {
        console.log("Backend Response:", response);
        // Optionally, handle any success actions or Redux state updates here
      })
      .catch((err) => {
        console.error("Error:", err);
      });
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
                  <Textarea placeholder="Enter User Prompt" {...field} />
                </FormControl>
                {firstErrorKey === "prompt" && <FormMessage>{firstErrorMessage}</FormMessage>}
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Generate"}
          </Button>
          {error && <div className="text-red-500">{error.message}</div>}
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
