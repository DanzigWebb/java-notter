import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private doc: Document
  ) { }

  ngOnInit(): void {
  }

  setTheme(theme: string) {
    this.doc.querySelector('html')?.setAttribute('data-theme', theme)
  }

}
