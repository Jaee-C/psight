import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import IssueForm from "@/components/Form/IssueForm";
import { useContext } from "react";
import { SidebarEditContext } from "@/components/Backlog/index";
import InlineTextField from "@/components/Form/InlineEdit/InlineTextField";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getIssue, editIssue } from "@/components/data/issues";
import * as Yup from "yup";

export default function SideIssueViewer(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pid } = router.query;
  const { value: issueKey, action: handleEdit } =
    useContext(SidebarEditContext);
  const [title, setTitle] = React.useState<string>("");

  const queryClient = useQueryClient();
  const { data: editingIssue, isLoading } = useQuery(
    ["issue", issueKey],
    async () => getIssue(Number(pid), issueKey),
    {
      enabled: !!pid,
    }
  );
  const editIssueMutation = useMutation(
    async (data: any) => await editIssue(Number(pid), issueKey, data),
    {
      onSuccess: async (): Promise<void> => {
        await queryClient.invalidateQueries(["issues", Number(pid)]);
      },
    }
  );

  const handleClose = (): void => {
    handleEdit("");
  };

  const titleValidate: Yup.StringSchema = Yup.string().required("required");

  return (
    <div className="px-5">
      <InlineTextField
        onConfirm={setTitle}
        defaultValue={title}
        validate={titleValidate}
        readViewFitContainerWidth
      />
      <IssueForm formOpen={true} closeForm={handleClose} />
    </div>
  );
}
