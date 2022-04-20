import { createPool, Pool } from "mysql2/promise";

export class FrontValid {
  private connection: Pool;

  constructor() {
    this.connection = createPool({
      host: "localhost",
      user: "root",
      database: "users",
      password: "1asxqklp546",
    });
  }

  async UserValidation() {
    const validationUsers: any[] = await this.connection.execute(
      `SHOW COLUMNS FROM users`
    );

    const userValid: { field: string; type: string; null: string }[] = [];

    for (const iterator of validationUsers[0]) {
      userValid.push({
        field: iterator.Field,
        type: iterator.Type,
        null: iterator.Null,
      });
    }

    return userValid;
  }

  async AllOszps() {
    const allPosszibleOSZP: any[] = await this.connection
      .execute(`SELECT 	COUNT(D_L_P_ID) as NumberOfDLPs
    FROM dep_lev_poz as dlp`);

    return allPosszibleOSZP[0][0];
  }

  async PasswordValidation() {
    const validationPassword: any[] = await this.connection.execute(
      `SELECT * FROM passwordrules`
    );

    return validationPassword[0][0];
  }
}
