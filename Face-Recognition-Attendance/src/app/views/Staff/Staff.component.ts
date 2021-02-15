
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../_Services/auth.service";
import { DataSourceService } from "../../_Services/DataSource.service";


@Component({
    selector: 'app-Staff',
    styleUrls: ['./Staff.component.scss'],
    templateUrl: './Staff.component.html',
})

export class StaffComponent implements OnInit, OnDestroy {
   
    searchQuery=''
    staffList =[];
    staffListFull =[];
    stdList=[];

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


    constructor(
        private modalService: NgbModal
        ,private dataService: DataSourceService
        ,private authService:AuthService
        ,private cdr: ChangeDetectorRef) { }
            
  

    ngOnInit(): void {
        this.loadUsers();
    }


    loadUsers(){
        this.dataService.getAllStaffs().subscribe((staff) => {
  debugger
          this.staffListFull = staff;
          this.staffList = staff;
        }, error =>{
          console.log(error);
        });
      }



      addNew(){
        debugger;

        this.modalObj.role = "Proff"
       
        this.authService.register(this.modalObj).subscribe(
          (response:any) => {

          this.newUserSuccess = true;
          this.newUserFailure = false;
          this.loadUsers();


          },
          (error) => {
          this.newUserFailure = true;
          this.newUserSuccess = false;
          console.log(error);
          });
    }


       update(){

        
  
        if(this.untouchedModalObjUpdate.name === this.modalObjUpdate.name
          && this.untouchedModalObjUpdate.surname === this.modalObjUpdate.surname
          && this.untouchedModalObjUpdate.username === this.modalObjUpdate.username){
          this.newUserFailure = false;
          this.newUserSuccess = true;
          return;
        }
  
        this.dataService.updateStaff(this.modalObjUpdate).subscribe(res=>{
          this.newUserFailure = false;
          this.newUserSuccess = true;
          this.loadUsers();
          
        },
        err=>{
          this.newUserFailure = true;
          this.newUserSuccess = false;
        })
      }


      
      updatePasswordForStaff(){

        if(this.modalObjUpdate.password ==''){
          this.newUserFailure = true;
          return;
        }
        
        this.dataService.updateStaffPassword(this.modalObjUpdate).subscribe(res=>{
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
    
        this.dataService.updateStaff(this.modalObjUpdate).subscribe(
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


      openModal(content,obj=null){
        this.newUserSuccess = false;
        this.newUserFailure = false;
        this.modalSuccess = false;
        this.modalFailure = false;
  
        debugger ;

         this.modalObj = {};
  
         if(obj !== null)
         {
            this.modalObjUpdate = {...obj};
            this.untouchedModalObjUpdate = {...obj};
  
         } 
         
            this.modalService.open(content, {
              size: "lg",
              centered: true,
            });
         
      }

      openDeleteModal(content,obj){

        this.modalTitle = obj.name +' '+ obj.surname;
        this.newUserSuccess = false;
        this.newUserFailure = false;
        this.modalSuccess = false;
        this.modalFailure = false;
  
            this.modalObjUpdate = {...obj};
          
            this.modalService.open(content, {
              size: "lg",
              centered: true,
            });
         
      }

    applySearch(){

      if(this.searchQuery===''){
        this.staffList = this.staffListFull;
      this.cdr.detectChanges();

        return;
      }

      this.staffList =  this.staffListFull.filter(x=> x.studentNumber.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.cdr.detectChanges();
    }

    runSearch(keyCode) {
      if (keyCode === 13) this.applySearch();
    }

    ngOnDestroy() {
      }
}