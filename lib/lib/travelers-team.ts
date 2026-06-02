export type TravelersTeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageAlt: string;
  socials: Array<{ label: string; href: string }>;
};

export const travelersTeamSourceUrl = 'https://vietnamtravelers.com/about-us-2/';

export const travelersTeam: TravelersTeamMember[] = [
  {
    slug: 'cris-le',
    name: 'Cris Le',
    role: 'Founder, CEO',
    bio: "Cris Le, hails from a humble rural background in central Vietnam. After migrating to Hanoi for education and life experiences, Cris's love for nature and the homeland sparked a transformative journey across Vietnam by bicycle. This odyssey from Ha Giang to Mui Ca Mau ignited a passion for tourism, particularly Vietnamese tourism. Driven by the dream of bringing Vietnam's allure to the world stage, Cris now aids approximately 30,000 guests annually in discovering the enchanting landscapes and culture of Vietnam. Cris's ultimate aspiration is to foster a love for this beautiful land and its people, contributing to a sustainable tourism community right in the place of birth.",
    image: '/images/team/cris-le.jpg',
    imageAlt: 'Cris Le on a bicycle journey in Ca Mau, Vietnam',
    socials: [
      { label: 'Facebook', href: 'https://www.facebook.com/sunriverside.sanglevan' },
      { label: 'Instagram', href: 'https://www.instagram.com/vietnam_travelers/' }
    ]
  },
  {
    slug: 'hieu-le',
    name: 'Hieu Le',
    role: 'Accountant',
    bio: 'Hieu Le manages the financial aspects of the company. Her meticulous attention to detail ensures accurate financial records, budgeting, and financial planning.',
    image: '/images/team/hieu-le.jpg',
    imageAlt: 'Portrait of Hieu Le from the Vietnam Travelers team',
    socials: []
  },
  {
    slug: 'tam-pham',
    name: 'Tam Pham',
    role: 'Marketing Executive',
    bio: 'Tam Pham is responsible for promoting Vietnam travelers through effective marketing campaigns. She leverages digital channels, social media, and partnerships to attract travelers and build brand awareness.',
    image: '/images/team/tam-pham.jpg',
    imageAlt: 'Tam Pham with travelers in Hanoi',
    socials: []
  },
  {
    slug: 'huyen-nguyen',
    name: 'Huyen Nguyen',
    role: 'Head of Sales Department',
    bio: 'Huyen Nguyen leads the sales team, driving revenue growth and client acquisition. His expertise in travel sales and customer relationship management ensures successful partnerships with clients.',
    image: '/images/team/huyen-nguyen.jpg',
    imageAlt: 'Portrait of Huyen Nguyen from the Vietnam Travelers team',
    socials: []
  },
  {
    slug: 'sang-le',
    name: 'Sang Le',
    role: 'Contracting Manager',
    bio: 'Sang Le negotiates contracts with hotels, airlines, and other travel service providers. Her role is crucial in securing competitive rates and ensuring high-quality services for travelers.',
    image: '/images/team/sang-le.jpg',
    imageAlt: 'Portrait of Sang Le from the Vietnam Travelers team',
    socials: []
  },
  {
    slug: 'phuong-nguyen',
    name: 'Phương Nguyen',
    role: 'Head of HR & Finance',
    bio: 'Phương Nguyen oversees human resources and financial management. She ensures a positive work environment, handles staffing needs, and manages payroll, benefits, and compliance.',
    image: '/images/team/phuong-nguyen.jpg',
    imageAlt: 'Portrait of Phương Nguyen from the Vietnam Travelers team',
    socials: []
  }
];

export function teamProfilePath(member: Pick<TravelersTeamMember, 'slug'>) {
  return `/blog/team/${member.slug}/`;
}

export function findTravelersTeamMember(slug: string) {
  return travelersTeam.find((member) => member.slug === slug) ?? null;
}
