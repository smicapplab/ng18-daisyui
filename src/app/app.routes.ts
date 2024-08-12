import { RouterModule, Routes } from '@angular/router';
import { AppDocumentation } from './documentation/documentation.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ExamplesComponent } from './examples/examples.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'docs', component: AppDocumentation },

  { path: 'examples', component: ExamplesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
