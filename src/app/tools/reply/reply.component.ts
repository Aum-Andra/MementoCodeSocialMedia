import { Component, OnInit,Inject } from '@angular/core';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  firestore=new FirebaseTSFirestore()
comments:Comment[]=[]
  constructor(@Inject(MAT_DIALOG_DATA) private postId:string) { }

  ngOnInit(){
    this.getComments()
    console.log(this.comments)
  }

  isCommentCreator(comment:Comment){

    try{
      return comment.creatorId==AppComponent.getUserDocument().userId

    }catch(err){
return false
    }


  }

getComments(){
this.firestore.listenToCollection({
  name:"Post Comments",
  path:["Posts",this.postId,"Post Comments"],
  where:[new OrderBy("timestamp","asc")],
  onUpdate:(res)=>{
    console.log(res.docChanges())
   
    res.docChanges().forEach(
      postCommentDoc=>{
        if(postCommentDoc.type=='added'){
         
          this.comments.unshift(<Comment>postCommentDoc.doc.data())
        }
      }
    )
  }
})
}
  onSendClick(commentInput:HTMLInputElement){

    if(!(commentInput.value.length>0)){
      console.log('error')
      return
    }
    this.firestore.create({
      path:["Posts",this.postId,"Post Comments"],
      data:{
       comment: commentInput.value,
       creatorId:AppComponent.getUserDocument().userId,
       creatorName:AppComponent.getUserDocument().publicName,
       timestamp:FirebaseTSApp.getFirestoreTimestamp()
      },
      onComplete:docId=>{
        commentInput.value=''
       
      

      }
    })

  }

}

export interface Comment{
  creatorId:string;
  creatorName:string;
  comment:string
  timestamp:firebase.default.firestore.Timestamp
}