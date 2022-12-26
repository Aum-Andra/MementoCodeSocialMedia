import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostFormComponent } from 'src/app/tools/create-post-form/create-post-form.component';
import { FirebaseTSFirestore, Limit, OrderBy, Where } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

  firestore=new FirebaseTSFirestore()
  posts:PostData[]=[]

  constructor(
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  onCreatePostClick(){
this.dialog.open(
  CreatePostFormComponent
)
  }

  getPosts(){
    this.firestore.getCollection({
      path:["Posts"],
      where:[
        // new Where("creatorId","==","DkZ5XvEBwLdY5G4LVl5E4JcwDq72"),
        new OrderBy('timestamp',"desc"),
        new Limit(10)
      ],
      onComplete:(res)=>{
res.docs.forEach((doc)=>{
let post= <PostData> doc.data();
post.postId=doc.id
this.posts.push(post)
console.log(this.posts)

})
      },
      onFail:(err)=>{

      }
    })
  }

  
  
}

export interface PostData{
postDescription:string;
creatorId:string,
imageUrl?:string,
postId:string
}