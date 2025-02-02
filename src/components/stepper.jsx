import StepperItem from "./stepper-item";
import StepperLine from "./stepper-line";

const Stepper = () => {
  return (
    <div className="w-full flex">
      <StepperItem status={"inprogress"} label={"Input"} />
      <StepperLine status="inactive" />
      <StepperItem status={"inactive"} label={"Adjust Time"} />
      <StepperLine status="inactive" />
      <StepperItem status={"inactive"} label={"Create video"} />
    </div>
  );
};

export default Stepper;
