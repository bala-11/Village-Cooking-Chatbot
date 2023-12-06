function reply(){

var quickReplies = ["Add Food Item", "Update Food Item", "Delete Food Item"];
var message = {
    "type": "template",
    "payload": {
        "template_type": "quick_replies",
        "text": "Admin CRUD",
        "quick_replies": []
    }
};

for (i = 0; i < quickReplies.length; i++) {
    //if only text needs to diplayed
    var quickReply = {
        "content_type": "text",
        "title": quickReplies[i],
        "payload": quickReplies[i]
    };
    /* Uncomment this if both text and image needs to displayed for the  quick reply button
     var quickReply = {
     "content_type":"text",
     "title":quickReplies[i],
     "payload":"payload2",
     "image_url": "url of the image
     };
     */
    message.payload.quick_replies.push(quickReply);
}
return(JSON.stringify(message));
}
