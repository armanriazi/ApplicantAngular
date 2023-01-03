import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloModule } from 'apollo-angular';
import {  HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache';
import { APOLLO_OPTIONS } from 'apollo-angular/tokens';


export function createApollo(httpLink: HttpLink) {
  return {    
    link: httpLink.create({ uri: 'http://172.18.4.19:8086/graphql' }),
    cache: new InMemoryCache(),
    
  };
}


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule

  ],
  exports: [
    CommonModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})

export class IgraphqlModule {}
