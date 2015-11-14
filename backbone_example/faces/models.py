from django.db import models

class Face(models.Model):
	img = models.ImageField(upload_to="images", null=True, blank=True)