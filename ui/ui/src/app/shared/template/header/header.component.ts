import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { UserFacade } from '@app/store/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ = this.userFacade.state$;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private userFacade: UserFacade,
  ) { }

  ngOnInit(): void {
  }

  setTheme(theme: string) {
    this.doc.querySelector('html')?.setAttribute('data-theme', theme)
  }

}
