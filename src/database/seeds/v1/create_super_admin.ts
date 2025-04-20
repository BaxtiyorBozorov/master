import { Knex } from "knex";
import { last } from "rxjs";
import { generateHashedPassword } from "src/common/utils/bycrypt.functions";


export async function seed(knex: Knex): Promise<void> { 
  // await knex('users').where({ role: 'super_admin' }).del();
  // const hashedPassword = await generateHashedPassword('super admin')
  // await knex('users').insert([
  //   {
  //     firstname: 'Super', 
  //     lastname: 'Admin',
  //     phone: "+998901234567",
  //     email: "superAdmin@gmail.com",
  //     password: hashedPassword,
  //     role: 'super_admin',
  //     avatar: null,
  //   }
  // ])
}