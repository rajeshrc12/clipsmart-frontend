/* eslint-disable react/prop-types */
import StepperIcon from "./stepper-icon";

const StepperItem = ({ status, label }) => {
  return (
    <div className="flex flex-col items-center relative">
      <div>
        <StepperIcon status={status} />
      </div>
      <div className="absolute bottom-[-25px] w-24 text-center">
        <span className={status === "active" || status === "inprogress" ? "text-complete" : "text-incomplete"}>{label}</span>
      </div>
    </div>
  );
};

export default StepperItem;
