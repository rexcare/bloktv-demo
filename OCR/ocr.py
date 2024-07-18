from utils import filter_results_by_confidence


def load_easyocr(lang=['en']):

    import easyocr
    reader = easyocr.Reader(lang)

    return reader 


def load_paddleocr(lang='en'):
    
    from paddleocr import PaddleOCR
    paddleocr = PaddleOCR(lang=lang)

    return paddleocr 


def apply_ocr(image_input,ocr_object,prob_thresh=0.3,method='easyocr'):
    if method == 'paddleocr':
        
        tmp_results = []
        results = ocr_object(image_input,cls=True)
        
        bboxes,text_with_conf,_ = results
        
        for i,bbox in enumerate(bboxes):
            
            text,conf = results[1][i]
            tmp_results.append((bbox, text, conf))
            
        filtered_results = filter_results_by_confidence(tmp_results, prob_thresh)
        
    elif method == 'easyocr':

        results = ocr_object.readtext(image_input)
        
        filtered_results = filter_results_by_confidence(results, prob_thresh)
        
        
    return filtered_results


def apply_ocr_mthreaded(image_input,ocr_object,results_queue,prob_thresh=0.3,method='easyocr'):
    
    global filtered_results
    
    if method == 'paddleocr':
        
        tmp_results = []
        results = ocr_object(image_input)
        
        bboxes,text_with_conf,_ = results
        
        for i,bbox in enumerate(bboxes):
            
            text,conf = results[1][i]
            
            tmp_results.append((bbox, text, conf))

         
        filtered_results = filter_results_by_confidence(tmp_results, prob_thresh)
        
    elif method == 'easyocr':
        
        results = ocr_object.readtext(image_input)
        
        filtered_results = filter_results_by_confidence(results, prob_thresh)
        
        
    results_queue.put(filtered_results)