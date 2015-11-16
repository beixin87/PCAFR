from django.db import models

class Stat(models.Model):
	geo_location = models.CharField(max_length=140)
	event_number = models.IntegerField()
	volunteer_number = models.IntegerField()
	month = models.CharField(max_length=140)
	month_event_number = models.IntegerField()
	month_volunteer_number = models.IntegerField()

