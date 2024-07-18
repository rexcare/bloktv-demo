# Program To Read video 
# and Extract Frames 

import cv2 


vidObj = cv2.VideoCapture('AdRecord.mp4') 
  
count = 0

success = 1

if vidObj.isOpened():
    print('open')    
    while success: 
        success, image = vidObj.read() 
        cv2.imwrite("./record/frame%d.jpg" % count, image)  
        count += 1

