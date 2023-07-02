import { StatusType, PriorityType, Issue, IssueResponse } from "lib/types";

export function toStatusString(
  status: number | undefined,
  ref: StatusType[] | undefined
): string {
  if (!status || !ref) return "Invalid";

  return ref.filter((item: StatusType): boolean => item.id === status)[0].name;
}

export async function serverDeleteIssue(
  pKey: string,
  issueId: number | string
): Promise<void> {
  await fetch(`/api/${pKey}/issue/${issueId}`, { method: "DELETE" });
}

export async function fetchIssueList(pKey: string): Promise<IssueResponse> {
  if (pKey == undefined || Array.isArray(pKey)) {
    return { data: [] };
  }

  const httpResponse: Response = await fetch(`/api/${pKey}/issues`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const issues: Issue[] = json.data.map((item: any): Issue => {
    const newIssue: Issue = new Issue(item.id);

    newIssue.title = item.title;
    newIssue.assignee = item.assignee;
    newIssue.status = item.status;
    newIssue.issueKey = item.issueKey;

    return newIssue;
  });

  return { data: issues };
}

export async function fetchStatuses(projectKey: string): Promise<StatusType[]> {
  const httpResponse: Response = await fetch(`/api/${projectKey}/statuses`, {
    method: "GET",
  });

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const statuses: StatusType[] = json.map(
    (item: any): StatusType => new StatusType(item.id, item.name)
  );

  return statuses;
}

export async function getIssue(
  projectKey: string,
  issueId: string
): Promise<Issue> {
  const httpResponse: Response = await fetch(
    `/api/${projectKey}/issue/${issueId}`,
    {
      method: "GET",
    }
  );

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const newIssue: Issue = new Issue(json.data.id);

  newIssue.title = json.data.title;
  newIssue.assignee = json.data.assignee;
  newIssue.status = json.data.status;
  newIssue.issueKey = json.data.issueKey;

  return newIssue;
}

export async function addIssue(pid: number, data: Issue): Promise<any> {
  const httpResponse: Response = await fetch(`/api/${pid}/issues`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    console.log(httpResponse.statusText);
  }

  const json = await httpResponse.json();

  return json.message;
}

export async function editIssue(
  pKey: string,
  issueKey: string,
  data: any
): Promise<any> {
  const httpResponse: Response = await fetch(`/api/${pKey}/issue/${issueKey}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!httpResponse.ok) {
    console.log(httpResponse.statusText);
  }

  const json = await httpResponse.json();

  return json.message;
}
