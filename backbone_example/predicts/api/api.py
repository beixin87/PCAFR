from tastypie.api import Api
from resources import PredictResource

v1 = Api("v1")
v1.register(PredictResource())
