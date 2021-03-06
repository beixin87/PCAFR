# PCA Face Recognition

Fit: 

  By modified the predictor variables eventType, volunteerCertification, totalNumber, eventLocation, volunteerBonus and volunteerScore, the PLS model now determines the latent variables that are subsets of set of the predictor variables.

Apply: 

  The multivariate regression model is applied to predict the response variables eventBudget and volunteerNumber.


Algorithm Description:

Event Prediction:
  A multivariate regression model from training event data is built to predict response variables from the set of the predictor variables of testing event data. Partial least square (PLS) is used as the model, because PLS learns the latent variables by utilizing the relationship between predictor and response variables in the training dataset. NIPALS algorithm, a PLS technique (referred from https://en.wikipedia.org/wiki/Non-linear_iterative_partial_least_squares), is utilized.
  
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
1.	Install Anaconda which contains Python 2.7.10 and all necessary packages, such as scikit-learn, numpy, and scipy. Update the PATH to “~/anaconda/bin”.
2.	Install package PIL in the Anaconda directory
3.	Update Scikit-learn to 0.17 version
4.	Replace "import imread" with "import scipy.misc as msc"
5.	Replace "imread(image/src)" with "msc.imread(image/src)"

