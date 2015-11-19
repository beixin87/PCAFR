from django.db import models

class Face(models.Model):
	guid = models.IntegerField()
	similarity = models.IntegerField()