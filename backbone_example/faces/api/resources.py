from tastypie.resources import ModelResource
from tastypie.authorization import Authorization
from django.conf.urls.defaults import url
from tastypie.utils import trailing_slash
from tastypie.http import HttpResponse
import requests
from skimage.transform import resize
from imread import imread
from skimage.feature import hog
from skimage import data, color
import os
import collections
from sklearn.decomposition import PCA
import csv
import math
import operator


from faces.models import Face

class FaceResource(ModelResource):
    class Meta:
        queryset = Face.objects.all()
        authorization = Authorization()
        list_allowed_methods = ['get', 'post']
        detail_allowed_methods = ['get']

    def override_urls(self):
    	return [
    		url(r"^(?P<resource_name>%s)/imageupload%s$" % (self._meta.resource_name, trailing_slash()), self.wrap_view('image_upload'), name="api_image_upload")
    	]

    def image_upload(self, request, **kwargs):
    	self.method_check(request, allowed = ['get', 'post'])
    	self.is_authenticated(request)
    	self.throttle_check(request)
    	object = []
        src = '../data/faceRecognition/Test/Jonas.jpg'
        fileName = []
        imageId = dict()
        i=1
        for path, subdirs,  files in os.walk('../data/faceRecognition/Train/'):
            for filename in files:
                 f = os.path.join(path, filename)
                 fileName.append(f)
                 imageId[f] = i
                 i = i+ 1
        fileName.pop(0)
        # print fileName
        featureDictionary = collections.defaultdict(list)
        featureVector = []
        for i in fileName:
            image = i
            image = color.rgb2gray(imread(image))
            image = resize(image, (256, 256))

            fd, hog_image = hog(image, orientations=8, pixels_per_cell=(16, 16),
                                cells_per_block=(1, 1), visualise=True)

            featureDictionary[i].append(fd)
            featureVector.append(fd)
        image = color.rgb2gray(imread(src))
        image = resize(image, (256, 256))

        fd, hog_image = hog(image, orientations=8, pixels_per_cell=(16, 16),
                                cells_per_block=(1, 1), visualise=True)

        featureVector.append(fd)
        pca = PCA(n_components=3)
        pca.fit(featureVector)
        featureVector = pca.transform(featureVector)
        # print featureVector
        refVector = []
        with open('../data/faceRecognition/cluster/centroid.csv', 'rb') as csvfile:

          myReader = csv.reader(csvfile, delimiter=',')
          for row in myReader:
              temp_row = []

              for item in row:
                  item = float(item)

                  temp_row.append(item)
              refVector.append(temp_row)
        i = 0
        # print refVector
        distArray = dict()
        while( i< len(refVector)):
            dist = 0
            k = 0
            for j in featureVector[-1]:
                dist += (refVector[i][k]-featureVector[-1][j])**2
                k = k+1
            eqDist = math.sqrt(dist)
            i = i+ 1
            distArray[i] = eqDist
        sorted_distArray = sorted(distArray.items(), key=operator.itemgetter(1))
        closestClusterId = sorted_distArray[0][0]
        # print closestClusterId
        with open('../data/faceRecognition/cluster/clusterMember.csv', 'rb') as csvfile:
            myReader = csv.reader(csvfile, delimiter=',')
            listofMembers = list(myReader)[closestClusterId-1]
        i=0
        finalDistArray = dict()
        # print listofMembers
        while(i<len(listofMembers)):
            memberVector = featureVector[imageId[listofMembers[i]]-1]
            testImageVector = featureVector[-1]
            dist = 0
            k = 0
            for j in testImageVector:
                dist += (memberVector[k]-testImageVector[j])**2
                k = k+1
            eqDist = math.sqrt(dist)
            finalDistArray[imageId[listofMembers[i]]] = 1/(1+eqDist)
            i = i+ 1

        finalSorted_distArray = sorted(finalDistArray.items(), key=operator.itemgetter(1))
        j =0
        k=3
        similarImageIds = []
        while(j<3):
            similarImageIds.append(finalSorted_distArray[j][0])
            j = j+1
        similarity = ''
        for i in similarImageIds:
            similarity += str(i) + ","
        similarity = similarity[:-1]
    	object_list = {
    		'similarity' : similarity
    	}
    	return self.create_response(request, object_list, response_class=HttpResponse)
    
