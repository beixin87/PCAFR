from tastypie.resources import ModelResource
from tastypie.authorization import Authorization

from faces.models import Face

class FaceResource(ModelResource):
    class Meta:
        queryset = Face.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']
