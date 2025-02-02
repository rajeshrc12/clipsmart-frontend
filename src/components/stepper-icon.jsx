/* eslint-disable react/prop-types */
import { CircleCheck, CircleDot } from "lucide-react";

const StepperIcon = ({ status = "inactive" }) => {
  if (status === "inactive") return <CircleDot size={50} color="#e6e6e6" />;
  if (status === "active") return <CircleCheck size={50} color="black" />;
  if (status === "inprogress") return <CircleDot size={50} color="black" />;
};

export default StepperIcon;
