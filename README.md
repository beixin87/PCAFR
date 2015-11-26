# SplunkHW
Splunk Vancouver Hack Week

Fit: Based on the following predictor variables we fit the PLS model.
eventType, volunteerCertification, totalNumber, eventLocation, volunteerBonus, volunteerScore, satisfy
Note: Latent variables that are subset of set of predictor variables are determined by PLS.

Apply: We apply the multivariate regression model to predict following response variables.
eventBudget, volunteerNumber 


Algorithm Description:
Event Prediction:

From the set of predictor variables we would like to predict set of response variables. Reasonable solution to tackle this problem is to build a multivariate regression model from training event data that can predict response variables from set of testing event data. Partial least square (PLS) is a popular choice as it learns the latent variables utilizing the relationship between predictor and response variables in the training dataset. We particularly utilized NIPALS algorithm  (https://en.wikipedia.org/wiki/Non-linear_iterative_partial_least_squares) which is a kind of PLS technique.  

Face Recognition:
Training phase: 
1. Make the dimnsion of set of training images equal.
2. Extract features using HOG freature extraction technique.
3. Reduce feature matrix usig PCA.
4. Find clusters from reduced set of feature matrix using Kmeans algorithm.

Testing phase:
1. Make the dimension of the image similar to the dimension of training images.
2. Extract features using HOG freature extraction technique.
3. Reduce feature matrix usig PCA.
4. Find the most similar cluster that the testing image might belong to.
5. Retrieve top 3 similar images to the testing image from the cluster.

### Anaconda ####
1. First Install Anaconda (it contains Python 2.7.10 and all necessary pacakges e.g., scikit-learn, numpy, scipy etc.). You may also need to update your PATH to point ~/anaconda/bin
2. Install package PIL in your Anaconda directory
3. Update Scikit-learn to 0.17 version
4. Replace "import imread" with "import scipy.misc as msc"
5. Replae "imread(image/src)" with "msc.imread(image/src)"
