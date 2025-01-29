import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useSendVideoDataMutation } from "@/services/videoApi";
import { useDispatch } from "react-redux";
import {  setEditedLink, setLoading, setTranscription } from "@/features/videoSlice";

// YouTube URL regex pattern
const youtubeUrlRegex = /^https:\/\/www\.youtube\.com\//;

const FormSchema = z.object({
  prompt_link: z.string().regex(youtubeUrlRegex, "Please enter a valid YouTube URL (Video or Playlist)."),
  prompt: z
    .string()
    .min(2, "Prompt must be at least 2 characters.")
    .max(200, "Prompt must not exceed 200 characters.")
    .regex(/^[a-zA-Z0-9\s]+$/, "Prompt must contain only letters, numbers, and spaces."),
});

const UserInput = () => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt_link: "",
      prompt: "",
    },
  });

  const { handleSubmit, control, formState } = form;
  const { errors } = formState;

  // Get the first error key (field name) based on the form field order
  const fieldOrder = ["prompt_link", "prompt"];
  const firstErrorKey = fieldOrder.find((key) => errors[key]);
  const firstErrorMessage = firstErrorKey ? errors[firstErrorKey]?.message : null;
  const [sendVideoData, { isLoading, error }] = useSendVideoDataMutation(); // RTK Query mutation hook

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      dispatch(setLoading(true));
      const response = await sendVideoData(data).unwrap(); // Unwrap response for proper error handling
      console.log("Backend Response:", response);

      dispatch(setEditedLink(response.edited_link || ""));

      if (Array.isArray(response.transcription)) {
        dispatch(setTranscription(response.transcription))
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col shadow-lg bg-white rounded p-3 gap-5">
      <div className="font-bold">User Input</div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            control={control}
            name="prompt_link"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter YouTube URL (Video or Playlist)" {...field} />
                </FormControl>
                {firstErrorKey === "prompt_link" && <FormMessage>{firstErrorMessage}</FormMessage>}
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
