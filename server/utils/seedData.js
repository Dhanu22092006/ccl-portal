require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const CCL = require('../models/CCL');
const Story = require('../models/Story');
const User = require('../models/User');

const cclsData = [
  {
    slug: 'juhu-moragaon',
    name: 'Juhu Moragaon Community Co-Creation Lab',
    shortName: 'Juhu Moragaon CCL',
    tagline: 'A Fishing Village. A Living Heritage.',
    location: { city: 'Mumbai', district: 'Mumbai Suburban', state: 'Maharashtra', coordinates: { lat: 19.1073, lng: 72.8263 } },
    theme: { primaryColor: '#0B4F6C', secondaryColor: '#20BF55', accentColor: '#F5A623' },
    status: 'active',
    order: 1,
    description: 'Juhu Moragaon Koliwada is a traditional fishing settlement on Mumbai\'s northern Juhu coastline, home to the Mangela Koli fishing community whose heritage dates back to the 12th century. This CCL documents, celebrates, and preserves their living culture, spatial history, and maritime identity.',
    about: {
      legacy: 'The Juhu Moragaon Machhimar Vividha Karyakari Sahakari Sanstha Ltd. represents the traditional fishing community of Juhu Moragaon, Mumbai. For generations, our families – the Mangela Koli and other fisherfolk – have lived along the western coast, contributing to the city\'s food security, culture, and maritime heritage. Fishing is not just our livelihood; it is our identity.',
      vision: 'We seek sustainable self-development rooted in our traditions and rights. Protecting Koliwadas is not just about housing – it is about preserving Mumbai\'s coastal heritage, ensuring livelihood security, and safeguarding the environment.',
      mission: 'To document, celebrate, and preserve the living culture, spatial history, and maritime identity of Juhu Moragaon Koliwada through community-led research, digital archiving, and advocacy.',
    },
    team: [
      { name: 'Research Team', role: 'Documentation & Oral History', bio: 'Dedicated researchers documenting the community\'s living heritage.' },
      { name: 'Community Advocates', role: 'Rights & Advocacy', bio: 'Community members fighting for land rights and housing.' },
      { name: 'Photography Team', role: 'Visual Documentation', bio: 'Capturing the daily life, culture, and environment of Moragaon.' },
    ],
    collaborators: [
  { name: 'Juhu Moragaon Machhimar Sahakari Sanstha', type: 'Community / Partner' },
  { name: 'Maharashtra Fisheries Department', type: 'Community / Partner' }
],
    contactInfo: {
      email: 'juhu@ccl-portal.org',
      phone: '+91-22-0000-0000',
      address: 'Juhu Moragaon Koliwada, Juhu, Mumbai – 400049',
      socialMedia: { instagram: 'https://instagram.com/juhumoragaon', facebook: 'https://facebook.com/juhumoragaon' },
    },
    menu: [
      { label: 'Home', slug: '', icon: 'home', isPublic: true, subItems: [] },
      {
        label: 'Discover Moragaon', slug: 'discover', icon: 'map', isPublic: true,
        subItems: [
          { label: 'Where is Mora Gaon?', slug: 'location', isPublic: true },
          { label: 'Who Lives Here?', slug: 'community', isPublic: true },
          { label: 'History', slug: 'history', isPublic: true },
          { label: 'Timeline', slug: 'timeline', isPublic: true },
        ],
      },
      {
        label: 'Life by the Sea', slug: 'life-at-sea', icon: 'anchor', isPublic: true,
        subItems: [
          { label: 'A Day in the Life of a Fisherman', slug: 'day-in-life', isPublic: true },
          { label: 'Fishing Techniques', slug: 'techniques', isPublic: true },
          { label: 'Boats', slug: 'boats', isPublic: true },
          { label: 'Nets', slug: 'nets', isPublic: true },
          { label: 'Fishing Calendar', slug: 'calendar', isPublic: true },
          { label: 'Fish of Mora Gaon', slug: 'fish', isPublic: true },
        ],
      },
      {
        label: 'From Sea to Market', slug: 'sea-to-market', icon: 'shopping', isPublic: true,
        subItems: [
          { label: 'Journey of the Catch', slug: 'journey', isPublic: true },
          { label: 'Fisherwomen', slug: 'fisherwomen', isPublic: true },
          { label: 'Fish Markets', slug: 'markets', isPublic: true },
          { label: 'Economics of Fishing', slug: 'economics', isPublic: true },
        ],
      },
      {
        label: 'Culture', slug: 'culture', icon: 'culture', isPublic: true,
        subItems: [
          { label: 'Food', slug: 'food', isPublic: true },
          { label: 'Festivals', slug: 'festivals', isPublic: true },
          { label: 'Traditions', slug: 'traditions', isPublic: true },
          { label: 'Language', slug: 'language', isPublic: true },
          { label: 'Music', slug: 'music', isPublic: true },
          { label: 'Religion', slug: 'religion', isPublic: true },
        ],
      },
      {
        label: 'People', slug: 'people', icon: 'users', isPublic: true,
        subItems: [
          { label: 'Community Stories', slug: 'stories', isPublic: true },
          { label: 'Meet the Fisherfolk', slug: 'fisherfolk', isPublic: true },
          { label: 'Women of Mora Gaon', slug: 'women', isPublic: true },
          { label: 'Three Generations', slug: 'generations', isPublic: true },
          { label: 'Youth Voices', slug: 'youth', isPublic: true },
        ],
      },
      {
        label: 'The Village', slug: 'village', icon: 'building', isPublic: true,
        subItems: [
          { label: 'Interactive Map', slug: 'map', isPublic: true },
          { label: 'Architecture', slug: 'architecture', isPublic: true },
          { label: 'Community Spaces', slug: 'spaces', isPublic: true },
          { label: 'Then & Now', slug: 'then-now', isPublic: true },
          { label: 'Mangroves', slug: 'mangroves', isPublic: true },
        ],
      },
      {
        label: 'Sea & Environment', slug: 'environment', icon: 'leaf', isPublic: true,
        subItems: [
          { label: 'Marine Life', slug: 'marine-life', isPublic: true },
          { label: 'Pollution', slug: 'pollution', isPublic: true },
          { label: 'Changing Coastline', slug: 'coastline', isPublic: true },
          { label: 'Fishermen\'s Observations', slug: 'observations', isPublic: true },
        ],
      },
      {
        label: 'Moragaon Today', slug: 'today', icon: 'today', isPublic: true,
        subItems: [
          { label: 'Education', slug: 'education', isPublic: true },
          { label: 'New Occupations', slug: 'occupations', isPublic: true },
          { label: 'Challenges', slug: 'challenges', isPublic: true },
          { label: 'Future', slug: 'future', isPublic: true },
        ],
      },
      {
        label: 'Gallery', slug: 'gallery', icon: 'photo', isPublic: true,
        subItems: [
          { label: 'Photographs', slug: 'photos', isPublic: true },
          { label: 'Videos', slug: 'videos', isPublic: true },
          { label: 'Sounds of Mora Gaon', slug: 'sounds', isPublic: true },
        ],
      },
      { label: 'Oral History Archive', slug: 'oral-history', icon: 'archive', isPublic: true, subItems: [] },
      { label: 'Visit / Learn More', slug: 'visit', icon: 'info', isPublic: true, subItems: [] },
      {
        label: 'About', slug: 'about', icon: 'about', isPublic: true,
        subItems: [
          { label: 'About Us', slug: 'about-us', isPublic: true },
          { label: 'How to Reach', slug: 'how-to-reach', isPublic: true },
          { label: 'Contact Us', slug: 'contact', isPublic: true },
          { label: 'Meet the Team', slug: 'team', isPublic: true },
        ],
      },
    ],
    stats: [
      { label: 'Years of Heritage', value: '800+', unit: '', icon: 'clock' },
      { label: 'Fishing Families', value: '500+', unit: 'families', icon: 'users' },
      { label: 'Fish Species', value: '50+', unit: 'species', icon: 'fish' },
      { label: 'Marine Production (MH)', value: '4,63,758', unit: 'metric tonnes', icon: 'chart' },
    ],
    importantLinks: [
      { title: 'CRZ Notification 2011', url: 'https://moef.gov.in', description: 'Coastal Regulation Zone guidelines', category: 'Policy' },
      { title: 'Maharashtra Fisheries Act', url: 'https://fisheries.maharashtra.gov.in', description: 'State fisheries regulation', category: 'Policy' },
      { title: 'Koliwada Housing GR', url: '#', description: 'Government resolution on Koliwada housing', category: 'Policy' },
    ],
  },
  {
    slug: 'thane',
    name: 'Thane Solid Waste Management Community Co-Creation Lab',
    shortName: 'Thane SWM CCL',
    tagline: 'Zero Waste Thane – Together We Can',
    location: { city: 'Thane', district: 'Thane', state: 'Maharashtra', coordinates: { lat: 19.2183, lng: 72.9781 } },
    theme: { primaryColor: '#2D6A4F', secondaryColor: '#74C69D', accentColor: '#F4A261' },
    status: 'active',
    order: 2,
    description: 'The Thane SWM CCL focuses on building a zero-waste community through grassroots participation, data-driven waste management, and coalition-building among citizens, waste-pickers, and government bodies. Working with Stree Mukti Sanghatna and Samartha Bharat.',
    about: {
      legacy: 'Thane CCL brings together citizens, waste-pickers, health workers, societies, and government to co-create a sustainable solid waste management system for Thane city.',
      vision: 'A Zero Waste Thane where every citizen is aware, every society segregates, and every waste-picker is respected and supported.',
      mission: 'To document waste management challenges, amplify waste-picker voices, build community capacity for segregation, and create data-driven solutions for Thane\'s SWM challenges.',
    },
   collaborators: [
  { name: 'Stree Mukti Sanghatna', type: 'Community / Partner' },
  { name: 'Samartha Bharat', type: 'Community / Partner' },
  { name: 'Thane Municipal Corporation', type: 'Community / Partner' }
],
    contactInfo: {
      email: 'thane@ccl-portal.org',
      address: 'Thane, Maharashtra',
      socialMedia: { instagram: 'https://instagram.com/zerowestethane' },
    },
    menu: [
      { label: 'About CCL', slug: 'about', icon: 'info', isPublic: true, subItems: [] },
      { label: 'Team', slug: 'team', icon: 'users', isPublic: true, subItems: [] },
      { label: 'Survey Results', slug: 'surveys', icon: 'chart', isPublic: true, subItems: [] },
      { label: 'Data Dashboard', slug: 'dashboard', icon: 'dashboard', isPublic: true, subItems: [] },
      { label: 'Concerns Dashboard', slug: 'concerns', icon: 'alert', isPublic: true, subItems: [] },
      { label: 'Success Stories', slug: 'stories', icon: 'star', isPublic: true, subItems: [] },
      { label: 'Join the Movement', slug: 'pledge', icon: 'heart', isPublic: true, subItems: [] },
      { label: 'Society / Community Join', slug: 'join', icon: 'building', isPublic: true, subItems: [] },
      {
        label: 'Waste-picker & Health Worker Stories', slug: 'wastepickers', icon: 'people', isPublic: true,
        subItems: [
          { label: 'Stree Mukti Stories', slug: 'stree-mukti', isPublic: true },
          { label: 'Samartha Bharat Stories', slug: 'samartha-bharat', isPublic: true },
          { label: 'Health Worker Stories', slug: 'health-workers', isPublic: true },
        ],
      },
      {
        label: 'DIY Toolkit', slug: 'toolkit', icon: 'tools', isPublic: true,
        subItems: [
          { label: 'How to Segregate', slug: 'segregation', isPublic: true },
          { label: 'Journey of Waste', slug: 'waste-journey', isPublic: true },
          { label: 'Where to Contact', slug: 'contacts', isPublic: true },
          { label: 'Wet Waste Management', slug: 'wet-waste', isPublic: true },
          { label: 'Dry Waste Management', slug: 'dry-waste', isPublic: true },
        ],
      },
      {
        label: 'Awareness Resources', slug: 'resources', icon: 'download', isPublic: true,
        subItems: [
          { label: 'Digital Awareness Messages', slug: 'digital-messages', isPublic: true },
          { label: 'Printable Posters', slug: 'printable-posters', isPublic: true },
        ],
      },
      { label: 'Social Media Campaigns & Videos', slug: 'campaigns', icon: 'video', isPublic: true, subItems: [] },
      { label: 'Collaborators', slug: 'collaborators', icon: 'partners', isPublic: true, subItems: [] },
      { label: 'Important Links', slug: 'important-links', icon: 'link', isPublic: true, subItems: [] },
      { label: 'Contact', slug: 'contact', icon: 'mail', isPublic: true, subItems: [] },
    ],
    stats: [
      { label: 'Societies Engaged', value: '50+', unit: '', icon: 'building' },
      { label: 'Waste-Pickers Supported', value: '200+', unit: '', icon: 'users' },
      { label: 'Surveys Completed', value: '500+', unit: '', icon: 'chart' },
      { label: 'Tonnes Diverted', value: '2,000+', unit: 'tonnes/yr', icon: 'recycle' },
    ],
    importantLinks: [
      { title: 'SWM Rules 2016', url: '#', description: 'Solid Waste Management Rules, 2016', category: 'Policy' },
      { title: 'TMC Waste Portal', url: '#', description: 'Thane Municipal Corporation waste management portal', category: 'Government' },
    ],
  },
  {
    slug: 'nagaon-murbad',
    name: 'Nagaon Village, Murbad Community Co-Creation Lab',
    shortName: 'Nagaon Murbad CCL',
    tagline: 'Rooted in Nature, Growing Together',
    location: { city: 'Murbad', district: 'Thane', state: 'Maharashtra', coordinates: { lat: 19.2579, lng: 73.3986 } },
    theme: { primaryColor: '#6B4226', secondaryColor: '#A8763E', accentColor: '#D4A017' },
    status: 'coming-soon',
    order: 3,
    description: 'Nagaon Village CCL in Murbad documents geo-tagged local products, archaeological heritage, and community-led solutions for human-wildlife conflict in a tribal-rural setting.',
    about: {
      legacy: 'Nagaon is a tribal village in Murbad tehsil with rich cultural heritage, unique agri-food products, and biodiversity in its forests.',
      vision: 'A self-reliant village where traditional knowledge, geo-tagged products, and sustainable livelihoods flourish.',
      mission: 'Document government schemes, geo-tag local products, record archaeological details, and support wildlife conflict interventions.',
    },
    menu: [
      { label: 'About', slug: 'about', icon: 'info', isPublic: true, subItems: [] },
      { label: 'Survey Results', slug: 'surveys', icon: 'chart', isPublic: true, subItems: [] },
      { label: 'Government Schemes', slug: 'schemes', icon: 'government', isPublic: true, subItems: [] },
      { label: 'Geo-tagged Products', slug: 'products', icon: 'location', isPublic: true, subItems: [
        { label: 'Uri Papad', slug: 'uri-papad', isPublic: true },
        { label: 'Mirgund', slug: 'mirgund', isPublic: true },
      ] },
      { label: 'Archaeological Details', slug: 'archaeology', icon: 'archive', isPublic: true, subItems: [] },
      { label: 'Wildlife Conflict', slug: 'wildlife', icon: 'nature', isPublic: true, subItems: [] },
      { label: 'Contact', slug: 'contact', icon: 'mail', isPublic: true, subItems: [] },
    ],
    stats: [
      { label: 'Village Households', value: '120+', unit: '', icon: 'home' },
      { label: 'Geo-tagged Products', value: '2', unit: 'products', icon: 'tag' },
    ],
  },
  {
    slug: 'mahim-kelve-palghar',
    name: 'Mahim-Kelve Palghar Community Co-Creation Lab',
    shortName: 'Mahim-Kelve CCL',
    tagline: 'Ancient Stones, Living Seas, Future Together',
    location: { city: 'Kelve', district: 'Palghar', state: 'Maharashtra', coordinates: { lat: 19.6131, lng: 72.7093 } },
    theme: { primaryColor: '#0E6E8C', secondaryColor: '#2AB7CA', accentColor: '#E84855' },
    status: 'coming-soon',
    order: 4,
    description: 'Mahim-Kelve CCL in Palghar district documents biodiversity, historically important sites including petroglyphs, fishermen\'s livelihoods, ocean plastic cleaning, and plans for community-managed eco-tourism.',
    about: {
      legacy: 'Mahim and Kelve are coastal villages in Palghar with ancient petroglyphs, rich marine biodiversity, and a fishing community facing environmental and livelihood challenges.',
      vision: 'A model for community-managed eco-tourism that preserves heritage, supports fishermen, and protects the ocean.',
      mission: 'Document biodiversity and heritage, support fishermen in ocean plastic removal, develop eco-tourism with community ownership.',
    },
    menu: [
      { label: 'About', slug: 'about', icon: 'info', isPublic: true, subItems: [] },
      { label: 'Survey Results', slug: 'surveys', icon: 'chart', isPublic: true, subItems: [] },
      { label: 'Biodiversity', slug: 'biodiversity', icon: 'leaf', isPublic: true, subItems: [] },
      { label: 'Petroglyphs', slug: 'petroglyphs', icon: 'stone', isPublic: true, subItems: [] },
      { label: 'Ocean Plastic Cleaning', slug: 'ocean-plastic', icon: 'ocean', isPublic: true, subItems: [] },
      { label: 'Eco-tourism', slug: 'eco-tourism', icon: 'nature', isPublic: true, subItems: [
        { label: 'Register for Visit', slug: 'register', isPublic: true },
        { label: 'Plan Your Stay', slug: 'stay', isPublic: true },
        { label: 'Community Managed Slots', slug: 'slots', isPublic: true },
      ] },
      { label: 'Waste Management', slug: 'waste', icon: 'recycle', isPublic: true, subItems: [] },
      { label: 'Contact', slug: 'contact', icon: 'mail', isPublic: true, subItems: [] },
    ],
    stats: [
      { label: 'Petroglyphs Documented', value: '50+', unit: '', icon: 'stone' },
      { label: 'Fish Species', value: '80+', unit: '', icon: 'fish' },
    ],
  },
  {
    slug: 'ratnagiri-raigad',
    name: 'Ratnagiri / Raigad Community Co-Creation Lab',
    shortName: 'Ratnagiri-Raigad CCL',
    tagline: 'Biodiversity, Knowledge, Community',
    location: { city: 'Ratnagiri', district: 'Ratnagiri / Raigad', state: 'Maharashtra', coordinates: { lat: 17.0005, lng: 73.3119 } },
    theme: { primaryColor: '#7B2D8B', secondaryColor: '#C47FC0', accentColor: '#F9C74F' },
    status: 'coming-soon',
    order: 5,
    description: 'Ratnagiri/Raigad CCL focuses on documenting the Peoples Biodiversity Register (PBR), traditional knowledge of incense sticks from local flowers, and medicinal plant knowledge of coastal communities.',
    about: {
      legacy: 'Rich coastal districts with diverse flora, traditional healers, and unique livelihood practices including incense stick making from natural flowers.',
      vision: 'Preserving and leveraging traditional knowledge for sustainable, community-led livelihoods.',
      mission: 'Document PBR, map medicinal knowledge, support incense-stick livelihood, and ensure community IP protection.',
    },
    menu: [
      { label: 'About', slug: 'about', icon: 'info', isPublic: true, subItems: [] },
      { label: 'PBR', slug: 'pbr', icon: 'book', isPublic: true, subItems: [] },
      { label: 'Incense Sticks', slug: 'incense', icon: 'flower', isPublic: true, subItems: [] },
      { label: 'Medicinal Knowledge', slug: 'medicinal', icon: 'herb', isPublic: true, subItems: [] },
      { label: 'Contact', slug: 'contact', icon: 'mail', isPublic: true, subItems: [] },
    ],
    stats: [
      { label: 'Plant Species Documented', value: '200+', unit: '', icon: 'leaf' },
      { label: 'Traditional Healers', value: '15+', unit: '', icon: 'users' },
    ],
  },
  {
    slug: 'tbia',
    name: 'TBIA Community Co-Creation Lab – Industry-Academia Collaboration',
    shortName: 'TBIA CCL',
    tagline: 'GRI Sustainability · Carbon Accounting · Future-Ready',
    location: { city: 'Thane', district: 'Thane', state: 'Maharashtra' },
    theme: { primaryColor: '#1E3A5F', secondaryColor: '#2E86AB', accentColor: '#A23B72' },
    status: 'coming-soon',
    order: 6,
    description: 'TBIA CCL is an industry-academia collaboration focused on GRI Sustainability Reporting, Carbon Accounting digitization, and compliance dashboards for the industrial and business ecosystem.',
    about: {
      legacy: 'TBIA (Thane Belapur Industries Association) represents the industrial cluster of Navi Mumbai and Thane, committed to sustainable business practices.',
      vision: 'A fully digitized, GRI-compliant industrial cluster with measurable carbon footprint reduction and transparent sustainability reporting.',
      mission: 'Digitize carbon emission data, create compliance dashboards, and support industry in GRI sustainability reporting.',
    },
    menu: [
      { label: 'About', slug: 'about', icon: 'info', isPublic: true, subItems: [] },
      { label: 'GRI Compliance', slug: 'gri', icon: 'compliance', isPublic: false, subItems: [] },
      { label: 'Carbon Dashboard', slug: 'carbon', icon: 'dashboard', isPublic: false, subItems: [] },
      { label: 'Compliance Reports', slug: 'reports', icon: 'document', isPublic: false, subItems: [] },
      { label: 'Contact', slug: 'contact', icon: 'mail', isPublic: true, subItems: [] },
    ],
    stats: [
      { label: 'Industries Enrolled', value: '30+', unit: '', icon: 'building' },
      { label: 'GRI Metrics Tracked', value: '50+', unit: '', icon: 'chart' },
    ],
  },
];

const storiesData = [
  {
    cclSlug: 'juhu-moragaon',
    type: 'community-story',
    title: 'The Identity of Moragaon: Carved by its Seafaring Community',
    subtitle: 'Meet the Fisherfolk of Juhu',
    excerpt: 'Skilled fishermen navigate traditional wooden boats and modern craft into coastal waters, relying on generations of intuitive marine knowledge to bring in daily catches.',
    content: `The identity of Moragaon is carved out by its seafaring community, whose daily rhythms are dictated by the rising and falling tides of the Arabian Sea. Skilled fishermen navigate traditional wooden boats and modern craft into coastal waters, relying on generations of intuitive marine knowledge to bring in daily catches.

Through intimate visual portraits, this section highlights their craft, their tools, and the dedication required to sustain one of the city's oldest indigenous livelihoods. Each fisherman carries with him a wealth of knowledge — tide patterns, weather signs, seasonal fish movements — passed down not through textbooks but through years spent at sea alongside fathers and grandfathers.

The boats themselves are works of art: brightly painted wooden vessels named after local deities, each one lovingly maintained by its owner. The nets, too, tell stories — the choice of mesh size, the weight of the sinkers, the buoyancy of the floats — all calibrated through experience to target the right fish at the right depth.`,
    author: { name: 'CCL Documentation Team', community: 'Juhu Moragaon Koliwada' },
    tags: ['fisherfolk', 'heritage', 'fishing', 'community'],
    isPublic: true,
    isHighlighted: true,
    section: 'people',
  },
  {
    cclSlug: 'juhu-moragaon',
    type: 'fisherman-story',
    title: 'Women of Mora Gaon: The Economic Backbone',
    subtitle: 'From auction docks to community leadership',
    excerpt: 'The women of Moragaon are the economic backbone and cultural anchors of the village, managing the entirety of post-harvest operations.',
    content: `The women of Moragaon are the economic backbone and cultural anchors of the village. Managing the entirety of post-harvest operations—from auctioning and price negotiation at dockside markets to sorting, cleaning, and sun-drying fish on bamboo racks—their work keeps the coastal economy alive.

Video features and image galleries document their leadership, financial independence, and central role in preserving community customs. These women are up before dawn, preparing for the incoming catch, negotiating hard with wholesale buyers, and ensuring fair prices for the community.

Beyond the markets, they are the keepers of culture — teaching the next generation the recipes, the songs, the rituals that define Koli identity. In festivals like Narali Purnima, they organize the community, prepare the offerings, and lead the prayers to the sea.`,
    author: { name: 'Women Documentation Initiative', community: 'Juhu Moragaon' },
    tags: ['women', 'fisherwomen', 'economy', 'culture', 'leadership'],
    isPublic: true,
    isHighlighted: true,
    section: 'people',
  },
  {
    cclSlug: 'juhu-moragaon',
    type: 'oral-history',
    title: 'Three Generations: How Moragaon Has Transformed',
    subtitle: 'A visual narrative across age groups',
    excerpt: 'By tracing three distinct generations, this segment explores how life along the Juhu coast has transformed — from pristine beaches to the urban sprawl of today.',
    content: `Family lineage defines the continuity of Moragaon Koliwada. By tracing three distinct generations, this segment explores how life along the Juhu coast has transformed—from elders who recall pristine stretches of beach and traditional fishing techniques to the middle generation adapting to urban shifts, down to the youth navigating modern city life.

The elders remember a time when fish were so plentiful that even a single morning's haul would feed the entire village. They remember the beach before the hotels, before the road widening, before the builders came. Their memories are a map of what has been lost and what remains.

The middle generation has witnessed the fastest change. They watched the city grow around them, fought court battles to protect their homes, and found ways to blend traditional skills with modern opportunities. Many of them are today's community leaders.

The youth are digital natives who use WhatsApp to coordinate catch sales, Instagram to share their heritage with the world, and activism to fight for their rights. They are simultaneously the most connected to the world outside and the most determined to preserve what is inside.`,
    author: { name: 'Oral History Team', community: 'Juhu Moragaon' },
    tags: ['oral-history', 'generations', 'memory', 'change'],
    isPublic: true,
    isHighlighted: false,
    section: 'people',
  },
  {
    cclSlug: 'juhu-moragaon',
    type: 'community-story',
    title: 'Mangroves: The Ecological Shield of Moragaon',
    subtitle: 'Protecting the coastline, nurturing marine life',
    excerpt: 'Bordering the coastal edges of the village, the mangrove ecosystems serve as vital ecological shields against tidal surges and coastal erosion.',
    content: `Bordering the coastal edges of the village, the mangrove ecosystems serve as vital ecological shields against tidal surges and coastal erosion while functioning as natural nurseries for marine life. Detailed photo essays highlight the ecological importance of these wetlands, documenting both the indigenous fauna that thrive within them and the community-led conservation efforts aimed at protecting them from urban degradation.

The fishermen of Moragaon have always known what scientists are now confirming: healthy mangroves mean healthy fish populations. The roots of mangrove trees provide shelter for juvenile fish, crabs, and shrimp. The birds that nest in them — herons, kingfishers, egrets — signal a thriving ecosystem.

Community-led patrols have stopped illegal dumping in the mangroves multiple times. Younger members of the community have joined hands with environmental organizations to plant new saplings in degraded areas. The mangroves, they know, are not just trees — they are the foundation of the village's future.`,
    author: { name: 'Environment Documentation Team', community: 'Juhu Moragaon' },
    tags: ['mangroves', 'environment', 'conservation', 'biodiversity'],
    isPublic: true,
    isHighlighted: true,
    section: 'village',
  },
  {
    cclSlug: 'juhu-moragaon',
    type: 'success-story',
    title: 'The Struggle and Resilience of Juhu Moragaon',
    subtitle: 'How the community fought back against evictions',
    excerpt: 'Despite facing repeated evictions and demolitions, the community of Juhu Moragaon has persisted, organized, and continued to assert their rights as original inhabitants.',
    content: `Despite being the original inhabitants of this land, our community has faced repeated evictions, demolitions, and denial of housing rights.

In 1988, land reserved for fishermen's housing was denied citing CRZ norms. In 2005, over 225 houses were demolished, treating fisherfolk as "slum dwellers" while builders were protected. Our drying yards and net-mending sheds were encroached upon, depriving us of basic fishing infrastructure.

Yet the community of Juhu Moragaon did not give up. They organized, they documented, they went to court, and they continued to live and work on their ancestral land. The Juhu Moragaon Machhimar Vividha Karyakari Sahakari Sanstha Ltd. has been the institutional backbone of this resistance — maintaining records, pursuing legal cases, and representing the community in government offices.

Today, their demands remain clear: land allotment for housing, fishing, and ancillary activities under GRs and CRZ Notification 2011; restoration of demolished houses; removal of encroachments from drying yards; construction of a jetty; and long-term housing policy for Koliwadas across Mumbai.

As they say: "Preserving its story allows future generations to understand the people and traditions that existed along Mumbai's coast long before the modern city took shape."`,
    author: { name: 'Community Rights Documentation', community: 'Juhu Moragaon' },
    tags: ['rights', 'eviction', 'resilience', 'success-story', 'koliwada'],
    isPublic: true,
    isHighlighted: true,
    section: 'about',
  },
  {
    cclSlug: 'thane',
    type: 'success-story',
    title: 'Society Turns Zero Waste: Hiranandani Gardens Leads the Way',
    subtitle: 'A gated community\'s journey to complete waste segregation',
    excerpt: 'How one residential society in Thane achieved near-zero waste to landfill through systematic segregation and community participation.',
    content: `When residents of a large housing society in Thane decided to take waste management into their own hands, they did not expect it to transform their community. But that is exactly what happened.

With support from the Thane SWM CCL, the society set up a wet waste composting unit, organized dry waste collection days, and trained housekeeping staff on segregation. Within six months, their waste to landfill dropped by 70%.

The real change, however, was in mindset. Children started competing to find ways to reduce waste. Elders who had been skeptical became the biggest advocates. The society's WhatsApp group, once used for complaints, became a hub for sharing tips on reducing, reusing, and recycling.`,
    author: { name: 'Thane SWM CCL Team', community: 'Thane' },
    tags: ['zero-waste', 'success', 'society', 'thane', 'segregation'],
    isPublic: true,
    isHighlighted: true,
    section: 'stories',
  },
];

const seedDB = async () => {
  const managesConnection = require.main === module;

  try {
    if (managesConnection) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected to MongoDB');
    }

    // Synchronize every CCL in the seed catalogue without deleting admin-created data.
    for (const ccl of cclsData) {
      await CCL.findOneAndUpdate(
        { slug: ccl.slug },
        { $set: ccl },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Synchronized ${cclsData.length} CCLs`);

    // Seed/update the known stories by title + CCL.
    for (const story of storiesData) {
      await Story.findOneAndUpdate(
        { cclSlug: story.cclSlug, title: story.title },
        { $set: story },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ Synchronized ${storiesData.length} stories`);

    const existingAdmin = await User.findOne({ email: 'admin@ccl-portal.org' });
    if (!existingAdmin) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@ccl-portal.org',
        password: 'Admin@123',
        role: 'super-admin',
        cclAccess: ['*'],
      });
      console.log('✅ Seeded admin user: admin@ccl-portal.org');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('🎉 Database synchronization complete');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    if (managesConnection) {
      await mongoose.disconnect();
    }
  }
};

// Run if called directly
if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
