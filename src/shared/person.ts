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
