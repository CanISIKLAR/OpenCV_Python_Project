
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataSourceService } from "../../_Services/DataSource.service";
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
    selector: 'app-Courses',
    styleUrls: ['./Courses.component.scss'],
    templateUrl: './Courses.component.html',
})

export class CoursesComponent implements OnInit, OnDestroy {
   
    CoursesList=[];
    CoursesListFull=[];
     //modal work
     modalTitle='';
     modalObj:any={};
     modalObjUpdate;
     isLoading = false;
     newObjSuccess = false;
     newObjFailure = false;
     modalSuccess = false;
     modalFailure = false;

     img
     searchQuery=''

    constructor(
        private modalService: NgbModal
        ,private dataService: DataSourceService
        ,private cdr: ChangeDetectorRef) { }
            
  

    ngOnInit(): void {
        this.loadCourses();

    }
    
    loadCourses(){
        this.dataService.getAllCourses().subscribe((res) => {
          this.CoursesList = res;
          this.CoursesListFull = res;
          
        }, error =>{
          // this.alertify.error(error);
        });
      }


      runSearch(keyCode) {
        
        if (keyCode === 13) this.applySearch();
      }

      applySearch(){
        
        if(this.searchQuery===''){
          this.CoursesList = this.CoursesListFull;
        this.cdr.detectChanges();
  
          return;
        }
  
        this.CoursesList =  this.CoursesListFull.filter(x=> x.courseCode.toLowerCase().includes(this.searchQuery.toLowerCase()));
        this.cdr.detectChanges();
      }

      
      openModal(content,obj=null){
        this.newObjSuccess = false;
        this.newObjFailure = false;
        this.modalSuccess = false;
        this.modalFailure = false;
        
         this.modalObj = {};
         this.modalObjUpdate = {};
         this.modalTitle='';

         if(obj !== null){
           this.modalObjUpdate = {...obj};
           this.modalTitle = obj.courseCode;
         }

          this.modalService.open(content, {
            size: "lg",
            centered: true,
          });
      }

      addNew(){
        
        this.dataService.addClass(this.modalObj).subscribe(
        (response:any) => {
            
            this.newObjSuccess = true;
            this.newObjFailure = false;
            this.loadCourses();
        },
            (error) => {
        
            this.newObjFailure = true;
            this.newObjSuccess = false;
        });
      }


      
      update(toDelete = false){
        

        if(toDelete){
          this.modalObjUpdate.isDeleted = true;
        }

        this.dataService.updateClass(this.modalObjUpdate).subscribe(
        (response:any) => {
            
            this.modalSuccess = true;
            this.modalFailure = false;
            this.loadCourses();
        },
            (error) => {
        
            this.modalSuccess = true;
            this.modalSuccess = false;
        });
      }

    ngOnDestroy() {
      }
}