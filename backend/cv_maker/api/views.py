from rest_framework import viewsets
from .models import UserProfile, Education, Experience, Skill
from .serializers import UserProfileSerializer, EducationSerializer, ExperienceSerializer, UserRegistrationSerializer, UserLoginSerializer, SkillSerializer, UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
import logging
from .generator import Generator
from django.shortcuts import get_object_or_404
import json
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile
import os
import tempfile
import zipfile
from django.conf import settings

logger = logging.Logger('logger')


class CvLayouts(APIView):
    def get(self, request):
        folder_path = os.path.join(settings.BASE_DIR, 'layouts')
        filenames = [file_name for file_name in os.listdir(folder_path)]
        return Response({'filenames': filenames})
    
class CvLayout(APIView):
    def get(self, request, filename):
        example_cvs_dir = os.path.join(settings.BASE_DIR, 'layouts')
        file_path = os.path.join(example_cvs_dir, filename)
        if os.path.exists(file_path) and filename.endswith('.jpg'):
            with open(file_path, 'rb') as image_file:
                image_data = image_file.read()
            return HttpResponse(image_data, content_type='image/jpeg')
        else:
            return HttpResponse(status=404)

class CvView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request,layout_id):
        user_id = request.query_params.get('user_id')
        user_profile = UserProfile.objects.get(id=user_id)
        
        match layout_id:
            case 0:
                pdf_content = Generator.generator_layout_0(user_profile)
            case 1:
                pdf_content = Generator.generator_layout_1(user_profile)
            case 2:
                pdf_content = Generator.generator_layout_2(user_profile)

        response = HttpResponse(pdf_content, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{user_profile.user.username}_cv.pdf"'
        return response


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # Custom action to get user profile by user ID
    @action(detail=False, methods=['GET'])
    def get_profile_by_user_id(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user_profile = UserProfile.objects.get(id=user_id)
            serializer = self.get_serializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['PUT'])
    def update_profile(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': 'User ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user_profile = UserProfile.objects.get(id=user_id)
        educations_data = json.loads(request.data.get('educations', '[]'))
        experiences_data = json.loads(request.data.get('experiences', '[]'))
        skills_data = json.loads(request.data.get('skills', '[]'))


        user_profile.educations.clear()
        if educations_data:
            for education_data in educations_data:
                if 'id' in education_data:
                    education_data.pop('id')
                education_instance = Education.objects.create(**education_data)
                user_profile.educations.add(education_instance)


        user_profile.experiences.clear()
        if experiences_data:
            for experience_data in experiences_data:
                if 'id' in experience_data:
                    experience_data.pop('id')
                experience_instance = Experience.objects.create(**experience_data)
                user_profile.experiences.add(experience_instance)


        user_profile.skills.clear()
        if skills_data:
            for skill_data in skills_data:
                if 'id' in skill_data:
                    skill_data.pop('id')
                skill_instance = Skill.objects.create(**skill_data)
                user_profile.skills.add(skill_instance)

        serializer = self.get_serializer(user_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    
class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Both email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, email=email, password=password)
        token =Token.objects.create(user=user)
        user_profile = UserProfile.objects.create(user=user)

        return Response({'message': 'User registered successfully.', 'token': token.key, 'user_id': user_profile.id}, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            user_profile = UserProfile.objects.get(user=user)
            return Response({'token': token.key, 'user_id': user_profile.id})
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
