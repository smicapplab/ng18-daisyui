import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule],
  providers: [UserProfileService],
})
export class AppNavbar implements OnInit {
  user: any;

  constructor(private userProfileService: UserProfileService) {}
  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((data) => {
      this.user = data.results[0];
    });
  }

  title: string = 'Project Template';
  navigation: { name: string; href: string }[] = [
    { name: 'Home', href: '/' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Examples', href: '/examples' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];
}
