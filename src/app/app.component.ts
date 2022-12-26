import { Component } from '@angular/core';
import { AuthComponent } from 'src/app/auth/auth.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet'

import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { User } from './shared/interfaces/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  auth=new FirebaseTSAuth()
  firestore=new FirebaseTSFirestore()

  userHasProfile=true;
 private static userDocument: User;
 currentUserName:string=''
  // isLoggedIn=false
 
  constructor(private loginSheet:MatBottomSheet,private router:Router) {
    console.log(this.currentUserName)
    
    
this.auth.listenToSignInStateChanges((user)=>{
 this.auth.checkSignInState({
  whenSignedIn:user=>{
// alert('Logged in')
// this.isLoggedIn=true;

  },
  whenSignedOut:user=> {
    // alert('Logged out')
    this.router.navigate([''])
   
AppComponent.userDocument={publicName:'', description:'', userId:''}


  },
  whenSignedInAndEmailNotVerified:user=> {
    // user.emailVerified
    this.router.navigate(['/email-verification'])
   
  },
  whenSignedInAndEmailVerified:user=> {
   this.getUserProfile()
  },
  whenChanged:user=>{

  }
 });


})


   }

  ngOnInit(): void {
  }

loggedIn(){
return this.auth.isSignedIn()


}
  
  onLoginClicked(){
this.loginSheet.open(AuthComponent)
  }

getUserName(){

  

      return AppComponent.userDocument.publicName
  

  }

 
  

 
    


 public static getUserDocument(){
return AppComponent.userDocument
  }

  getUserProfile(){
    let userId=this.auth.getAuth().currentUser?.uid
    this.firestore.listenToDocument(
      {
        name:'Getting Document',
        path:["Users", `${userId}`],
        onUpdate:(res)=>{
         
          AppComponent.userDocument=<User>res.data()
          this.currentUserName=AppComponent.userDocument.publicName
          if(AppComponent.userDocument){
this.router.navigate(['post-feed'])
          }
          if(userId){
            AppComponent.userDocument.userId=userId    
          }
this.userHasProfile=res.exists
        }
      }
    )
  }

  onLogoutClicked(){
    this.auth.signOut()
  }
}


