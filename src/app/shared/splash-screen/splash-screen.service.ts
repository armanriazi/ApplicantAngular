import { Injectable } from "@angular/core";

@Injectable()
export class SplashScreenService {

	private selector: string = '#splash-screen';

    public hide() {

        try {

          document.querySelector(this.selector).setAttribute('style', 'opacity: 0; transition: opacity 0.5s linear;');

            setTimeout(() => {

              document.querySelector(this.selector).setAttribute('style', "display: none;");
            }, 500);
        }
        catch (error) { }
    }

    public show() {

        try {

          document.querySelector(this.selector).setAttribute('style', "font-family: 'B Nazanin 22px', 'Nazanin', 'B Zar';");

        }
        catch (error) { }
    }
}
