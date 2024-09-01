import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../../types/UserProfile';

const BASE_URL = 'http://localhost:8000/api/';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegistrationData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user_id:string;
}

export const UserService = () => {
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${BASE_URL}login/`, credentials);
      navigate('/');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (data: RegistrationData): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${BASE_URL}register/`, data);
      navigate('/');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user_id);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const getProfile = async (): Promise<UserProfile> => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      const response = await axios.get<UserProfile>(`${BASE_URL}user-profile/get_profile_by_user_id/?user_id=${userId}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  };

  const updateProfile = async (data: UserProfile, photoFile: File | null): Promise<void> => {
    try {
      console.log(data)
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      formData.append('about',data.about)
      formData.append('educations', JSON.stringify(data.educations));
      formData.append('skills', JSON.stringify(data.skills));
      formData.append('experiences', JSON.stringify(data.experiences));
  
      if (photoFile) {
        formData.append('photo', photoFile);
      }
      
      await axios.put(`${BASE_URL}user-profile/update_profile/?user_id=${data.id}`, formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  };

return { login, register, getProfile, updateProfile };

};
export default UserService;
