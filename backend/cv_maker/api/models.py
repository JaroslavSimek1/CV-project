from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    about = models.TextField(max_length=500, default='',null=True, blank=True)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    educations = models.ManyToManyField('Education', blank=True)
    experiences = models.ManyToManyField('Experience', blank=True)
    skills = models.ManyToManyField('Skill', blank=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Education(models.Model):
    school_name = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    graduation_year = models.IntegerField()

    def __str__(self):
        return f"{self.degree} from {self.school_name}"

class Experience(models.Model):
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

class Skill(models.Model):
    skill_name = models.CharField(max_length=255)

    def __str__(self):
        return self.skill_name
