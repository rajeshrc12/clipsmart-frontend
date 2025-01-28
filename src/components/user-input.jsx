import { Input } from "./ui/input";
import { Button } from "./ui/button";

const UserInput = () => {
  return (
    <div className="flex flex-col shadow-lg bg-white rounded p-3 gap-5">
      <div className="font-bold">User Input</div>
      <div className="grid w-full items-center">
        <Input type="url" id="url" placeholder="Enter YouTube URL (Video or Playlist)" />
      </div>
      <div className="grid w-full items-center">
        <Input type="prompt" id="prompt" placeholder="Enter User Promptt)" />
      </div>
      <div className="grid w-full items-center">
        <Input type="youtube_api_key" id="youtube_api_key" placeholder="Youtube API Key" />
      </div>
      <div className="grid w-full items-center">
        <Input type="gemini_api_key" id="gemini_api_key" placeholder="Gemini API Key" />
      </div>
      <Button>Generate</Button>
    </div>
  );
};

export default UserInput;
