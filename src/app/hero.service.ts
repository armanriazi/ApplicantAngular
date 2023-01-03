import { Injectable, Inject, Optional } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_BASE_HREF } from "@angular/common";
import { MessageService } from "./shared";


@Injectable()
export class HeroService {
  heroesUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    @Optional() @Inject(APP_BASE_HREF) origin: string) {
    this.heroesUrl = `${origin}${this.heroesUrl}`;
  }
}
