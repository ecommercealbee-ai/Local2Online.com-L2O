import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Live sample data imports for initial bootstrapping
import { INITIAL_SERVICES, INITIAL_TESTIMONIALS, INITIAL_PRICING, INITIAL_PORTFOLIO, INITIAL_BLOGS } from './src/data';

interface Lead {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  whatsApp: string;
  email: string;
  serviceNeeded: string;
  notes: string;
  submittedAt: string;
  type: string;
  status: string;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// Dynamic in-memory stores initialized with premium seed data
let leadsList: Lead[] = [
  {
    id: 'l1',
    name: 'Anand Patel',
    businessName: 'Patel Footwear',
    phone: '0987654321',
    whatsApp: '0987654321',
    email: 'anand@patelfootwear.com',
    serviceNeeded: 'Meesho Low-Commission Sales Setup',
    notes: 'We have a retail stall in Ahmedabad. Want to reach Surat, Rajkot and Delhi buyers.',
    submittedAt: '2026-06-01T12:00:00Z',
    type: 'audit',
    status: 'new'
  },
  {
    id: 'l2',
    name: 'Meena Advani',
    businessName: 'Chic Styles',
    phone: '0812345678',
    whatsApp: '0812345678',
    email: 'meena@chicstyles.in',
    serviceNeeded: 'Shopify Premium Store Development',
    notes: 'Need a beautiful premium Shopify storefront. Have premium designer kurtas. We already have GST.',
    submittedAt: '2026-06-02T10:15:00Z',
    type: 'consultation',
    status: 'contacted'
  }
];

let servicesList = [...INITIAL_SERVICES];
let testimonialsList = [...INITIAL_TESTIMONIALS];
let pricingList = [...INITIAL_PRICING];
let portfolioList = [...INITIAL_PORTFOLIO];
let blogsList = [...INITIAL_BLOGS];

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Leads Endpoints
app.get('/api/leads', (req: Request, res: Response) => {
  res.json(leadsList);
});

app.post('/api/leads', (req: Request, res: Response) => {
  const { name, businessName, phone, whatsApp, email, serviceNeeded, notes, type } = req.body;
  if (!name || !phone) {
    res.status(400).json({ error: 'Name and Phone Number are required fields.' });
    return;
  }
  const newLead: Lead = {
    id: 'lead_' + Math.random().toString(36).substr(2, 9),
    name,
    businessName: businessName || '',
    phone,
    whatsApp: whatsApp || phone,
    email: email || '',
    serviceNeeded: serviceNeeded || 'Not Specified',
    notes: notes || '',
    submittedAt: new Date().toISOString(),
    type: type || 'contact',
    status: 'new'
  };
  leadsList.unshift(newLead);
  
  // Return status + dynamic feedback response imitating email dispatch notification
  res.status(201).json({ 
    success: true, 
    lead: newLead,
    message: 'Lead received successfully! Notification email dispatched to client relation admin.' 
  });
});

app.post('/api/leads/update-status', (req: Request, res: Response) => {
  const { id, status } = req.body;
  const lead = leadsList.find(l => l.id === id);
  if (lead) {
    lead.status = status;
    res.json({ success: true, lead });
  } else {
    res.status(404).json({ error: 'Lead not found.' });
  }
});

app.delete('/api/leads/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialCount = leadsList.length;
  leadsList = leadsList.filter(l => l.id !== id);
  if (leadsList.length < initialCount) {
    res.json({ success: true, message: 'Lead deleted from active rosters.' });
  } else {
    res.status(404).json({ error: 'Lead ID not found.' });
  }
});

// Services Endpoints
app.get('/api/services', (req: Request, res: Response) => {
  res.json(servicesList);
});

app.post('/api/services', (req: Request, res: Response) => {
  const { title, icon, shortDesc, longDesc, features, platforms } = req.body;
  const newService = {
    id: 'service_' + Math.random().toString(36).substr(2, 9),
    title,
    icon: icon || 'Award',
    shortDesc,
    longDesc,
    features: features || [],
    platforms: platforms || []
  };
  servicesList.push(newService);
  res.status(201).json({ success: true, service: newService });
});

app.delete('/api/services/:id', (req: Request, res: Response) => {
  servicesList = servicesList.filter(s => s.id !== req.params.id);
  res.json({ success: true });
});

// Testimonials Endpoints
app.get('/api/testimonials', (req: Request, res: Response) => {
  res.json(testimonialsList);
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const { name, businessName, location, rating, review, avatar, tag } = req.body;
  const newTestimonial = {
    id: 'test_' + Math.random().toString(36).substr(2, 9),
    name,
    businessName,
    location: location || 'India',
    rating: rating || 5,
    review,
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    tag: tag || 'Retailer'
  };
  testimonialsList.push(newTestimonial);
  res.status(201).json({ success: true, testimonial: newTestimonial });
});

app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
  testimonialsList = testimonialsList.filter(t => t.id !== req.params.id);
  res.json({ success: true });
});

// Pricing Endpoints
app.get('/api/pricing', (req: Request, res: Response) => {
  res.json(pricingList);
});

// Blog Endpoints
app.get('/api/blogs', (req: Request, res: Response) => {
  res.json(blogsList);
});

app.post('/api/blogs', (req: Request, res: Response) => {
  const { title, excerpt, content, category, readTime, image, author } = req.body;
  const slug = (title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newBlog = {
    id: 'blog_' + Math.random().toString(36).substr(2, 9),
    title,
    slug,
    excerpt,
    content,
    category: category || 'General',
    readTime: readTime || '4 mins read',
    image: image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
    date: new Date().toISOString().split('T')[0],
    author: author || 'Mohammed Sameer'
  };
  blogsList.unshift(newBlog);
  res.status(201).json({ success: true, blog: newBlog });
});

app.delete('/api/blogs/:id', (req: Request, res: Response) => {
  blogsList = blogsList.filter(b => b.id !== req.params.id);
  res.json({ success: true });
});

// Portfolio Endpoints
app.get('/api/portfolio', (req: Request, res: Response) => {
  res.json(portfolioList);
});

app.post('/api/portfolio', (req: Request, res: Response) => {
  const { title, client, industry, platform, image, metrics, description } = req.body;
  const newProject = {
    id: 'proj_' + Math.random().toString(36).substr(2, 9),
    title,
    client,
    industry,
    platform,
    image: image || 'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=600&auto=format&fit=crop',
    metrics: metrics || [],
    description
  };
  portfolioList.push(newProject);
  res.status(201).json({ success: true, project: newProject });
});

app.delete('/api/portfolio/:id', (req: Request, res: Response) => {
  portfolioList = portfolioList.filter(p => p.id !== req.params.id);
  res.json({ success: true });
});

// Integrate Vite middleware for development (React HotReload etc.)
async function initializeServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Local2Online App] Server is live on http://localhost:${PORT}`);
  });
}

initializeServer();
