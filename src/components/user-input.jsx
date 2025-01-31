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
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

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
  const { toast } = useToast();
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
      console.log("Backend Response:", response);

      dispatch(setEditedLink(response.edited_link || ""));
      dispatch(setTranscription(response?.transcription || []));

      if (response.transcription.length === 0) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Check url and prompt again",
        });
        return;
      }
      if (response.transcription.every((trans) => trans.filtered_transcript.length === 0)) {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "No transcription available try again",
        });
        return;
      }
      toast({
        variant: "success",
        title: "Success",
        description: "Video and transcript generated",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Video and transcript generation failed",
      });
      console.log(err.data.detail);
      dispatch(setLoading(false));
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
          {timer !== 0 && <span className="font-bold">Time elapsed: {timer}</span>}
        </form>
      </Form>
    </div>
  );
};

export default UserInput;
