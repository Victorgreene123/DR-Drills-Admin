import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, keywords }) => {
  const location = useLocation();

  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | DR-Drills Admin`;
    }

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (description) {
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph tags
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${title} | DR-Drills Admin`);
      }
    }

    if (description) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
    }

    // Update Twitter tags
    if (title) {
      let twitterTitle = document.querySelector('meta[property="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', `${title} | DR-Drills Admin`);
      }
    }

    if (description) {
      let twitterDescription = document.querySelector('meta[property="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
      }
    }
  }, [title, description, keywords, location.pathname]);

  return null;
};

export default MetaTags;

// Page-specific meta configurations
export const pageMetadata = {
  dashboard: {
    title: 'Dashboard',
    description: 'Overview of your DR-Drills platform with key metrics, user activity, revenue insights, and content performance analytics.',
    keywords: 'dashboard, analytics, overview, metrics, KPIs, platform statistics'
  },
  users: {
    title: 'User Management',
    description: 'Manage and monitor all users on the DR-Drills platform. View user details, subscription status, activity, and engagement metrics.',
    keywords: 'user management, users, students, accounts, user activity, subscriptions'
  },
  quizzes: {
    title: 'Quiz Management',
    description: 'Create, edit, and organize quizzes and quiz blocks. Monitor quiz performance, manage questions, and track student engagement.',
    keywords: 'quiz management, quizzes, questions, assessments, quiz blocks, testing'
  },
  lectures: {
    title: 'Lecture Management',
    description: 'Upload, organize, and manage lecture content. Create lecture blocks, track views, and monitor student progress through course materials.',
    keywords: 'lecture management, lectures, videos, courses, content, learning materials'
  },
  campaigns: {
    title: 'Campaign Management',
    description: 'Create and manage marketing campaigns, track performance, and monitor campaign effectiveness across your platform.',
    keywords: 'campaigns, marketing, promotions, campaign analytics, engagement'
  },
  subscriptions: {
    title: 'Subscription Management',
    description: 'Manage subscription plans, track revenue, monitor active subscriptions, and analyze subscription trends and performance.',
    keywords: 'subscriptions, revenue, pricing, subscription plans, payments, billing'
  },
  analytics: {
    title: 'Analytics & Insights',
    description: 'Comprehensive analytics dashboard with detailed insights on user behavior, content performance, revenue, and platform growth.',
    keywords: 'analytics, insights, reports, statistics, data analysis, performance metrics'
  },
  settings: {
    title: 'Settings',
    description: 'Configure platform settings, manage preferences, and customize your DR-Drills admin dashboard experience.',
    keywords: 'settings, configuration, preferences, admin settings, platform configuration'
  },
  login: {
    title: 'Admin Login',
    description: 'Secure login portal for DR-Drills administrators. Access your dashboard to manage the platform and monitor performance.',
    keywords: 'login, authentication, admin login, sign in, secure access'
  },
  forgotPassword: {
    title: 'Forgot Password',
    description: 'Reset your DR-Drills admin password securely. Enter your email to receive password reset instructions.',
    keywords: 'forgot password, password reset, account recovery, reset password'
  },
  resetPassword: {
    title: 'Reset Password',
    description: 'Create a new secure password for your DR-Drills admin account.',
    keywords: 'reset password, new password, password change, account security'
  }
};
