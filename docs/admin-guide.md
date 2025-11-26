# Admin Experience - CityVoice

## Overview
The CityVoice platform includes a complete administrative interface for managing citizen reports (signalements). Administrators can view, filter, and manage all reports with status and priority controls.

## Access

### Login URL
- **URL**: http://localhost:3000/admin/login
- **Test Account**:
  - Email: `admin@cityvoice.be`
  - Password: `admin123`

### Creating Admin Accounts
Admin accounts must be created directly in the database:

```sql
-- Run the seed script
mysql -u root -p gestion_signalements < database/seed_admin.sql

-- Or manually insert
INSERT INTO `administrateur` (
  `nom_admin`, `prenom_admin`, `email_admin`, 
  `mot_de_passe_admin`, `role_admin`, `id_service`
) VALUES (
  'LastName', 'FirstName', 'email@example.com',
  'bcrypt_hashed_password', 'admin', 1
);
```

Use `backend/generateHash.js` to generate password hashes:
```bash
cd backend
node generateHash.js yourpassword
```

## Features

### Dashboard Overview
- **Stats Grid**: Real-time counts of signalements
  - Total signalements
  - Pending (en_attente)
  - In progress (en_cours)
  - Resolved (resolu)

- **Filter System**: Quick access to signalements by status
  - All (tous)
  - Pending (en_attente)
  - In progress (en_cours)
  - Resolved (resolu)

### Signalement Management

#### View Signalements
Each card displays:
- Title and description
- Citizen name and contact
- Location (address, quartier)
- Current status badge
- Current priority badge
- Creation date

#### Inline Status Management
Change signalement status directly from the dashboard:
- **en_attente**: Pending review
- **en_cours**: Currently being handled
- **resolu**: Issue resolved
- **rejete**: Report rejected

Status changes are saved automatically via API.

#### Inline Priority Management
Adjust priority levels:
- **faible**: Low priority
- **normale**: Normal priority
- **elevee**: High priority
- **urgente**: Urgent (requires immediate attention)

Priority changes are saved automatically via API.

#### View Details
Click "Voir détails" to navigate to full signalement view with:
- Interactive map showing exact location
- Complete description and images
- All comments from citizens and admins
- Full history of status changes

## API Endpoints

### Authentication
- **POST** `/api/admin/login`
  - Body: `{ email_admin, mot_de_passe_admin }`
  - Returns: `{ token, admin: {...} }`

- **POST** `/api/admin/register` (protected)
  - Body: `{ nom_admin, prenom_admin, email_admin, mot_de_passe_admin, role_admin, id_service }`
  - Requires: Valid admin JWT token

- **GET** `/api/admin/profile` (protected)
  - Returns: Admin profile with service info

### Signalement Management
- **GET** `/api/signalements`
  - Returns: All signalements with citizen info

- **GET** `/api/signalements/stats`
  - Returns: Count statistics by status

- **PUT** `/api/signalements/:id`
  - Body: `{ statut_signalement?, priorite? }`
  - Updates signalement status and/or priority

## Security

### Authentication Flow
1. Admin logs in via `/admin/login`
2. Receives JWT token
3. Token stored in localStorage as `adminToken`
4. Admin data stored as `adminData`
5. Token sent in Authorization header for protected routes

### Token Storage
- Key: `adminToken`
- Format: `Bearer <jwt_token>`
- Payload includes: `{ id, email, role }`

### Protected Routes
Dashboard automatically redirects to login if:
- No token in localStorage
- Invalid or expired token

## User Interface

### Color Scheme
- Primary: Purple gradient (#667eea → #764ba2)
- Status colors:
  - Pending: Yellow (#fff3cd)
  - In Progress: Blue (#cce5ff)
  - Resolved: Green (#d4edda)
  - Rejected: Red (#f8d7da)

### Status Badges
Visual indicators for quick identification:
- 🟡 En attente (Pending)
- 🔵 En cours (In Progress)
- 🟢 Résolu (Resolved)
- 🔴 Rejeté (Rejected)

### Priority Badges
- 🔵 Faible (Low)
- ⚫ Normale (Normal)
- 🟡 Élevée (High)
- 🔴 Urgente (Urgent)

## Responsive Design
- Desktop: Full grid layout with 4 stat cards
- Tablet: 2-column grid
- Mobile: Single column, stacked layout

## Future Enhancements
- [ ] Admin assignment (assign signalement to specific admin)
- [ ] Admin comments on signalements
- [ ] Bulk actions (update multiple at once)
- [ ] Export reports (CSV/PDF)
- [ ] Analytics dashboard with charts
- [ ] Email notifications for status changes
- [ ] Activity log/audit trail
- [ ] Advanced filtering (by date, category, location)
- [ ] Search functionality
- [ ] Report categories management

## Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error message)
- [ ] Token persists after page refresh
- [ ] Logout clears token and redirects to login

### Dashboard
- [ ] Stats load correctly
- [ ] All signalements display
- [ ] Filter by status works
- [ ] Status dropdown saves correctly
- [ ] Priority dropdown saves correctly
- [ ] View details navigation works
- [ ] Responsive on mobile/tablet

### Security
- [ ] Cannot access dashboard without token
- [ ] Invalid token redirects to login
- [ ] Token expires after configured time

## Troubleshooting

### Cannot login
- Verify admin exists in database: `SELECT * FROM administrateur WHERE email_admin = 'your@email.com';`
- Check password hash is correct
- Verify backend server is running on port 5000
- Check browser console for error messages

### Dashboard not loading
- Check backend API is accessible: `curl http://localhost:5000/api/signalements`
- Verify JWT_SECRET in backend/.env matches
- Check browser localStorage for adminToken
- View browser console for API errors

### Changes not saving
- Verify admin token is valid
- Check network tab for 401/403 errors
- Ensure signalement ID is correct
- Check backend logs for errors

## Database Schema

### administrateur table
```sql
CREATE TABLE `administrateur` (
  `id_admin` INT PRIMARY KEY AUTO_INCREMENT,
  `nom_admin` VARCHAR(100) NOT NULL,
  `prenom_admin` VARCHAR(100) NOT NULL,
  `email_admin` VARCHAR(255) UNIQUE NOT NULL,
  `mot_de_passe_admin` VARCHAR(255) NOT NULL,
  `role_admin` ENUM('admin', 'moderateur', 'gestionnaire') DEFAULT 'admin',
  `id_service` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`id_service`) REFERENCES `service_municipal`(`id_service`)
);
```

## Support
For issues or questions, contact the development team or refer to the main documentation in `/docs`.
