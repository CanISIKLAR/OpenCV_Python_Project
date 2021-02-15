import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  
  baseUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  
  currentUser: any = {};
constructor(private http:HttpClient) { }

  //////////////////////
  /////  Student  //////
  //////////////////////

  getAllStudents() {

    const header = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );
    
    return this.http.get<any>(`${environment.apiUrl}Student`, {
      headers: header,
    });
  }

  
  getConfirmedStudents() {
    return this.http.get<any>(`${environment.apiUrl}Student/confirmed`, {
      headers: this.httpOptions.headers,
    });
  }

  getNotConfirmedStudents() {
    return this.http.get<any>(`${environment.apiUrl}Student/notConfirmed`, {
      headers: this.httpOptions.headers,
    });
  }

  getAttendanceForStudent(studentId) {
    return this.http.get<any>(`${environment.apiUrl}Student/${studentId}/attendance`, {
      headers: this.httpOptions.headers,
    });
  }

  getStudentById(studentId) {
    return this.http.get<any>(`${environment.apiUrl}Student/${studentId}`, {
      headers: this.httpOptions.headers,
    });
  }

  
  getStudentBystdNumber(stdNumber) {
    return this.http.get<any>(`${environment.apiUrl}Student/stdNumber/${stdNumber}`, {
      headers: this.httpOptions.headers,
    });
  }

  addNewStudent(student) {
    return this.http.post(`${environment.apiUrl}Student`,student , {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateStudent(student) {
    return this.http.put(
      `${environment.apiUrl}student/${student.id}`,
      student,
      { headers: this.httpOptions.headers, observe: 'response' }
    );
  }

  setMainPhoto(userId: number, id:number){
    return this.http.post(this.baseUrl + 'student/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId:number, photoId:number){
    return this.http.delete(this.baseUrl + 'student/' + userId + '/photos/' + photoId);
  }

  
  addNewphoto(userId,photo) {
    return this.http.post(`${environment.apiUrl}Student/${userId}/photos`,photo , {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }


    //////////////////////
    /////  Classes  //////
    //////////////////////

    getAllCourses() {
      return this.http.get<any>(`${environment.apiUrl}Class`, {
        headers: this.httpOptions.headers,
      });
    }

    
    getCoursById(id) {
      return this.http.get<any>(`${environment.apiUrl}Class/${id}`, {
        headers: this.httpOptions.headers,
      });
    }

    getCoursByCourseCode(couseCode) {
      return this.http.get<any>(`${environment.apiUrl}Class/couseCode/${couseCode}`, {
        headers: this.httpOptions.headers,
      });
    }

    addClass(cla) {
      return this.http.post(`${environment.apiUrl}Class`,cla , {
        headers: this.httpOptions.headers,
        observe: 'response',
      });
    }

    updateClass(cla) {
      return this.http.put(
        `${environment.apiUrl}Class/${cla.id}`,
        cla,
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }

    
    getAllStudentsForClass(courseId) {
      return this.http.get<any>(`${environment.apiUrl}Class/${courseId}/Students`, {
        headers: this.httpOptions.headers,
      });
    }

    /////////////////////////

    AddStudentToClass(classId, StudentId){

      return this.http.put(
        `${environment.apiUrl}Class/${classId}/Add/${StudentId}`,
        {},
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }
    
    RemoveStudentFromClass(classId, StudentId){
      return this.http.put(
        `${environment.apiUrl}Class/${classId}/Remove/${StudentId}`,
        {},
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }

    ///////////////////////////

    getAllSchedulesByClassId(classId) {
      return this.http.get<any>(`${environment.apiUrl}Class/Schedule/${classId}`, {
        headers: this.httpOptions.headers,
      });
    }

    AddScheduleToClass(scheule){
      return this.http.post(
        `${environment.apiUrl}Class/Schedule`,
        scheule,
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }


    UpdateSchedule(schedule){

      return this.http.put(
        `${environment.apiUrl}Class/Schedule/${schedule.id}`,
        schedule,
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }

    ////// staff //////

    getAllStaffs() {
      return this.http.get<any>(`${environment.apiUrl}Staff`, {
        headers: this.httpOptions.headers,
      });
    }

    
    getStaffById(staffId) {
      return this.http.get<any>(`${environment.apiUrl}Staff/${staffId}`, {
        headers: this.httpOptions.headers,
      });
    }

    updateStaff(staff) {
      return this.http.put(
        `${environment.apiUrl}Staff/${staff.id}`,
        staff,
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }


    
    updateStaffPassword(staff) {

      return this.http.put(
        `${environment.apiUrl}Staff/password/${staff.id}`,
        { staffId : staff.id,
          password: staff.password},
        { headers: this.httpOptions.headers, observe: 'response' }
      );
    }
}
