import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-all-todos',
  templateUrl: './all-todos.component.html',
  styleUrls: ['./all-todos.component.scss']
})
export class AllTodosComponent implements OnInit {
  todos: any = [];
  error = '' ;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    try {
      this.todos = await this.loadTodos();
      console.log(this.todos);
    } catch(err) {
      this.error = 'Fehler beim laden' ;
    }
  }

  loadTodos() {
    const url = environment.baseUrl + "/todos/";
    let headers = new HttpHeaders() ;
    headers = headers.set('Authorization', 'Token ' + localStorage.getItem('token'));

    return lastValueFrom(this.http.get(url, {
      headers : headers 
    }));
  }
}
