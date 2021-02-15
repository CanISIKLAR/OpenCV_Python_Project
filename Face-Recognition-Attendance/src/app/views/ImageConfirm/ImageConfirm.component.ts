import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { DataSourceService } from '../../_Services/DataSource.service';

@Component({
    selector: 'app-ImageConfirm',
    styleUrls: ['./ImageConfirm.component.scss'],
    templateUrl: './ImageConfirm.component.html',
})

export class ImageConfirmComponent implements OnInit {

    idToLoad = '';
    studentCode = '';
    uploader: FileUploader;
    hasBaseDropZoneOver = false;

    modalObjUpdate:any;

    baseUrl = environment.apiUrl;
    uploaderReady = false;

  constructor(
    private modalService: NgbModal
    ,private dataService: DataSourceService,
        private cdr: ChangeDetectorRef) { }
        
        
    ngOnInit(): void {

    }

    runSearch(keyCode) {
        if (keyCode === 13) this.loadSignleStudent();
      }

    loadSignleStudent(){

      this.dataService.getStudentBystdNumber(this.idToLoad).subscribe( response => {
            
            if(response != null && response.code === this.studentCode.trim()){
                this.modalObjUpdate = response;
                this.initializeUploader();
            } else{
                this.uploaderReady = false;
                alert('Wrong information');
            }

        }, 
        error => {
            this.uploaderReady = false;
            alert('Something went wrong, please try again later');
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
    
      initializeUploader() {
        
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
    
        this.uploaderReady = true;

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
  
            // this.loadUsers();
           
          }
        };
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
            //   this.loadUsers();
            },
            (error) => {
            }
          );
          
    }

    openModalPhoto(content,obj){
    
          
              this.modalService.open(content, {
                size: "lg",
                centered: true,
              });
           
        }

}