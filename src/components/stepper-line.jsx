/* eslint-disable react/prop-types */

const StepperLine = ({ status = "inactive" }) => {
  if (status === "inactive")
    return (
      <div className="relative flex-1">
        <hr className="absolute top-6 left-0 w-full border-incomplete border-2 z-0" />
      </div>
    );
  if (status === "active")
    return (
      <div className="relative flex-1">
        <hr className="absolute top-6 left-0 w-full border-complete border-2 z-0" />
      </div>
    );
};

export default StepperLine;
