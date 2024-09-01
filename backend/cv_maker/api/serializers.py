from rest_framework import serializers
from .models import UserProfile, Education, Experience, Skill
from django.contrib.auth.models import User
import base64

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

    def create(self, validated_data):
        validated_data.pop('id', None)  # Remove 'id' if present
        return Education.objects.create(**validated_data)

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

    def create(self, validated_data):
        validated_data.pop('id', None)  # Remove 'id' if present
        return Experience.objects.create(**validated_data)

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

    def create(self, validated_data):
        validated_data.pop('id', None)  # Remove 'id' if present
        return Skill.objects.create(**validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    educations = EducationSerializer(many=True, required=False)
    experiences = ExperienceSerializer(many=True, required=False)
    skills = SkillSerializer(many=True, required=False)
    photo = serializers.ImageField(max_length=None, use_url=False, required=False)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.photo:
            photo_data = instance.photo.read() 
            photo_data_base64 = base64.b64encode(photo_data).decode('utf-8')
            representation['photo'] = photo_data_base64
        return representation

    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'about', 'photo', 'educations', 'experiences', 'skills']

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.about = validated_data.get('about', instance.about)
        instance.photo = validated_data.get('photo', instance.photo)

        # Update related fields if provided
        if 'educations' in validated_data:
            educations_data = validated_data.pop('educations')
            instance.educations.clear()
            for education_data in educations_data:
                # Create Education instance and add its ID to educations
                education_instance = Education.objects.create(**education_data)
                instance.educations.add(education_instance.id)

        if 'experiences' in validated_data:
            experiences_data = validated_data.pop('experiences')
            instance.experiences.clear()
            for experience_data in experiences_data:
                # Create Experience instance and add its ID to experiences
                experience_instance = Experience.objects.create(**experience_data)
                instance.experiences.add(experience_instance.id)

        if 'skills' in validated_data:
            skills_data = validated_data.pop('skills')
            instance.skills.clear()
            for skill_data in skills_data:
                # Create Skill instance and add its ID to skills
                skill_instance = Skill.objects.create(**skill_data)
                instance.skills.add(skill_instance.id)

        instance.save()
        return instance



    
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user
    


class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

