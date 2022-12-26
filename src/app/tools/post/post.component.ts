import { Component, OnInit ,Input} from '@angular/core';
import { PostData } from 'src/app/pages/post-feed/post-feed.component';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
@Input() postData!:PostData

firestore=new FirebaseTSFirestore()

creatorName:string=''
creatorDescription:string=''
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getCreatorInfo()
  }

getCreatorInfo(){
  this.firestore.getDocument({

    path:["Users",this.postData.creatorId],
    onComplete:res=>{
    let userDocument=  <UserDoc>res.data();
    if(userDocument){
   this.creatorName=   userDocument.publicName,
    this.creatorDescription=  userDocument.description

    }

    }
  })
}

onReplyClick(){
this.dialog.open(ReplyComponent,{data:this.postData.postId})

}
}

export interface UserDoc{
  publicName:string,
  description:string
}