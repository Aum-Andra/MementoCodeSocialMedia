import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import {FirebaseTSStorage} from 'firebasets/firebasetsStorage/firebaseTSStorage'
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.css']
})
export class CreatePostFormComponent implements OnInit {
selectedImageFile!:File;

auth=new FirebaseTSAuth()
firestore=new FirebaseTSFirestore()
storage=new FirebaseTSStorage()


  constructor( private dialog:MatDialogRef<CreatePostFormComponent>) { }

  ngOnInit(): void {
  }
  onPhotoSelected(photoSelector:HTMLInputElement){
    if(photoSelector.files){
      this.selectedImageFile=<File>photoSelector.files[0];

      if(!this.selectedImageFile){
console.log('no image selected')
        return
      }
      let fileReader=new FileReader()
      fileReader.readAsDataURL(this.selectedImageFile)
      fileReader.addEventListener(
        "loadend",
        ev=>{
          let readableString=fileReader.result?.toString()
        
         let postPreviewImage=   <HTMLImageElement>document.getElementById('post-preview-image')  

         
    if(readableString){
      postPreviewImage.src=readableString
    }           
        }
      )
    }
  }

  onPostClick(postTextInput:HTMLTextAreaElement){
let postDescription=postTextInput.value
let postId=this.firestore.genDocId()
let userId=this.auth.getAuth().currentUser?.uid

if(this.selectedImageFile){
  this.storage.upload(
    {
      uploadName:'upload Image Post',
      path:['Posts',postId,"image"],
      data:{
        data:this.selectedImageFile
      },
      onComplete:(url)=>{
        
       
          this.firestore.create({
            path:["Posts",postId],
            data:{
              postDescription:postDescription,
              creatorId:userId,
              imageUrl:url,
              timestamp:FirebaseTSApp.getFirestoreTimestamp()
            },
            onComplete:(docId)=>{           
              this.dialog.close()
              window.location.reload()
            }
          })
      }
    }
  )
}else{
  alert('Please choose a photo')
}
  }

}
