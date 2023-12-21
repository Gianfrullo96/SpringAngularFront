import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  	componentToShow: string = "login";
	myerror:boolean= false;

	constructor(private axiosService: AxiosService) { }

	showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }

	onLogin(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/login",
		    {
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
				this.axiosService.setAuthToken(response.data.token);
		        this.componentToShow = "messages";
				this.myerror=false;
				
		    }).catch(
		    error => {
				this.myerror=true;
		        this.componentToShow = "login";
		    }
		);

	}

	onRegister(input: any): void {
		this.axiosService.request(
		    "POST",
		    "/register",
		    {
		        firstName: input.firstName,	
		        lastName: input.lastName,
		        login: input.login,
		        password: input.password
		    }).then(
		    response => {
				this.axiosService.setAuthToken(response.data.token);
				this.myerror=false
		        this.componentToShow = "messages";
		    }).catch(
		    error => {
				this.myerror=true;
		        this.componentToShow = "login";
		    }
		);
	}

}

