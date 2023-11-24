import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormModel, FormValidation } from "./validators/codeSnippetValidator";
import FormTextField from "../../common/FormTextField/FormTextField";
import { Code, Info, Share } from "react-feather";
import LoadingButton from "../../LoadingButton";
import {
  CodeSnippetPreview,
  CodeSnippetBase
} from "../../../models/codeSnippet";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import FormTextArea from "../../common/FormTextAreaField/FormTextArea";

interface Props {
  submitFn: UseMutateAsyncFunction<string, unknown, CodeSnippetBase, unknown>;
  createPreviewFn: UseMutateAsyncFunction<
    CodeSnippetPreview,
    unknown,
    CodeSnippetBase,
    unknown
  >;
  previewIsPending: boolean;
}

const CodeSnippetForm = ({
  submitFn,
  createPreviewFn,
  previewIsPending
}: Props) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty, errors }
  } = useForm<FormModel>({
    resolver: zodResolver(FormValidation)
  });

  const onSubmit = async (data: FormModel) => {
    console.log(data);
    await submitFn(data);
  };

  const createPreview = async () => {
    const formValues: FormModel = getValues();
    // HOW CAN I MAKE THE FORM LOAD WHILE WE WAIT FOR THIS?
    await createPreviewFn(formValues);
  };

  return (
    <form
      className="bg-visual-studio-bg border-dark-700 space-y-4 rounded-lg border p-4 md:p-6"
      spellCheck={false}
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="border-dark-400 mb-4 border-b pb-2 ">
        <h2 className="mb-2 text-lg font-bold">Share C# Code</h2>
        <div className="flex flex-wrap items-center gap-x-2 text-sm leading-4 text-slate-50/50">
          <Info size={16} />
          <em className="flex-1">Code is periodically deleted every 6 hours</em>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <FormTextField
          label="Title"
          maxLength={32}
          register={register("title")}
          error={errors.title}
        />
        <FormTextField
          label="Author"
          maxLength={32}
          register={register("author")}
          error={errors.author}
        />
      </div>

      <FormTextArea
        required
        label="Code"
        rows={10}
        maxLength={4000}
        register={register("code")}
        error={errors.code}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <LoadingButton
          type="submit"
          disabled={!isValid}
          loading={isSubmitting || previewIsPending}
          loadingText="Uploading code..."
          icon={<Share size="1.25rem" />}
          buttonText="Upload And Share"
        />
        <LoadingButton
          type="button"
          disabled={!isValid || !isDirty}
          loading={isSubmitting || previewIsPending}
          loadingText="Fetching preview..."
          onClick={createPreview}
          icon={<Code size="1.25rem" />}
          buttonText="Preview Code Snippet"
        />
      </div>
    </form>
  );
};

export default CodeSnippetForm;
