from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from predicts.models import Predict

class PredictResource(ModelResource):
    class Meta:
        queryset = Predict.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']
