import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Example } from '../model/example.model';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private subject: BehaviorSubject<Example[]> = new BehaviorSubject([]);

  constructor(private electronService: ElectronService) {
    this.electronService.ipcRenderer.on('new-example-response', (event, data) => {
      console.log('received data', data);

      const valueList = this.subject.value;
      const entryToUpdate = valueList.find(x => x.id === data.id);
      entryToUpdate.firstName = data.firstName;

      const newList = [...valueList];
      this.subject.next(newList);
    });
  }

  public getExamples(): BehaviorSubject<Example[]> {
    return this.subject;
  }

  public addExample(example: Example) {
    const currentValue = this.subject.value;
    const newValue = [...currentValue, example];
    this.subject.next(newValue);

    this.electronService.ipcRenderer.send('new-example', example);
  }

}
