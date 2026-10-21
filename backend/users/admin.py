from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'gamertag', 'is_staff')
    ordering = ('email',)
    fieldsets = UserAdmin.fieldsets + (
        ('Datos de jugador', {'fields': ('gamertag',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Datos de jugador', {'fields': ('email', 'gamertag')}),
    )