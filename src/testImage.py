__author__ = 'aradon'
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


def getSimilarImages(src):
    fileName = []
    imageId = dict()
    i=1
    for path, subdirs,  files in os.walk('./data/faceRecognition/Train/'):
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
    # input image
    image = color.rgb2gray(imread(src))
    image = resize(image, (256, 256))

    fd, hog_image = hog(image, orientations=8, pixels_per_cell=(16, 16),
                            cells_per_block=(1, 1), visualise=True)

    # featureDictionary[i].append(fd)
    featureVector.append(fd)



    pca = PCA(n_components=3)
    pca.fit(featureVector)
    featureVector = pca.transform(featureVector)

    refVector = []
    # print featureVector[0]
    with open('./data/faceRecognition/cluster/centroid.csv', 'rb') as csvfile:

      myReader = csv.reader(csvfile, delimiter=',')
      for row in myReader:
          # print row

          temp_row = []

          for item in row:
              item = float(item)

              temp_row.append(item)
              #print temp_row[]
          # row = temp_row
          # print row
          refVector.append(temp_row)

    # print refVector[2]
    # print np.array(refVector)
    #print featureVector[-1]
    # print type(featureVector[-1])
    # print len(featureVector[-1])
    """
    featureVectorList = []
    for i in featureVector[-1]:
        featureVectorList.append(i)

    result = 1 - spatial.distance.cosine(refVector[1], featureVectorList)
    print result
    """
    i = 0

    distArray = dict()
    # sum = 0
    while( i< len(refVector)):
        # print i
        dist = 0
        k = 0
        for j in featureVector[-1]:

            # print refVector[i][j]
            dist += (refVector[i][k]-featureVector[-1][j])**2
            k = k+1
        eqDist = math.sqrt(dist)
        i = i+ 1
        distArray[i] = eqDist
        # sum += distArray[i]
    # for keys in distArray:
        # distArray[keys] = distArray[keys]/sum

    # print distArray
    sorted_distArray = sorted(distArray.items(), key=operator.itemgetter(1))
    # print distArray
    # print "Closest Cluster ID:", sorted_distArray[0][0] # closest cluster
    closestClusterId = sorted_distArray[0][0]

    with open('./data/faceRecognition/cluster/clusterMember.csv', 'rb') as csvfile:
        myReader = csv.reader(csvfile, delimiter=',')
        listofMembers = list(myReader)[closestClusterId-1]

    # print len(listofMembers)
    # print featureDictionary[listofMembers[1]]
    # print imageId
    # print imageId[listofMembers[1]]

    i=0
    finalDistArray = dict()
    while(i<len(listofMembers)):
        memberVector = featureVector[imageId[listofMembers[i]]-1]
        testImageVector = featureVector[-1]
        dist = 0
        k = 0
        for j in testImageVector:

            # print refVector[i][j]
            dist += (memberVector[k]-testImageVector[j])**2
            k = k+1
        eqDist = math.sqrt(dist)
        finalDistArray[imageId[listofMembers[i]]] = 1/(1+eqDist)
        i = i+ 1

    finalSorted_distArray = sorted(finalDistArray.items(), key=operator.itemgetter(1))
    # print finalSorted_distArray
    # print finalSorted_distArray[1][0]
    # print imageId
    j =0
    k=3
    similarImageIds = []
    while(j<3):
        similarImageIds.append(finalSorted_distArray[j][0])
        j = j+1

    return similarImageIds


# uncomment following code to get the result

ids = []
ids = getSimilarImages('./data/faceRecognition/Test/Jonas.JPG')
print ids
