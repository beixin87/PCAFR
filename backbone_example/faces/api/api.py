from tastypie.api import Api
from resources import FaceResource

v1 = Api("v1")
v1.register(FaceResource())
