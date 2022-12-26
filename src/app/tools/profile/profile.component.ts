import { Component, OnInit,Input } from '@angular/core';
import {FirebaseTSAuth} from 'firebasets/firebasetsAuth/firebaseTSAuth'
import {FirebaseTSFirestore} from 'firebasets/firebasetsFirestore/firebaseTSFirestore'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input()
  show: boolean | undefined;

  firestore:FirebaseTSFirestore;
  auth:FirebaseTSAuth;

  constructor( ) {
    this.firestore=new FirebaseTSFirestore(),
    this.auth=new FirebaseTSAuth()
   }

  ngOnInit(): void {
  }
  onContinueClick(nameInput:HTMLInputElement,aboutInput:HTMLTextAreaElement){
let name=nameInput.value;
let description=aboutInput.value;
let userId=this.auth.getAuth().currentUser?.uid
console.log(userId)



this.firestore.create(
  {
    path:["Users",`${userId}` ],

    data:{
     publicName:name,
     description:description 

    },
    onComplete:(docId)=>{
alert('Profile created')
nameInput.value=''
aboutInput.value=''
    },
    onFail:(err)=>{
console.log(err)
    }
  }
)

  }


}
