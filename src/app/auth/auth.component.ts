import { Component, OnInit } from '@angular/core';
import {FirebaseTSAuth} from 'firebasets/firebasetsAuth/firebaseTSAuth'
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

state=AuthState.LOGIN
firebaseAuth:FirebaseTSAuth


  constructor(private bottomSheetRef:MatBottomSheet,private router:Router ) {

    this.firebaseAuth=new FirebaseTSAuth()
   }

  ngOnInit(): void {
  }

  onPasswordResetClick(resetEmail:HTMLInputElement){
    let email=resetEmail.value

    if(this.isNotEmpty(email)){
      this.firebaseAuth.sendPasswordResetEmail({
email:email,
onComplete:(err)=>{
  alert(`Reset email set to ${email}`);
  this.bottomSheetRef.dismiss()


}
      })
    }
  }

  onLoginClick(loginEmail:HTMLInputElement,loginPassword:HTMLInputElement){
let email=loginEmail.value;
let password=loginPassword.value;

if(this.isNotEmpty(email)&& this.isNotEmpty(password)){
  this.firebaseAuth.signInWith(
    {
      email:email,
      password:password,
      onComplete:(res)=>{
        this.bottomSheetRef.dismiss()
        this.router.navigate(['post-feed'])
      },
      onFail:(err)=>{
        alert(err)
      }
    }
  )

}
  }

onRegisterClick(registerEmail:HTMLInputElement,registerPassword:HTMLInputElement,registerConfirmedPassword:HTMLInputElement){
  let email=registerEmail.value;
  let password=registerPassword.value;
  let confirmPassword=registerConfirmedPassword.value
  if(
    this.isNotEmpty(email) && this.isNotEmpty(password)&&this.isNotEmpty(confirmPassword) &&
    this.isAMatch(password,confirmPassword)
  ){

    this.firebaseAuth.createAccountWith(
      {
        email:email,
        password:password,
        onComplete:(res)=>{
          this.bottomSheetRef.dismiss()

        },
        onFail:(err)=>{
          alert('Failed to create the account.')
        }
      }
    )
  }



}

isNotEmpty(text:string){
  return text != null && text.length>0
}
isAMatch(text:string,comparedText:string){

  return text == comparedText
}

  onForgotenPasswordClick(){
    this.state=AuthState.FORGOT_PASSWORD

  }

  onCreateAccountClick(){
    this.state=AuthState.REGISTER

  }
  onLoginClicked(){
    this.state=AuthState.LOGIN

  }

  isLoginState(){
    return  this.state==AuthState.LOGIN
  }
  isRegisterState(){
    return  this.state==AuthState.REGISTER
  }
  isForgottenPasswordState(){
    return  this.state==AuthState.FORGOT_PASSWORD
  }

  
  
}
export enum AuthState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD

}
