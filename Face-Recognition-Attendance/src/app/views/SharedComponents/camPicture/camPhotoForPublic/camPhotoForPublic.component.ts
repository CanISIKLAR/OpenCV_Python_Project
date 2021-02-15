import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy, Output, EventEmitter } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../../../environments/environment";


@Component({
    selector: 'app-camPhotoForPublic',
    styleUrls: ['./camPhotoForPublic.component.scss'],
    templateUrl: './camPhotoForPublic.component.html',
})

export class camPhotoForPublicComponent implements OnInit, OnDestroy {

     width = 720; // We will scale the photo width to this
     height = 560; // This will be computed based on the input stream

     @Input() student: any;

     @Output() updateStudentsInParent = new EventEmitter();

     streaming = false;

     video = null;
     canvas = null;
     photo = null;
     startbutton = null;
     localstream

     CurrentImage:any = '';

     workDone = false;

    //images uploader 
    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;

    
    ngOnInit(): void {
      this.startAttendance();
      this.initializeUploader();
    }
    initializeUploader() {
        
        
        this.uploader = new FileUploader({
          url:
            this.baseUrl +
            'student/' +
            // this.modalObjUpdate.id.toString() +
            // '5' +
            this.student.id+
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

            this.student.photos.push(photo);

            if(this.student.photos.length >=3){
                this.student.confirmed = true;
            }

            this.updateStudentsInParent.emit(true);

            // this.cdr.detectChanges();
  
            // this.loadUsers();
           
          }
        };
      }

    startAttendance(){
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.photo = document.getElementById('photo');
        this.startbutton = document.getElementById('startbutton');

        navigator.getUserMedia(
            {video: {} },
            stream => (this.video.srcObject = stream, this.localstream=stream),
            err => console.log(err)
        );

        //  this.video = video;

        this.video.addEventListener('play', () =>{

       
        });

        // this.startbutton.addEventListener('click', function(ev) {
        //     this.takepicture();
        //     ev.preventDefault();
        // }, false);

        this.clearphoto();

    }

    clearphoto() {
        var context = this.canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        var data = this.canvas.toDataURL('image/png');
        this.photo.setAttribute('src', data);
    }


    takepicture() {

        // this.updateStudentsInParent.emit(true);

        // note: the picture is taken and saved as 64base

        var context = this.canvas.getContext('2d');
        // if (this.width && this.height) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            context.drawImage(this.video, 0, 0, this.width, this.height);

            var data = this.canvas.toDataURL('image/png');
            this.CurrentImage = data;
            this.photo.setAttribute('src', data);
        // } else {
        //     this.clearphoto();
        // }
    }

    savePhoto(){

        let  base64 = this.CurrentImage;
        
        base64 =  base64.split('base64,')[1];
        const imageName = 'name.png';

        //converting the photo from base 64 to file
        const imageBlob = this.dataURItoBlob(base64);
        const imageFile = new File([imageBlob], imageName, { type: 'image/png' });


        
        const file = <File>imageFile;


        this.uploader.addToQueue([file], { autoUpload: true });
        this.uploader.uploadAll();
        this.workDone = true;
        // this.updateStudentsInParent.emit(true);

    }

    dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });    
        return blob;
     }


    ngOnDestroy() {
        if(this.video !== undefined){
            this.video.pause();
            this.video.src = '';
            this.localstream.getTracks()[0].stop();
        }
        // this.updateStudentsInParent.emit(true);
      }
}