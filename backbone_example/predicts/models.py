from django.db import models

class Predict(models.Model):
	seq = models.IntegerField()
	budget = models.IntegerField()
