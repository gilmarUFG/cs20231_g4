import { supabase } from "..";

export class UserRepository {
  static async getAllProfiles() {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) return console.log(error);
    console.log(data);
    return data;
  }
}
