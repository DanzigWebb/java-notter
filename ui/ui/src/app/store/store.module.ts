import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UserFacade, UserState } from '@app/store/user';
import { GroupFacade, GroupState } from './group';
import { environment } from '@app/environment';
import { TagFacade, TagState } from '@app/store/tag';

@NgModule({
  providers: [
    UserFacade,
    GroupFacade,
    TagFacade,
  ],
  imports: [
    NgxsModule.forRoot([
        UserState,
        GroupState,
        TagState,
      ],
      {
        developmentMode: !environment.production,
      }),
  ],
})
export class StoreModule {
}
