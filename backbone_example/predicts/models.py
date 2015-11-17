from django.db import models

class Predict(models.Model):
	seq = models.IntegerField()
	original_budget = models.IntegerField()
	predicted_budget = models.IntegerField()
	original_volunteer_number = models.IntegerField()
	predicted_volunteer_number = models.IntegerField()
	rmse_budget = models.FloatField()
	rmse_volunteer_number = models.FloatField()