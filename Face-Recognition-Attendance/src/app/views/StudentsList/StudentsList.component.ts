import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { DataSourceService } from '../../_Services/DataSource.service';

@Component({
    selector: 'app-StudentsList',
    styleUrls: ['./StudentsList.component.scss'],
    templateUrl: './StudentsList.component.html',
})

export class StudentsListComponent implements OnInit {
  constructor(
    private modalService: NgbModal
    ,private dataService: DataSourceService,
		private cdr: ChangeDetectorRef) { }

    // stdList = [{name:'Ahmed',surname:'Ahmed', studentNumber:"1234", status:'Active'},{name:'Zaid',surname:'Zaid', studentNumber:"5678", status:'Not Confirmed'}];
    stdListFull = [];
    stdList = [];
    coursesList = [];
    UntouchedSelectedCourses = [];
    selectedCourses = [];
    staffList =[];
    selectedAdvisor='';
    baseUrl = environment.apiUrl;

    //images uploader 
    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    //modal work
    modalTitle='';
    modalObj:any={};
    modalObjUpdate;
    untouchedModalObjUpdate;
    isLoading = false;
    newUserSuccess = false;
    newUserFailure = false;
    modalSuccess = false;
    modalFailure = false;
    img
    
    searchQuery=''
    
    attendanceList=[];
    dropdownList = [];
    selectedItems = [];
    dropdownSettings:IDropdownSettings = {};

    modalObjUpdatePhoto
    obj2ForCamPhoto

    ngOnInit(): void {
      this.loadUsers();
      this.loadCourses();
      this.loadStaffs();

    }

    
    onItemSelect(item: any) {
      console.log(item);
    }
    onSelectAll(items: any) {
      console.log(items);
    }


    loadUsers(){
      this.dataService.getAllStudents().subscribe((students) => {

        this.stdListFull = students;
        this.stdList = students;
      }, error =>{
        console.log(error);
      });
    }

    getAttendanceForStudent(studentId){
      this.dataService.getAttendanceForStudent(studentId).subscribe( resp=>{

        this.attendanceList = resp;
        this.cdr.detectChanges();
      }, error =>{

        console.log(error);
      });
    }

    
    loadCourses(){
      this.dataService.getAllCourses().subscribe((resp) => {
        this.coursesList = resp;

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'courseCode',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
      };
        
       
      }, error =>{
        console.log(error);
      });
    }

     
    loadStaffs(){
      this.dataService.getAllStaffs().subscribe((resp) => {

        this.staffList = resp;
         
      }, error =>{
        console.log(error);
      });
    }

    onFileSelect(e){
      const file = <File>e.target.files[0]
      
      this.uploader.addToQueue([file], { autoUpload: true });
      this.uploader.uploadAll();
    }

    fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }
  
    initializeUploader() {4
      this.uploader = new FileUploader({
        url:
          this.baseUrl +
          'student/' +
          this.modalObjUpdate.id.toString() +
          '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024,
      });
  
      this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      };
  
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const res = JSON.parse(response);

          const photo = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain,
          };
          this.modalObjUpdate.photos.push(photo);
          this.cdr.detectChanges();

          this.loadUsers();
          // if (photo.isMain) {
          //   this.authService.changeMemberPhoto(photo.url);
          //   this.authService.currentUser.photoUrl = photo.url;
          //   localStorage.setItem(
          //     'user',
          //     JSON.stringify(this.authService.currentUser)
          //   );
          // }
        }
      };
    }

       addNew(){
        

        if(this.selectedAdvisor !=''){
          this.modalObj.advisorId = +this.selectedAdvisor;
        }else{
          this.modalObj.advisorId = null;
        }
        


        this.modalObj.classesIds=[];

        for(const s of this.selectedCourses){
          this.modalObj.classesIds.push(s.id);
          }

        this.dataService.addNewStudent(this.modalObj).subscribe(
          (response:any) => {

          this.newUserSuccess = true;
          this.newUserFailure = false;
          this.loadUsers();

          // for(const s of this.selectedCourses){
          //   this.addStudentToClass(s, response.id);
          // }

          },
          (error) => {
          this.newUserFailure = true;
          this.newUserSuccess = false;
          console.log(error);
          });
    }

    openModal(content,obj=null){
      
      this.modalTitle = ''
      this.newUserSuccess = false;
      this.newUserFailure = false;
      this.modalSuccess = false;
      this.modalFailure = false;
      this.selectedCourses =[];
      this.selectedAdvisor ='';

       this.modalObj = {};

       if(obj !== null)
       {
          this.modalObjUpdate = {...obj};
          this.untouchedModalObjUpdate = {...obj};

          this.selectedAdvisor = obj.advisorId.toString();

          for(const c of this.modalObjUpdate.classes){
            this.UntouchedSelectedCourses.push({id:c.id, courseCode:c.courseCode});
            this.selectedCourses.push({id:c.id, courseCode:c.courseCode});
          }

          this.initializeUploader();
          this.modalService.open(content, {
            size: "xl",
            centered: true,
          });
       } 
       else
       {
          this.modalService.open(content, {
            size: "lg",
            centered: true,
          });
       }
    }

    openModalPhoto(content,obj){
    
    const index = this.stdList.findIndex(x=> x.id === obj.id);
    if(index != -1){
      this.obj2ForCamPhoto = this.stdList[index];
    }else{
      this.obj2ForCamPhoto = {};
    }

      
          this.modalObjUpdatePhoto = {...obj};

      
          this.modalService.open(content, {
            size: "lg",
            centered: true,
          });
       
    }

    openAttendanceModal(content,obj){
      
      this.attendanceList =[];
      this.modalTitle = obj.name +' '+ obj.surname;
      this.newUserSuccess = false;
      this.newUserFailure = false;
      
      this.getAttendanceForStudent(obj.id);

          this.modalObjUpdate = {...obj};
        
          this.modalService.open(content, {
            size: "xl",
            centered: true,
          });
    }

    openDeleteModal(content,obj){

      this.modalTitle = obj.name +' '+ obj.surname;
      this.newUserSuccess = false;
      this.newUserFailure = false;
      this.modalSuccess = false;
      this.modalFailure = false;
      this.selectedCourses =[];

          this.modalObjUpdate = {...obj};
        
          this.modalService.open(content, {
            size: "lg",
            centered: true,
          });
       
    }

    deletePhoto(id: number) {

        this.dataService
          .deletePhoto(this.modalObjUpdate.id, id)
          .subscribe(
            () => {

              this.modalObjUpdate.photos.splice(
                this.modalObjUpdate.photos.findIndex((p) => p.id === id),
                1
              );
              this.cdr.detectChanges();
              this.loadUsers();
            },
            (error) => {
            }
          );
          
    }

    async update(){

      let CoursesToAdd = [];
      let CoursesToRemove = [];
  
      for(let c of this.UntouchedSelectedCourses){
        if(!this.selectedCourses.some(x=> x.id == c.id)){
          CoursesToRemove.push(c.id);
        }
      }
  
      for(let c of this.selectedCourses){
        if(!this.UntouchedSelectedCourses.some(x=> x.id == c.id)){
          CoursesToAdd.push(c.id);
        }
      }

      let result:any = true;
      for(const id of CoursesToAdd){
        result = await this.addStudentToClass(id,this.modalObjUpdate.id);
        if(!result){
          break;
        }
      }

      for(const id of CoursesToRemove){
        result = await this.removeStudentFromClass(id,this.modalObjUpdate.id);
        if(!result){
          break;
        }
      }

      if(this.untouchedModalObjUpdate.name === this.modalObjUpdate.name
        && this.untouchedModalObjUpdate.surname === this.modalObjUpdate.surname
        && this.untouchedModalObjUpdate.studentNumber === this.modalObjUpdate.studentNumber){
        this.newUserFailure = false;
        this.newUserSuccess = true;
        return;
      }

      if(this.selectedAdvisor !=''){
        this.modalObjUpdate.advisorId = +this.selectedAdvisor;
      }else{
        this.modalObjUpdate.advisorId = null;
      }

      this.dataService.updateStudent(this.modalObjUpdate).subscribe(res=>{
        this.newUserFailure = false;
        this.newUserSuccess = true;
        this.loadUsers();
        
      },
      err=>{
        this.newUserFailure = true;
        this.newUserSuccess = false;
      })
    }

    deleteStudent(){
      this.isLoading = true;
      this.modalSuccess = false;
      this.modalFailure = false;
      this.modalObjUpdate.isDeleted = true;
  
      this.dataService.updateStudent(this.modalObjUpdate).subscribe(
        (response) => {
            this.modalSuccess = true;
            this.isLoading = false;
            this.loadUsers();
        },
        (error) => {
          this.modalFailure = true;
          this.isLoading = false;
        }
      );
    }

    async addStudentToClass(courseId,studentId){


      return new Promise((resolve, reject) => {

        this.dataService.AddStudentToClass(courseId,studentId).subscribe(
          response => {

             resolve(true);
  
          },error => {
  
              reject(false);
         }
       );
  
     });
  
    }
  
    async removeStudentFromClass(courseId,studentId){

      return new Promise((resolve, reject) => {
       
        this.dataService.RemoveStudentFromClass(courseId,studentId).subscribe(
          response => {
  
             resolve(true);
  
          },error => {
  
              reject(false);
         }
       );
  
     });
  
    }


    camComponentEmitted(emittedValue){

      this.loadUsers();
    }


    applySearch(){

      if(this.searchQuery===''){
        this.stdList = this.stdListFull;
      this.cdr.detectChanges();

        return;
      }

      this.stdList =  this.stdListFull.filter(x=> x.studentNumber.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.cdr.detectChanges();
    }

    runSearch(keyCode) {
      if (keyCode === 13) this.applySearch();
    }
}