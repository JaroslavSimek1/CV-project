from django.contrib import admin
from .models import Skill,UserProfile, Education, Experience

admin.site.register(UserProfile)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Skill)
