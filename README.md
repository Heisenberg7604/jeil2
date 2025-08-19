# JEIL - Packaging Solutions Website

A modern, responsive website for JEIL packaging solutions with integrated catalogue request system and admin panel.

## Features

### Frontend
- **Modern React Application** with Vite build tool
- **Responsive Design** using Tailwind CSS
- **Dark/Light Theme** toggle
- **Smooth Animations** with Framer Motion
- **Product Showcase** with detailed product pages
- **Catalogue Request Form** for customers
- **Admin Panel** for managing requests

### Backend
- **Express.js Server** with RESTful API
- **Email Integration** using Nodemailer
- **Catalogue Request Management** with status tracking
- **Admin Notifications** for new requests
- **CSV Export** functionality

## Project Structure

```
jeil2/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── RequestCatalogueForm.jsx  # Catalogue request form
│   │   ├── AdminPanel.jsx        # Admin management panel
│   │   └── ...                   # Other components
│   ├── pages/                    # Page components
│   │   ├── Admin.jsx             # Admin page
│   │   └── ...                   # Other pages
│   └── App.jsx                   # Main application
├── backend/                      # Backend server
│   ├── server.js                 # Express server
│   ├── package.json              # Backend dependencies
│   ├── env.example               # Environment variables template
│   └── README.md                 # Backend setup guide
└── README.md                     # This file
```

## Quick Start

### Frontend Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Run Setup Script** (Unix/Mac)
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   **Or Manual Setup:**
   ```bash
   npm install
   cp env.example .env
   # Edit .env with your email credentials
   ```

3. **Start Backend Server**
   ```bash
   npm run dev
   ```

## Environment Configuration

### Backend (.env file)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@jeil.com
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password at [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use App Password in `.env` file

## Usage

### Customer Experience
1. Browse products on the website
2. Click "Request Catalogue" on any product
3. Fill out the comprehensive form
4. Receive confirmation email
5. Admin processes the request

### Admin Experience
1. Access `/admin` route
2. View all catalogue requests
3. Update request statuses
4. Add admin notes
5. Export data to CSV
6. Receive email notifications for new requests

## API Endpoints

- `POST /api/request-catalogue` - Submit catalogue request
- `GET /api/catalogue-requests` - Get all requests (admin)
- `PATCH /api/catalogue-requests/:id/status` - Update status
- `DELETE /api/catalogue-requests/:id` - Delete request
- `PATCH /api/catalogue-requests/:id/notes` - Update notes

## Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Lucide React Icons

### Backend
- Node.js
- Express.js
- Nodemailer
- CORS
- Multer

## Development

### Adding New Products
1. Update `products` array in `src/pages/Products.jsx`
2. Add product data in `src/components/ProductDetailPage.jsx`
3. Add product images to `dist/assets/products/`

### Customizing Email Templates
Edit email templates in `backend/server.js`:
- `createCustomerEmail()` - Customer confirmation
- `createAdminEmail()` - Admin notification

### Styling
- Uses Tailwind CSS utility classes
- Dark/light theme support
- Responsive design patterns

## Production Deployment

### Frontend
1. Build the project: `npm run build`
2. Deploy `dist/` folder to your hosting service
3. Configure routing for SPA (all routes serve `index.html`)

### Backend
1. Set production environment variables
2. Use PM2 or similar process manager
3. Set up reverse proxy (Nginx/Apache)
4. Configure SSL certificates
5. Set up database (replace in-memory storage)

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## Support

For technical support or questions:
- Check the backend README for detailed setup instructions
- Review environment configuration
- Check email service setup
- Verify API endpoints

## License

MIT License - see LICENSE file for details

---

**JEIL** - Your Trusted Packaging Partner
