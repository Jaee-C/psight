import IssueRepository from "@/server/domain/IssueRepository";
import { StatusType } from "lib/types";

export default class IssueRequest {
  public id?: number = undefined;
  public title?: string = undefined;
  public description?: string = undefined;
  public status?: number;
  public assignee?: string;

  public saveStatus(value: number): void {
    if (Number.isNaN(value)) {
      return;
    }

    this.status = 1;
  }

  public async verifyEntries(db: IssueRepository): Promise<boolean> {
    return (await this.verifyStatus(db)) && this.verifyTitle();
  }

  private async verifyStatus(db: IssueRepository): Promise<boolean> {
    if (Number.isNaN(this.status) || this.status === undefined) {
      // console.log("Status is not a number.");
      return false;
    }

    // Status provided is not defined in database
    const validStatuses: number[] = (await db.fetchStatuses()).map(
      (value: StatusType): number => value.id
    );
    if (validStatuses.indexOf(this.status) === -1) {
      // console.log("Invalid status");
      return false;
    }

    return true;
  }

  private verifyTitle(): boolean {
    if (this.title === undefined) {
      return false;
    }

    if (this.title.length === 0) {
      return false;
    }

    return true;
  }
}