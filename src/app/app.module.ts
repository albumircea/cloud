import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowProductComponent } from './show-product/show-product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ShowOneProductComponent } from './show-one-product/show-one-product.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor} from './_helpers/error.Interceptor';
import {fakeBackendProvider} from './_helpers/fake-backend';
import {JwtInterceptor} from './_helpers/jwtInterceptor';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductFormComponent } from './product-form/product-form.component';
import { SmartCreateProductComponent } from './smart-create-product/smart-create-product.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { SmartUpdateProductComponent } from './smart-update-product/smart-update-product.component';
import { ShopingCartComponent } from './shopping-cart/shoping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowProductComponent,
    ShowOneProductComponent,
    ToolbarComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    ProductFormComponent,
    SmartCreateProductComponent,
    SmartUpdateProductComponent,
    ShopingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
