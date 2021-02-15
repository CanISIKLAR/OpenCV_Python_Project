
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataSourceService } from "../../_Services/DataSource.service";
import * as XLSX from 'xlsx';


@Component({
    selector: 'app-AttendanceHistory',
    styleUrls: ['./AttendanceHistory.component.scss'],
    templateUrl: './AttendanceHistory.component.html',
})

export class AttendanceHistoryComponent implements OnInit, OnDestroy {
   
    isLoading=false;
    modalFailure = false;
    modalSuccess = false;

    coursesList=[];
    scheduleList=[];
    selectedSchedule;
    attendanceToDisplay=[];
    selectedCourse='0';
    fileName= 'ExcelSheet.xlsx';

    date;

    constructor(
        private modalService: NgbModal
        ,private dataService: DataSourceService
        ,private cdr: ChangeDetectorRef) { }
            
  

    ngOnInit(): void {
      this.date = new Date().toISOString().split("T")[0];
      this.loadCourses();

    }
      

    exportexcel(): void
    {


      this.fileName =  this.selectedSchedule.courseCode + '_'+ this.date+ '.xlsx'

      /* pass here the table id */
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
   
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   
      /* save to file */  
      XLSX.writeFile(wb, this.fileName);
   
    }

    loadCourses(){
        this.dataService.getAllCourses().subscribe((resp) => {
          this.coursesList = resp;
            if(this.coursesList.length!==0){
                this.selectedCourse = this.coursesList[0].id.toString();
                this.loadSchedulesForCourse();
            }

        }, error =>{
          // this.alertify.error(error);
        });
      }


      loadSchedulesForCourse(){

        if(this.selectedCourse === '0'){
              return;
          }

        this.dataService.getAllSchedulesByClassId(+this.selectedCourse).subscribe((resp) => {

          this.scheduleList = resp;
        }, error =>{
          // this.alertify.error(error);
        });
      }

      
     update(){
  
        this.dataService.UpdateSchedule(this.selectedSchedule).subscribe(res=>{

          this.modalFailure = false;
          this.modalSuccess = true;
          this.loadCourses();
          
        },
        err=>{
          

          this.modalFailure = true;
          this.modalSuccess = false;
  
        })
      }
  
      toggleAttendance(att){
          att.attended=!att.attended;
      }

      openScheduleDetails(content, obj){

        this.date = obj.date.split('T')[0];
        this.attendanceToDisplay = [];

        this.modalSuccess=false;
        this.modalFailure=false;
        
        this.selectedSchedule = { ...obj};
        
         this.attendaceUpdateDate();

          this.modalService.open(content, {
            size: "xl",
            centered: true,
            
          });
   
      }
      
      attendaceUpdateDate(){
        this.attendanceToDisplay = this.selectedSchedule.attendance.filter(x=>x.date.includes(this.date));
         this.cdr.detectChanges();
      }

    ngOnDestroy() {
      }
}