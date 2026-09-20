export interface CloudinaryPhoto {
  id: string
  title: string
  caption: string
  category: 'events' | 'workshops' | 'team' | 'classes' | 'gallery'
  folder: string
  url: string
  width: number
  height: number
}

export const CLOUDINARY_GALLERY_PHOTOS: CloudinaryPhoto[] = [
  {
    id: 'club_group_photo',
    title: 'Coding Club Community',
    caption: 'Faculty coordinators and student members at Coding Club CUH annual meetup.',
    category: 'team',
    folder: 'codingclub/gallery/2026',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927155/codingclub/gallery/2026/club_group_photo.jpg',
    width: 1265,
    height: 581,
  },
  {
    id: 'cuh_team_2026',
    title: 'Core Student Team',
    caption: 'Student leadership and technical organizers behind club activities.',
    category: 'team',
    folder: 'codingclub/teams/members',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927153/codingclub/teams/members/cuh_team_2026.jpg',
    width: 3990,
    height: 2314,
  },
  {
    id: 'c_python_masterclass',
    title: 'C & Python Coding Masterclass',
    caption: 'Interactive peer-led programming lecture and problem-solving session.',
    category: 'classes',
    folder: 'codingclub/events/coding-class',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927154/codingclub/events/coding-class/c_python_masterclass.jpg',
    width: 1408,
    height: 768,
  },
  {
    id: 'fullstack_web_dev',
    title: 'Full-Stack Web Development Workshop',
    caption: 'Hands-on practical development bootcamp building real-world projects.',
    category: 'workshops',
    folder: 'codingclub/events/workshops',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927154/codingclub/events/workshops/fullstack_web_dev.jpg',
    width: 1408,
    height: 768,
  },
  {
    id: 'hackathon_session_1',
    title: 'Campus Hackathon 2026',
    caption: 'Teams collaborating and coding overnight to build innovative campus solutions.',
    category: 'events',
    folder: 'codingclub/gallery/2026',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927159/codingclub/gallery/2026/hackathon_session_1.jpg',
    width: 1500,
    height: 1000,
  },
  {
    id: 'coding_bootcamp_2',
    title: 'Hands-on Coding Lab',
    caption: 'Intensive algorithmic problem solving and logic-building lab session.',
    category: 'classes',
    folder: 'codingclub/gallery/2026',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927160/codingclub/gallery/2026/coding_bootcamp_2.jpg',
    width: 5988,
    height: 3992,
  },
  {
    id: 'workshop_hands_on_3',
    title: 'Modern Web Frameworks Workshop',
    caption: 'Exploring modern web architecture, state management, and deployment pipelines.',
    category: 'workshops',
    folder: 'codingclub/gallery/2026',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927199/codingclub/gallery/2026/workshop_hands_on_3.jpg',
    width: 5645,
    height: 3763,
  },
  {
    id: 'tech_talk_presentation_4',
    title: 'Tech Talk & Presentation',
    caption: 'Student-led tech seminar showcasing emerging tools and open-source ecosystems.',
    category: 'events',
    folder: 'codingclub/gallery/2026',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927201/codingclub/gallery/2026/tech_talk_presentation_4.png',
    width: 3089,
    height: 2080,
  },
  {
    id: 'media_coverage_dainik_bhaskar',
    title: 'Dainik Bhaskar Media Feature',
    caption: 'State newspaper coverage of Coding Club CUH achievements and innovations.',
    category: 'events',
    folder: 'codingclub/gallery/2026',
    url: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927156/codingclub/gallery/2026/media_coverage_dainik_bhaskar.jpg',
    width: 742,
    height: 760,
  },
]

export const CLOUDINARY_CAROUSEL_SLIDES = [
  {
    href: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927151/codingclub/teams/coordinators/dr_sunil_kumar.jpg',
    title: 'Dr. Sunil Kumar — Faculty Coordinator',
  },
  {
    href: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927151/codingclub/teams/coordinators/vice_chancellor.jpg',
    title: 'University Leadership Support',
  },
  {
    href: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927155/codingclub/gallery/2026/club_group_photo.jpg',
    title: 'Coding Club Members & Community',
  },
  {
    href: 'https://res.cloudinary.com/azzisskq/image/upload/v1789927156/codingclub/gallery/2026/media_coverage_dainik_bhaskar.jpg',
    title: 'Press & Media Recognition',
  },
]
