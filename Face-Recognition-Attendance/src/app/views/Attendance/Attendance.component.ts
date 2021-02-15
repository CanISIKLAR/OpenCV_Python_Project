
import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as faceapi from 'face-api.js';
import { Stream } from 'stream';
import { DataSourceService } from "../../_Services/DataSource.service";
import * as XLSX from 'xlsx';

// import '@tensorflow/tfjs-node';
// import '@tensorflow/tfjs-node-gpu';

@Component({
    selector: 'app-Attendance',
    styleUrls: ['./Attendance.component.scss'],
    templateUrl: './Attendance.component.html',
})

export class AttendanceComponent implements OnInit, OnDestroy {
   
    constructor(
        private modalService: NgbModal
        ,private dataService: DataSourceService,
        private cdr: ChangeDetectorRef) { }
            
    video;
    faces = 0;
    faceMatcher: any = {};
    LabeledFaceDescriptors: any = {};
    localstream;
    interval;
    timer = 0;
    countDownCurrent = '5';
    countDownOptions=[
        '5',
        '10',
        '30',
        '60'
    ]

    fileName= 'ExcelSheet.xlsx';

    canStartAttendance = false;
    students =[];
    Allstudents =[];
    Attendedstudents =[];

    loadingFinished = false;

    selectedCourse='0';
    CoursesList = [];

    scheduleToSend:any = {};
    schdeuleSubmit = false;

    isLoading=false;
    modalSuccess=false;
    modalFailure=false;

    ngOnInit(): void {
        this.loadFaceAPI();
        this.loadCourses();
    }
    
    exportexcel(): void
    {

        this.scheduleToSend;

        const courseIndex = this.CoursesList.findIndex(x=> x.id === this.scheduleToSend.classId);
        const courseToSend = this.CoursesList[courseIndex];
        const DateToSend = new Date().toISOString().split("T")[0];

         this.fileName =  courseToSend.courseCode + '_' + DateToSend + '.xlsx'

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
        this.dataService.getAllCourses().subscribe((res) => {
            
          this.CoursesList = res;
          
          if(this.CoursesList.length!==0){
            this.selectedCourse = this.CoursesList[0].id.toString();
        }

        }, error =>{
          // this.alertify.error(error);
        });
      }

    loadFaceAPI(){
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('assets/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('assets/models'),

        // ]).then(this.startVideo);
        // ]).then(() => this.startVideo());
        ]).then(() => {
            this.loadingFinished = true;
            this.cdr.detectChanges();
        });

    }

    async setMatcher() {
        
        
        this.loadingFinished = false;

        // get teh images of the student that we want to match with
    //    await this.loadStudents();
       await this.loadStudentsForSelectedClass();

        this.LabeledFaceDescriptors = await this.loadLabeledImagesAPI();

        
        if(this.LabeledFaceDescriptors.length ===0){
        this.canStartAttendance = false;
        this.loadingFinished = true;
        return;
        }
        // the face matcher that will detect the faces matched
        // 0.6 ==> 60% the minimum matching percentage
        this.faceMatcher = new faceapi.FaceMatcher(this.LabeledFaceDescriptors,0.6);
        this.canStartAttendance = true;
        this.loadingFinished = true;
        this.cdr.detectChanges();
    }


    startAttendance(){
        // how long is the attendance
        // this.timer = 10*60;
        

        this.timer = 10* (+this.countDownCurrent);
        this.video = document.getElementById('video');

        navigator.getUserMedia(
            {video: {} },
            stream => (this.video.srcObject = stream, this.localstream=stream),
            err => console.log(err)
        );

        //  this.video = video;

        this.video.addEventListener('play', () =>{

            // the styling and positioning of the square around the face
            const canvas = faceapi.createCanvasFromMedia(this.video);
            document.getElementById('videoContainer').append(canvas);

            const displaySize = { width: this.video.width , height: this.video.height};
            faceapi.matchDimensions(canvas, displaySize);

            // interval to be repeated every 100 ms
          this.interval =  setInterval(async () => {
              // detect faces in the image
                const detections = await faceapi.detectAllFaces(this.video,
                    new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    // .withFaceExpressions()
                    .withFaceDescriptors();

                    // clear the old canvas before drawing the new one so we don't draw one on top of the other
                     const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width , canvas.height);
            canvas.style.position = 'absolute';
            // canvas.style.top = '140px';
            // canvas.style.left = '0px';

            // find the best match from the images that we loaded, that should be also above 60%
            const results = resizedDetections.map(d => this.faceMatcher.findBestMatch(d.descriptor))

            results.forEach((result, i) => {

                // alert('i found ' + result.label);

                let drawBox;

                const box = resizedDetections[i].detection.box;

                // if there is a result add the name to the canvas labelm other than that just displat unkown


                if (result.toString().includes('unknown')) {
                //   drawBox = new faceapi.draw.DrawBox(box, {label: result.toString(), boxColor: '#ff0000' })
                drawBox = new faceapi.draw.DrawBox(box, {label: result.label, boxColor: '#ff0000' });
                 
                } else {
                //   drawBox = new faceapi.draw.DrawBox(box, {label: result.toString()} )
                drawBox = new faceapi.draw.DrawBox(box, {label: result.label } );
                 
                }

                drawBox.draw(canvas);
                
                if(!this.Attendedstudents.some(x=>x===result.label)){
                    this.Attendedstudents.push(result.label);
                }

            });

            this.timer = this.timer > 0 ? --this.timer : this.timer;
            
            // faceapi.draw.drawDetections(canvas, resizedDetections);
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            // console.log(detections);
            // console.log(detections.length);
            // this.faces = detections.length;
            // this.faces = this.timer;
            this.faces =  Math.ceil( this.timer/10);

            
            // this.timer--;
            if(this.timer === 0)
            {
             this.stopAttendance(true);
            }
                }, 100);
        });
    }

    stopAttendance(finished = false){
        
        if(this.video !== undefined){
            this.video.pause();
            this.video.src = '';
            this.localstream.getTracks()[0].stop();
            clearInterval(this.interval);
        }

        if(finished){
            this.constructAttendanceSchedule();
        }

        // this.cdr.detectChanges();
    }


    async loadLabeledImagesAPI(){
        // array of the students

            // const labels = ['Amro','ibra','boss kasem','sami','Samer'];

            
            const hfa = this.students;
            return Promise.all(this.students.map(async std => {
              let descriptions = [];
              // 2 here referes to the number of images --> later should be set to the length of the student's images array
              for (let i = 0; i <= 2; i++) {
                // const img = await faceapi.fetchImage(`http://localhost:4206/assets/Students/${label}/${i}.jpg`);
               
                const img = await faceapi.fetchImage(std.photos[i].url);
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                
                if(detections !== undefined){
                    descriptions.push(detections.descriptor);
                }
              }
              return new faceapi.LabeledFaceDescriptors(std.studentNumber,descriptions);
            })
            );
      
    }

 
    async loadStudents(){

            return new Promise((resolve, reject) => {
           
                this.dataService.getConfirmedStudents().subscribe(
                response => {
                    
                    this.students=response;
                   resolve(true);
        
                },error => {
        
                    reject(false);
               }
             );
        
           });
      
    }

    async loadStudentsForSelectedClass(){

        
        return new Promise((resolve, reject) => {
       
            this.dataService.getAllStudentsForClass(+this.selectedCourse).subscribe(
            response => {
                
                this.Allstudents=response;
                this.students=response.filter(x=>x.confirmed);
               resolve(true);
    
            },error => {
    
                reject(false);
           }
         );
    
       });
  
}

    
    async loadLabeledImages(){
        // array of the students
        const labels = ['Amro','ibra','boss kasem','sami','Samer'];

        
        return Promise.all(labels.map(async label => {
          let descriptions = [];
          // 2 here referes to the number of images --> later should be set to the length of the student's images array
          for (let i = 1; i <= 2; i++) {
            const img = await faceapi.fetchImage(`http://localhost:4206/assets/Students/${label}/${i}.jpg`);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            descriptions.push(detections.descriptor)
          }
          return new faceapi.LabeledFaceDescriptors(label,descriptions);
        })
        );
    }

    imageUpload(){
        const imageUpload:any = document.getElementById('imageUpload');
        const container = document.createElement('div');
        container.style.position = 'relative';
        document.getElementById('imgContainer').append(container);

        imageUpload.addEventListener('change', async () => {
            const image = await faceapi.bufferToImage(imageUpload.files[0]);
            document.body.append(image);
            document.getElementById('imgContainer').append(image);
            const displaySize = { width: image.width, height: image.height};
            // faceapi.matchDimensions(canvas, displaySize);
            const detections: any = await faceapi.detectAllFaces(image)
            .withFaceLandmarks().withFaceDescriptors();
            

            // document.body.append(detections.length);
            
        });
    }

    constructAttendanceSchedule(){
        

        this.scheduleToSend.classId = +this.selectedCourse;
        this.scheduleToSend.staffId = 0;

        this.scheduleToSend.attendance =[];

        for (const std of this.Allstudents){
            const attended = this.Attendedstudents.some(x=>x === std.studentNumber);

            const att = {
                studentsId:std.id,
                attended:attended,

                studentName:std.name,
                studentSurname:std.surname,
                studentNumber:std.studentNumber,

            }

            this.scheduleToSend.attendance.push(att);
        }

        this.schdeuleSubmit = true;
        // this.cdr.detectChanges();
    }

    saveSchedule(){
        this.dataService.AddScheduleToClass(this.scheduleToSend).subscribe( res => {
            this.modalFailure=false;
            this.modalSuccess=true;
            
        },
        err => {
            
            this.modalFailure=true;
            this.modalSuccess=false;
        })
    }

    toggleAttendance(att){
        att.attended=!att.attended;
    }


    openScheduleDetails(content, obj){

        this.modalSuccess=false;
        this.modalFailure=false;

        
        // this.selectedSchedule = { ...obj};

          this.modalService.open(content, {
            size: "xl",
            centered: true,
          });
   
      }

      returnCount(n){
       return Math.ceil(n/10);
      }

    ngOnDestroy() {
        this.stopAttendance();
      }
}