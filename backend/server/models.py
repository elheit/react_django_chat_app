from django.db import models
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.dispatch import receiver

# Create your models here.
def server_icon_upload_path(instance, filename):
    return f"server/{instance.id}/server_icons/{filename}"

def server_banner_upload_path(instance, filename):
    return f"server/{instance.id}/server_banners/{filename}"

def category_icon_upload_path(instance, filename):
    return f"category/{instance.id}/category_icon/{filename}"

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=category_icon_upload_path, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.id: # that mean the data already exist not creating new one
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
        super(Category, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender='server.Category')
    def catgory_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == 'icon':
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)
        
    
    def __str__(self):
        return self.name

class Server(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="server_owner")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='server_category')
    description = models.CharField(max_length=250, blank=True, null=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name


class Channel(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channel_owner")
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='channel_server')
    banner = models.ImageField(upload_to=server_banner_upload_path, null=True, blank=True)
    icons = models.ImageField(upload_to=server_icon_upload_path, null=True, blank=True)

    def save(self, *args, **kwargs):
        
        self.name = self.name.lower()

        if self.id: # that mean the data already exist not creating new one
            existing = get_object_or_404(Channel, id=self.id)
            if existing.icons != self.icons:
                existing.icons.delete(save=False)
            if existing.banner != self.banner:
                existing.banner.delete(save=False)

        super(Channel, self).save(*args, **kwargs)

    @receiver(models.signals.pre_delete, sender='server.Server')
    def channel_delete_files(sender, instance, **kwargs):
        for field in instance._meta.fields:
            if field.name == 'icons' or field.name == 'banner':
                file = getattr(instance, field.name)
                if file:
                    file.delete(save=False)


    def __str__(self):
        return self.name



