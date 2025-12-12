import { IErrorMessageState, showFieldErrorMessage } from "@/lib/fieldErrorMessage";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
  field: string;
  state: IErrorMessageState;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (showFieldErrorMessage(field, state)) {
    return (
      <FieldDescription className="text-red-500">
        {showFieldErrorMessage(field, state)}
      </FieldDescription>
    );
  }

  return null
};

export default InputFieldError;
