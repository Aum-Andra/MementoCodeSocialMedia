import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FirebaseTSApp} from 'firebasets/firebasetsApp/firebaseTSApp'
import { environment } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';

import {MatButtonModule} from '@angular/material/button'
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'
import {MatCardModule} from '@angular/material/card';
import { AuthComponent } from './auth/auth.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ProfileComponent } from './tools/profile/profile.component'
import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostFormComponent } from './tools/create-post-form/create-post-form.component';
import { PostComponent } from './tools/post/post.component';
import { ReplyComponent } from './tools/reply/reply.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    EmailVerificationComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostFormComponent,
    PostComponent,
    ReplyComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig)
  }
}
