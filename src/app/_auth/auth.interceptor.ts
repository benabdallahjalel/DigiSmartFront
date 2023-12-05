import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userAuthService: UserAuthService,
        private router:Router,private cookieService:CookieService) {}
    
      intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        
        
        if (req.headers.get('No-Auth') === 'True') {
          return next.handle(req.clone());
        }
        
        const token  = this.cookieService.get("Token");
        console.log(token);
        if(token != ""){
            
        req = this.addToken(req,token);
        }
        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse) => {
                    console.log(err.status);
                    if(err.status === 401 ) {
                        this.router.navigate(['/login']);
                    } else if(err.status === 403) {
                        this.router.navigate(['/forbidden']);
                    }
                   /* else if(err.status === 500){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Your session is expired please login again!',
                          })
                        this.userAuthService.clear();
                        this.router.navigate(['/login']);
                    }*/
                    return throwError("Some thing is wrong");
                }
            )
        );
      }
    
    
      private addToken(request:HttpRequest<any>, token:string) {
          return request.clone(
              {
                  setHeaders: {
                      Authorization : `Bearer ${token}`
                  }
              }
          );
      }
    

}