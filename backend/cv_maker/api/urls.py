from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserRegistrationView, UserLoginView, EducationViewSet, ExperienceViewSet, UserProfileViewSet, SkillViewSet
from .views import CvView, CvLayouts, CvLayout

router = DefaultRouter()
router.register(r'user-profile', UserProfileViewSet, basename='user-profile')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'experience', ExperienceViewSet, basename='experience')


urlpatterns = [
    path('', include(router.urls)),
    path('cv/layouts', CvLayouts.as_view(), name='get_all_filenames'),
    path('cv/layout/<str:filename>', CvLayout.as_view(), name='get_layout'),
    path('cv/<int:layout_id>', CvView.as_view(), name='user_cv'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token-auth/', obtain_auth_token, name='token-auth'),
    path('user-profile/<int:user_id>', UserProfileViewSet.as_view({'get': 'get_profile_by_user_id', 'put': 'update_profile'}), name='user-profile-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
