#__author__ = 'aradon'

from skimage.transform import resize
from imread import imread
from skimage.feature import hog
from skimage import data, color
import os
import collections
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import csv
from collections import defaultdict

fileName = []
for path, subdirs,  files in os.walk('./data/faceRecognition/Train/'):
    for filename in files:
         f = os.path.join(path, filename)
         fileName.append(f)

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

pca = PCA(n_components=3)
pca.fit(featureVector)
featureVector = pca.transform(featureVector)

# print featureVector

keyList = list(featureDictionary.keys())
kmeans = KMeans(n_clusters=3, n_init=10)

kmeans.fit(featureVector)
labels = kmeans.labels_
centroids = kmeans.cluster_centers_

print labels
print keyList

clusterMember = defaultdict(list)


j = 0

while(j<len(keyList)):
    clusterMember[labels[j]].append(keyList[j])
    j = j+1

print clusterMember

with open('./data/faceRecognition/cluster/clusterMember.csv', 'wb') as csvfile:
    myWriter = csv.writer(csvfile)
    myWriter.writerows(clusterMember.values())


with open('./data/faceRecognition/cluster/centroid.csv', 'wb') as csvfile:
    myWriter = csv.writer(csvfile, delimiter=',')
    myWriter.writerows(centroids)

