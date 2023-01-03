import { Injectable } from "@angular/core";
import { GridSettings } from "../../shared";

@Injectable()
export class KendoStatePersistingService {
   public get<T>(token: string): T {
       const settings = localStorage.getItem(token);
       return settings ? JSON.parse(settings) : settings;
   }

   public set<T>(token: string, gridConfig: GridSettings): void {
       localStorage.setItem(token, JSON.stringify(gridConfig));
  }
 
}
