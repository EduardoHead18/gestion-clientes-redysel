import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export const CheckBoxFilter = () => {
  const [selectedValue, setSelectedValue] = useState("option-one");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };
  return (
    <RadioGroup
      onValueChange={handleChange}
      defaultValue="option-one"
      className="flex flex-row mb-5"
    >
      <div className="flex  items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="15">15</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="30" id="option-two" />
        <Label htmlFor="option-two">30</Label>
      </div>
    </RadioGroup>
  );
};
