import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@app/environment';
import { UserFacade, UserState } from '@app/store/user';
import { GroupFacade, GroupState } from '@app/store/group';
import { TagFacade, TagState } from '@app/store/tag';
import { NoteFacade, NoteState } from '@app/store/note';

@NgModule({
  providers: [
    UserFacade,
    GroupFacade,
    TagFacade,
    NoteFacade
  ],
  imports: [
    NgxsModule.forRoot([
        UserState,
        GroupState,
        TagState,
        NoteState
      ],
      {
        developmentMode: !environment.production,
      }),
  ],
})
export class StoreModule {
}
