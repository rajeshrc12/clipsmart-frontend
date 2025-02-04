import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useSendVideoDataMutation } from "@/services/videoApi";
import { useDispatch } from "react-redux";
import { setEditedLink, setLoading, setTranscription } from "@/features/videoSlice";
import { useEffect, useState } from "react";
import { setAlert } from "@/features/userSlice";

// YouTube URL regex pattern
const youtubeUrlRegex = /^https:\/\/www\.youtube\.com\//;

const FormSchema = z.object({
  prompt_link: z.string().regex(youtubeUrlRegex, "Please enter a valid YouTube URL (Video or Playlist)."),
  prompt: z.string().min(2, "Prompt must be at least 2 characters.").max(200, "Prompt must not exceed 200 characters."),
});
let time = 0,
  id;
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
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (isLoading === true) {
      id = setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const remainingSeconds = time % 60;
        const timeInHMS = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
        setTimer(timeInHMS);
        time++;
      }, [1000]);
    }
    if (!isLoading && time !== 0) {
      time = 0;
      clearInterval(id);
    }
  }, [isLoading]);
  console.log(isLoading, timer);
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      dispatch(setLoading(true));
      const response = await sendVideoData(data).unwrap(); // Unwrap response for proper error handling
      console.clear();
      console.log("Backend Response:", response);
      if (response.status_code === 404 || response.status_code === 500) {
        dispatch(setAlert({ title: "Error", message: response.message }));
        return;
      }
      if (response?.video_link) {
        dispatch(setEditedLink(response.video_link || ""));
      }
      if (response?.video_details) {
        dispatch(setTranscription(response.video_details || []));
      }
    } catch {
      dispatch(setAlert({ title: "Error", message: "Video generation failed try again" }));
      clearInterval(id);
      dispatch(setLoading(false));
    } finally {
      clearInterval(id);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col rounded p-3 gap-5">
      <div className="font-bold">User Input</div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            control={control}
            name="prompt_link"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input autocomplete="off" placeholder="Enter YouTube URL (Video or Playlist)" {...field} />
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
          {timer !== 0 && <span className="font-bold">Time elapsed: {timer}</span>}
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
