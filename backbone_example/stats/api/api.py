from tastypie.api import Api
from resources import StatResource

v1 = Api("v1")
v1.register(StatResource())
