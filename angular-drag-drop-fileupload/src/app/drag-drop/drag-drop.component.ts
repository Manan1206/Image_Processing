import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { DragdropService } from "../dragdrop.service";
import { ClassifyService } from "../classify.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})

export class DragDropComponent implements OnInit {

  currentImages = [];
  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress: number = 0;
  prediction = [];
  isFileUploaded = false;
  isPredicting = false;
  isPredicted = false;

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dragdropService: DragdropService,
    public classifyService: ClassifyService
  ) {
    this.form = this.fb.group({
      avatar: [null]
    })
  }

  ngOnInit() { }

  classifyClothes() {
    this.isPredicting = true;
    console.log(this.currentImages)
    console.log(this.currentImages.length)
    this.classifyService.classifyClothes(this.currentImages[this.currentImages.length - 1])
    .subscribe(data => {
      if(this.prediction.length < this.currentImages.length)
      this.prediction.push({'prediction':data.name, 'name':this.currentImages[this.currentImages.length - 1]});
      console.log(this.prediction)
      this.isPredicting = false
      this.isPredicted = true
      this.isFileUploaded = false
    })
  }

  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj
    })

    this.form.get('avatar').updateValueAndValidity()

    // Upload to server
    this.dragdropService.addFiles(this.form.value.avatar)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            setTimeout(() => {
              this.fileArr.map((file) => {
                this.currentImages.push(file.item.name)
              });
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "File uploaded successfully!"
              this.isFileUploaded = true;
            }, 3000);
        }
      })
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
