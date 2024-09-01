import Education from "./Education";
import Experience from "./Experience";
import Skill from "./Skill";

interface UserProfile {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  about: string | "";
  photo: File | null;
  educations: Education[];
  experiences: Experience[]; 
  skills: Skill[]; 
}

export default UserProfile;