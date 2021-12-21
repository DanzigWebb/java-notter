import { Pipe, PipeTransform } from '@angular/core';
import { TagDto } from '@app/models';

@Pipe({
  name: 'searchTag',
  pure: true,
})
export class SearchTagPipe implements PipeTransform {

  transform(tags: TagDto[] = [], search = '', excludes: TagDto[] = []): TagDto[] {
    if (!search) {
      return tags;
    }

    search = search.toLowerCase();
    return tags.filter(t => t.name.toLowerCase().includes(search));
  }
}
