
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService : AuthService) {}

  async login() {
    try {
      let resp = await this.authService.loginWithUsernameAndPassword(this.username, this.password);
      console.log(resp);
    } catch(err) {
      console.log('error :' , err) ;
    }
  }

  
}
