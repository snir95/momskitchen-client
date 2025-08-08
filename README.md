# Mom's Kitchen - Frontend Client

React frontend application for the Mom's Kitchen food ordering system with Hebrew RTL support and modern UI design.

## 🍽️ Project Overview

This is the frontend application for "הבישולים של עליזה" (Aliza's Cooking), a food ordering system that displays available dishes to customers and provides an admin interface for menu management.

## 🚀 Features

- **Hebrew RTL Support** - Full right-to-left layout and Hebrew typography
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional design with hover effects
- **Real-time Updates** - Live dish availability updates
- **Admin Dashboard** - Complete CRUD operations for dish management
- **Customer Interface** - Beautiful dish display with availability status

## 🎨 Pages & Components

### Customer Pages
- **Homepage** (`/`) - Displays available dishes and coming soon items
- **Dish Cards** - Interactive cards with images, descriptions, and prices

### Admin Pages
- **Admin Dashboard** (`/admin`) - Complete dish management interface
- **Add Dish Form** - Create new dishes with Hebrew input fields
- **Dish Management** - Edit, delete, and toggle availability

## 🛠️ Tech Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS-in-JS** - Inline styles for component styling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/snir95/momskitchen-client.git
   cd momskitchen-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
client/
├── public/
│   └── index.html          # Main HTML file with Hebrew fonts
├── src/
│   ├── components/
│   │   ├── HomePage.tsx    # Customer homepage
│   │   └── AdminDashboard.tsx # Admin interface
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles with RTL support
│   └── App.css             # App-specific styles
├── package.json
└── README.md
```

## 🌐 API Integration

The frontend connects to the backend API at `http://localhost:5001/api`:

### Endpoints Used
- `GET /api/dishes` - Fetch all dishes
- `POST /api/dishes` - Create new dish
- `PUT /api/dishes/:id` - Update dish availability
- `DELETE /api/dishes/:id` - Delete dish

## 🎨 Design Features

### Hebrew Typography
- **Fonts**: Assistant and Heebo from Google Fonts
- **RTL Layout**: Right-to-left text direction
- **Hebrew Content**: All text in Hebrew with proper alignment

### Responsive Design
- **Grid Layout**: CSS Grid for dish cards
- **Flexible Cards**: Adaptive card sizing
- **Mobile First**: Optimized for all screen sizes

### Interactive Elements
- **Hover Effects**: Cards lift on hover
- **Loading States**: Visual feedback during API calls
- **Confirmation Dialogs**: Safe delete operations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically

### GitHub Pages
1. Set up GitHub Actions
2. Configure build workflow
3. Deploy to GitHub Pages

## 🔧 Environment Variables

Create a `.env` file for custom API URL:

```env
VITE_API_URL=http://localhost:5001/api
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🎯 Features in Detail

### Customer Interface
- **Today's Dishes** - Shows available dishes with green theme
- **Coming Soon** - Displays future dishes with orange theme
- **Dish Cards** - Beautiful cards with images and descriptions
- **Price Display** - Clear pricing in Israeli Shekels (₪)

### Admin Interface
- **Add Dish Form** - Complete form with Hebrew labels
- **Dish List** - Manage all dishes in one place
- **Toggle Availability** - Quick availability switching
- **Delete Confirmation** - Safe deletion with Hebrew prompts

## 🔗 Links

- **Backend Repository**: [momskitchen-server](https://github.com/snir95/momskitchen-server)
- **Live Demo**: [Coming Soon]
- **API Documentation**: [Coming Soon]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Frontend Developer**: [Your Name]
- **Project**: Mom's Kitchen Frontend

## 🐛 Known Issues

- None currently reported

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Shopping cart functionality
- [ ] Order management system
- [ ] Payment integration
- [ ] Push notifications
- [ ] PWA support
