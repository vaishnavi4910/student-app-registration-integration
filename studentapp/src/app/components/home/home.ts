import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// PrimeNG
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

interface Statistic {
  icon: string;
  value: string;
  label: string;
  color: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface Course {
  image: string;
  title: string;
  rating: string;
  students: string;
  tag?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Toolbar,
    Button,
    InputText,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  routes = {
    home: '/',
    courses: '/courses',
    about: '/about',
    successStories: '/success-stories',
    blog: '/blog',
    contact: '/contact',
    login: '/login',
    register: '/register'
  };

  statistics: Statistic[] = [
    {
      icon: 'pi pi-graduation-cap',
      value: '1000+',
      label: 'Online Courses',
      color: 'purple'
    },
    {
      icon: 'pi pi-user',
      value: '500+',
      label: 'Expert Instructors',
      color: 'green'
    },
    {
      icon: 'pi pi-users',
      value: '10K+',
      label: 'Students',
      color: 'orange'
    }
  ];

  benefits = [
    { icon: 'pi pi-shield', label: 'Lifetime Access' },
    { icon: 'pi pi-id-card', label: 'Certificate on Completion' },
    { icon: 'pi pi-headphones', label: '24/7 Support' },
    { icon: 'pi pi-clock', label: 'Learn at Your Pace' }
  ];

  features: Feature[] = [
    {
      icon: 'pi pi-briefcase',
      title: 'Expert-Led Courses',
      description: 'Learn from industry experts with real-world experience.',
      color: 'purple'
    },
    {
      icon: 'pi pi-code',
      title: 'Hands-on Projects',
      description: 'Build practical projects and strengthen your portfolio.',
      color: 'green'
    },
    {
      icon: 'pi pi-users',
      title: 'Flexible Learning',
      description: 'Learn anytime, anywhere at your own pace.',
      color: 'orange'
    },
    {
      icon: 'pi pi-headphones',
      title: 'Career Support',
      description: 'Get career guidance and job placement assistance.',
      color: 'blue'
    }
  ];

  courses: Course[] = [
    {
      image: 'assets/images/webdev.jpg',
      title: 'Web Development Bootcamp',
      rating: '4.8',
      students: '2.4K',
      tag: 'Bestseller'
    },
    {
      image: 'assets/images/pythonds.jpg',
      title: 'Python for Data Science',
      rating: '4.7',
      students: '1.8K'
    },
    {
      image: 'assets/images/uiuv.jpg',
      title: 'UI/UX Design Masterclass',
      rating: '4.9',
      students: '1.2K'
    }
  ];

  searchCourses(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    console.log('Search:', searchValue);
  }

  watchDemo(): void {
    console.log('Open the demo video here');
  }
}