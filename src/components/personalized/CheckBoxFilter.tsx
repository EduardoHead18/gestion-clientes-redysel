import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CheckBoxFilterProps {
  onChange: (value: string) => void; // Prop para devolver el valor al padre
}

export const CheckBoxFilter = ({ onChange }: CheckBoxFilterProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <RadioGroup
      onValueChange={handleChange}
      defaultValue="option-one"
      className="flex flex-row mb-5"
    >
      <div className="flex  items-center space-x-2">
        <RadioGroupItem value="15" id="option-one" />
        <Label htmlFor="option-one">15</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="30" id="option-two" />
        <Label htmlFor="option-two">30</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="0" id="option-two" />
        <Label htmlFor="option-two">Todos</Label>
      </div>
    </RadioGroup>
  );
};
