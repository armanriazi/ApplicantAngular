import { Injectable, OnDestroy } from "@angular/core";
import { Apollo } from 'apollo-angular/Apollo';
import { QueryRef } from 'apollo-angular';
import { Subject, BehaviorSubject, Observable, Subscription } from "rxjs";
import { ApolloQueryResult } from "apollo-client";
import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache';
import { queryRefresh } from "@angular/core/src/render3/query";
@Injectable()
export class MyApolloService implements OnDestroy  {
  //var rss: Subject<any> = new Subject<any>();
  _todos: BehaviorSubject<any> = new BehaviorSubject([]);
  todos: Observable<ApolloQueryResult<any>> = this._todos.asObservable();
  outSubscribe: Subscription;

  constructor(
    private apollo: Apollo
  ) {
  }

  callWithoutSubscribeQurey(variables: object, gql: any): Observable<any>  {
    try {
      
      var commentsQuery: QueryRef<any>;
      commentsQuery = this.apollo.watchQuery({
            query: gql,
            variables: variables
      });
      
      this.todos = commentsQuery.valueChanges;
      
      return this.todos;
    }
    catch (error) {
      console.log(error);
      commentsQuery.refetch().then(x => {
        this.todos = x.data;
        return this.todos;
      });
    }
  }
  callWithSubscribeQurey(variables: object, gql: any) {
    try {
      var output = {};
     
        var commentsQuery: QueryRef<any>;
      commentsQuery = this.apollo.watchQuery({
          query: gql,
          variables: variables
        });
        this.outSubscribe = commentsQuery.valueChanges.subscribe(x => {
          Object.assign(output, x.data);
          
        },
        err => console.log(err));      
      return output;
    }
    catch (error) {
      console.log(error);
      commentsQuery.currentResult();
      //this.clearCache();
    }
  }
  clearCache() {
    try {
      var c = this.apollo.getClient();
      c.cache.reset();
      if (this.outSubscribe != undefined)
        this.outSubscribe.unsubscribe();
      if (this._todos != undefined)
      this._todos.unsubscribe();
    }    
    catch(error) { console.log(error); }
  }
  ngOnDestroy() {
    this.clearCache();
  }
}
