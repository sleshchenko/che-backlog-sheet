
export interface RawDefinition {
  include: boolean;
  milestone: string;
  team: string;
  status: string;
  kind: string;
  severity: string;
  title: string;
  link: string;
  comments: string;
  state: string;
  labels: string;
  assignee: string;
  created: string;
  updated: string;
  closed: string;
}

export interface TeamRawDefinition {
  assignment: string;
  priority: string;
  severity: string;
  title: string;
  kind: string;
  link: string;
  milestone: string;
  otherTeam: string;
  comments: string;
  state: string;
  status: string;
  areas: string;
  assignee: string;
}
