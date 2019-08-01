import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

import { Observable } from 'rxjs';
import { ExampleService } from './services/example.service';
import { Example } from './model/example.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private dataSource = new MyDataSource(this.exampleService);
  private displayedColumns = [ 'firstName', 'lastName' ];

  constructor(private exampleService: ExampleService) {}

  private add() {
    const example = new Example('John', 'Smith');
    this.exampleService.addExample(example);
  }

}

export class MyDataSource extends DataSource<Example> {
  constructor(private exampleService: ExampleService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Example[] | ReadonlyArray<Example>> {
    return this.exampleService.getExamples();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.exampleService.getExamples().unsubscribe();
  }
}
