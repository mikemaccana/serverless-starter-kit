export interface Entity {
  created: number;
  updated: number;
  // Entities created before saving to MongoDB won't have _id,
  // but Mongo will create _id for us.
  _id?: string;
}

export interface Person extends Entity {
  email: string;
  givenName: string;
  familyName: string;
  password?: string;
  passwordResetToken?: string;
  passwordResetTokenExpires?: number;
}

// -------------------
// export interface Goal extends Entity {
//   name: string;
//   details: string;
//   taskIDs: Task[];
// }
// -------------------
// enum TaskAcceptance {

// }

// enum TaskStatus {
//   Recieved = "RECIEVED",
//   Accepted = "ACCEPTED",
//   WorkingOnIt = "WORKING_ON_IT",
//   Rejected = "REJECTED",
//   Stuck = "STUCK",
// }

// export interface Task extends Entity {
//   name: string;
//   details: string;
//   goal: Goal;
//   assignedBy: Person;
//   assignments: PersonTaskAssignment[];
// }

// export interface PersonTaskAssignment extends Entity {
//   assignedTo: Person;
//   status: TaskStatus;
// }
