import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPersonComponent } from "./add-person/add-person.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "add-person", component: AddPersonComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
