import React, { useState, useEffect } from 'react';
import {
  Typography,
  CircularProgress,
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import UserProfile from '../types/UserProfile';
import Education from '../types/Education';
import Experience from '../types/Experience';
import Skill from '../types/Skill';
import { UserService } from '../services/api/UserService';
import { format } from 'date-fns';

const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(true);
  const { getProfile, updateProfile } = UserService();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfile();
        setProfile(userProfile);
        setEditedProfile(userProfile); 
        setLoading(false);
        setPhoneNumberError(false)
      } catch (error) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      if (editedProfile) {
        if (editedProfile.about.trim() === '' && editMode) {
          setEditedProfile(prevState => ({
            ...prevState!,
            about: ''
          }));
        }
        await updateProfile(editedProfile,photoFile);
        const updatedProfile = await getProfile();
        setEditMode(false);
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setEditedProfile(profile);
    setEditMode(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedProfile) {
      const { name, value } = event.target;
      let newValue = value;
  

      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(value));
      }
  

      if (name === 'phone_number') {
        const phoneRegex = /^\d{9}$/; 
        setPhoneNumberError(!phoneRegex.test(value));
      }
      
      setEditedProfile({
        ...editedProfile,
        [name]: newValue,
      });
    }
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string | number) => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      educations: (prevState?.educations || []).map((education, i) =>
        i === index ? { ...education, [field]: value } : education
      ),
    }));
  };
  
  const handleExperienceChange = (index: number, field: keyof Experience, value: string | null) => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      experiences: (prevState?.experiences || []).map((experience, i) =>
        i === index ? { ...experience, [field]: value } : experience
      ),
    }));
  };
  
  const handleSkillChange = (index: number,value: string) => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      skills: (prevState?.skills || []).map((skill, i) =>
        i === index ? { ...skill, skill_name: value } : skill
      ),
    }));
  };
  

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setPhotoFile(file);
    }
  }

  const addNewEducation = (educations: Education[]): Education[] => {
    const newEducation: Education = {
      id: 0,
      school_name: '',
      degree: '',
      graduation_year: 0,
    };
    return [...educations, newEducation];
  };

  const addNewExperience = (experiences: Experience[]): Experience[] => {
    const newExperience: Experience = {
      id: 0,
      job_title: '',
      company_name: '',
      start_date: '',
      end_date: null,
    };
    return [...experiences, newExperience];
  };

  const addNewSkill = (skills: Skill[]): Skill[] => {
    const newSkill: Skill = {
      id: 0,
      skill_name: '',
    };
    return [...skills, newSkill];
  };


  const handleAddEducation = () => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      educations: addNewEducation(prevState?.educations || []),
    }));
  };


  const handleAddExperience = () => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      experiences: addNewExperience(prevState?.experiences || []),
    }));
  };


  const handleAddSkill = () => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      skills: addNewSkill(prevState?.skills || []),
    }));
  };

  const handleRemoveEducation = (index: number) => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      educations: (prevState?.educations || []).filter((_, i) => i !== index),
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      experiences: (prevState?.experiences || []).filter((_, i) => i !== index),
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setEditedProfile((prevState) => ({
      ...prevState!,
      skills: (prevState?.skills || []).filter((_, i) => i !== index),
    }));
  };

  return (
<Grid container justifyContent="center" alignItems="center" minHeight="70vh"> 
  <Grid item xs={12} sm={10} md={8}> 
    <Box p={2}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1">Error: {error}</Typography>
      ) : !profile ? (
        <Typography variant="body1">No profile data available</Typography>
      ) : (
        <div>
          {editMode ? (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={editedProfile?.first_name || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={editedProfile?.last_name || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={editedProfile?.email || ''}
                    onChange={handleChange}
                    error={emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone_number"
                    value={editedProfile?.phone_number || ''}
                    onChange={handleChange}
                    error={phoneNumberError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="About"
                    name="about"
                    value={editedProfile?.about || ''}
                    onChange={handleChange}
                    multiline
                    rows={4} 
                  />
                </Grid>
                <Grid item xs={12}>
                  {editedProfile?.educations?.map((education, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label={`School Name`}
                            name={`school_name_${index}`}
                            value={education.school_name}
                            onChange={(event) => handleEducationChange(index, 'school_name', event.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label={`Degree`}
                            name={`degree_${index}`}
                            value={education.degree}
                            onChange={(event) => handleEducationChange(index, 'degree', event.target.value)}
                            InputProps={{
                              style: { fontSize: '0.8rem' }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            fullWidth
                            label={`Graduation Year`}
                            name={`graduation_year_${index}`}
                            value={education.graduation_year.toString()}
                            onChange={(event) => handleEducationChange(index, 'graduation_year', event.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button variant="outlined" color="primary" onClick={() => handleRemoveEducation(index)}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Button variant="contained" color="primary" onClick={handleAddEducation}>
                    Add Education
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {editedProfile?.experiences?.map((experience, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label={`Job Title`}
                            name={`job_title_${index}`}
                            value={experience.job_title}
                            onChange={(event) => handleExperienceChange(index, 'job_title', event.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label={`Company Name`}
                            name={`company_name_${index}`}
                            value={experience.company_name}
                            onChange={(event) => handleExperienceChange(index, 'company_name', event.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label={`Start Date (YYYY-MM-DD)`}
                            name={`start_date_${index}`}
                            type="date"
                            value={experience.start_date ? format(new Date(experience.start_date), 'yyyy-MM-dd') : ''}
                            onChange={(event) => handleExperienceChange(index, 'start_date', event.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label={`End Date (YYYY-MM-DD)`}
                            name={`end_date_${index}`}
                            type="date"
                            value={experience.end_date ? format(new Date(experience.end_date), 'yyyy-MM-dd') : ''}
                            onChange={(event) => handleExperienceChange(index, 'end_date', event.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                          <Button variant="outlined" color="primary" onClick={() => handleRemoveExperience(index)}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Button variant="contained" color="primary" onClick={handleAddExperience}>
                    Add Experience
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {editedProfile?.skills?.map((skill, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={10}>
                          <TextField
                            fullWidth
                            label={`Skill Name `}
                            name={`skill_name_${index}`}
                            value={skill.skill_name}
                            onChange={(event) => handleSkillChange(index, event.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button variant="outlined" color="primary" onClick={() => handleRemoveSkill(index)}>
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                  <Button variant="contained" color="primary" onClick={handleAddSkill}>
                    Add Skill
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <p>
                      Upload your photo
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    type="file"
                    onChange={handleFileChange}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button variant="contained" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Box>
            </form>
          ) : (
            <div>
              <Typography variant="h3">Profile Information</Typography>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {profile.photo && (
                  <div style={{ width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={`data:image/jpeg;base64,${profile.photo}`} alt="Profile" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
              <Typography variant="body1">First Name: {profile.first_name}</Typography>
              <Typography variant="body1">Last Name: {profile.last_name}</Typography>
              <Typography variant="body1">Email: {profile.email}</Typography>
              <Typography variant="body1">Phone Number: {profile.phone_number}</Typography>
              <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                About: {profile.about}
              </Typography>
              {profile.educations && profile.educations.length > 0 && (
                <div>
                  <Typography variant="h4">Education</Typography>
                  {profile.educations.map((education, index) => (
                    <div key={index}>
                      <Typography variant="body1">
                        School Name: {education.school_name}, Degree: {education.degree}, Graduation Year: {education.graduation_year}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
              {profile.experiences && profile.experiences.length > 0 && (
                <div>
                  <Typography variant="h4">Experience</Typography>
                  {profile.experiences.map((experience, index) => (
                    <div key={index}>
                      <Typography variant="body1">
                        Job Title: {experience.job_title}, Company Name: {experience.company_name}, Start Date: {experience.start_date}, End Date: {experience.end_date}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
              {profile.skills && profile.skills.length > 0 && (
                <div>
                  <Typography variant="h4">Skills</Typography>
                  {profile.skills.map((skill, index) => (
                    <div key={index}>
                      <Typography variant="body1">
                        Skill Name: {skill.skill_name}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
              <Button variant="contained" onClick={handleEditClick} style={{ zIndex: 100 }}>
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
    </Box>
  </Grid>
</Grid>
);
};            

export default ProfileForm;
