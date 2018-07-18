# PCA Face Recognition

Fit: 
  By modified the predictor variables eventType, volunteerCertification, totalNumber, eventLocation, volunteerBonus and volunteerScore, the PLS model now determines the latent variables that are subsets of set of the predictor variables.

Apply: 
  The multivariate regression model is applied to predict the response variables eventBudget and volunteerNumber.



Algorithm Description:

Event Prediction:
  A multivariate regression model from training event data is built to predict response variables from the set of the predictor variables of testing event data. Partial least square (PLS) is a popular choice as it learns the latent variables utilizing the relationship between predictor and response variables in the training dataset. We particularly utilized NIPALS algorithm  (https://en.wikipedia.org/wiki/Non-linear_iterative_partial_least_squares) which is a kind of PLS technique.  

Face Recognition:
 
Training phase:
1.	The dimensionality of training images is set to be equal.
2.	Extract features matrices of training images by HOG (Histogram of oriented gradients) feature extraction.
3.	Reduce the dimensionality of the feature matrices by PCA (Principal component analysis).
4.	Find clusters from the reduced feature matrices from step 3 by K-means algorithm.

Testing phase:
1.	The dimension of the images is set to be similar to the dimension of training images.
2.	Extract features matrices of training images by HOG (Histogram of oriented gradients) feature extraction.
3.	Reduce the dimensionality of the feature matrices by PCA (Principal component analysis).
4.	Find the clusters with the highest probability that the testing image might belong to.
5.	From the cluster, retrieve top 3 images that are similar to the testing image.


### Anaconda ####
1. First Install Anaconda (it contains Python 2.7.10 and all necessary packages e.g., scikit-learn, numpy, scipy etc.). You may also need to update your PATH to point ~/anaconda/bin
2. Install package PIL in your Anaconda directory
3. Update scikit-learn to 0.17 version
4. Replace "import imread" with "import scipy.misc as msc"
5. Replace "imread(image/src)" with "msc.imread(image/src)"
