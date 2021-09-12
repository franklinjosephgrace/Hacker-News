import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/service/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  formGroup: FormGroup;
  courses: any[] = [];
  
  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.formGroup = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      userid: [''],
    });
  }
  ngOnInit() {
    this.courseService.getCourses().subscribe((items) => {
      this.courses = items;
    });
  }
  saveCourse() {
       console.log(this.formGroup.value)
      this.courseService.saveCourse(this.formGroup.value).subscribe(result => {
        alert(this.courses)
        if(result) {
          this.courseService.getCourses().subscribe((items) => {
            this.courses = items;
            
          });
        }
      })
    
    
    console.log(this.formGroup.value)
  }
  editCourse(id: number) {
    this.courseService.getCourse(id).subscribe((item) => {
      this.formGroup.patchValue(item);
    });
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourse(id).subscribe((item) => {
      this.courseService.getCourses().subscribe((items) => {
        this.courses = items;
      });
    });
  }
  
}
