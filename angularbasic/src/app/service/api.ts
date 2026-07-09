import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get(
      'https://api.freeprojectapi.com/api/GoalTracker/getAllUsers'
    );
  }

  createUser(user: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/GoalTracker/register',
      user
    );
  }

  // onUpdateUser(user: any) {
  //   return this.http.put(
  //     'https://api.freeprojectapi.com/api/GoalTracker/updateUser?id=' + user.userId,
  //     user
  //   );
  // }
  onSaveUser(user: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/GoalTracker/register',
      user
    );
  }


  onUpdateUser(userId: number, user: any) {
  return this.http.put(
    'https://api.freeprojectapi.com/api/GoalTracker/updateUser?id=' + userId,
    user
  );
}


 onDeleteUser(userId: number) {
  return this.http.delete(
    'https://api.freeprojectapi.com/api/GoalTracker/deleteUserById?id=' + userId
  );
}


  
}