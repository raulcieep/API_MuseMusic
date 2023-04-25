import { Component, OnInit } from '@angular/core';
import {ref, Storage, uploadBytes} from "@angular/fire/storage";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.css']
})
export class UploadMusicComponent implements OnInit {

  constructor(private storage: Storage,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  upload($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const trackRef = ref(this.storage, `tracks/${file.name}`);

    uploadBytes(trackRef, file).then(response => console.log(response)).catch( error => console.log(error));

    console.log(file.id);

    this.router.navigateByUrl('/songs');
  }

}
