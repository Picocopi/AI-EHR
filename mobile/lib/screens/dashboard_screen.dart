import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import '../widgets/stat_card.dart';
import '../widgets/quick_action_card.dart';
import '../theme/app_theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AI-EHR Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {
              // Handle notifications
            },
          ),
          IconButton(
            icon: const Icon(Icons.account_circle_outlined),
            onPressed: () {
              // Handle profile
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Welcome Section
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    AppTheme.primaryBlue,
                    AppTheme.lightBlue,
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Welcome, Dr. Smith',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Today is ${_formatDate(DateTime.now())}',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: Colors.white70,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    MdiIcons.stethoscope,
                    size: 48,
                    color: Colors.white70,
                  ),
                ],
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Quick Stats
            Text(
              'Today\'s Overview',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            
            Row(
              children: [
                Expanded(
                  child: StatCard(
                    title: 'Patients',
                    value: '1,234',
                    subtitle: '+20% this month',
                    icon: MdiIcons.account,
                    color: AppTheme.primaryBlue,
                    onTap: () => context.go('/patients'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: StatCard(
                    title: 'Appointments',
                    value: '23',
                    subtitle: '8 completed',
                    icon: MdiIcons.calendar,
                    color: AppTheme.accentGreen,
                    onTap: () => context.go('/appointments'),
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 16),
            
            Row(
              children: [
                Expanded(
                  child: StatCard(
                    title: 'Observations',
                    value: '567',
                    subtitle: '89 today',
                    icon: MdiIcons.chartLine,
                    color: AppTheme.warningOrange,
                    onTap: () => context.go('/observations'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: StatCard(
                    title: 'Critical',
                    value: '3',
                    subtitle: 'Requires attention',
                    icon: MdiIcons.alertCircle,
                    color: AppTheme.errorRed,
                    onTap: () {
                      // Navigate to critical patients
                    },
                  ),
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // Quick Actions
            Text(
              'Quick Actions',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
              childAspectRatio: 1.5,
              children: [
                QuickActionCard(
                  title: 'Add Patient',
                  icon: MdiIcons.accountPlus,
                  color: AppTheme.primaryBlue,
                  onTap: () {
                    // Navigate to add patient
                  },
                ),
                QuickActionCard(
                  title: 'Schedule Appointment',
                  icon: MdiIcons.calendarPlus,
                  color: AppTheme.accentGreen,
                  onTap: () {
                    // Navigate to schedule appointment
                  },
                ),
                QuickActionCard(
                  title: 'Record Observation',
                  icon: MdiIcons.notePlus,
                  color: AppTheme.warningOrange,
                  onTap: () {
                    // Navigate to add observation
                  },
                ),
                QuickActionCard(
                  title: 'Upload Document',
                  icon: MdiIcons.upload,
                  color: AppTheme.lightBlue,
                  onTap: () {
                    // Navigate to upload document
                  },
                ),
              ],
            ),
            
            const SizedBox(height: 24),
            
            // Recent Activity
            Text(
              'Recent Activity',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16),
            
            Card(
              child: Column(
                children: [
                  _buildActivityItem(
                    context,
                    'New patient registered',
                    'John Doe - 5 minutes ago',
                    MdiIcons.accountPlus,
                    AppTheme.accentGreen,
                  ),
                  const Divider(height: 1),
                  _buildActivityItem(
                    context,
                    'Appointment scheduled',
                    'Jane Smith - 15 minutes ago',
                    MdiIcons.calendar,
                    AppTheme.primaryBlue,
                  ),
                  const Divider(height: 1),
                  _buildActivityItem(
                    context,
                    'Lab results uploaded',
                    'Patient #123 - 1 hour ago',
                    MdiIcons.fileDocument,
                    AppTheme.warningOrange,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      
      // Bottom Navigation
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: 0,
        onTap: (index) {
          switch (index) {
            case 0:
              // Already on dashboard
              break;
            case 1:
              context.go('/patients');
              break;
            case 2:
              context.go('/appointments');
              break;
            case 3:
              context.go('/observations');
              break;
          }
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(MdiIcons.viewDashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(MdiIcons.account),
            label: 'Patients',
          ),
          BottomNavigationBarItem(
            icon: Icon(MdiIcons.calendar),
            label: 'Appointments',
          ),
          BottomNavigationBarItem(
            icon: Icon(MdiIcons.chartLine),
            label: 'Records',
          ),
        ],
      ),
    );
  }

  Widget _buildActivityItem(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
    Color color,
  ) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          shape: BoxShape.circle,
        ),
        child: Icon(icon, color: color, size: 20),
      ),
      title: Text(
        title,
        style: Theme.of(context).textTheme.titleMedium,
      ),
      subtitle: Text(
        subtitle,
        style: Theme.of(context).textTheme.bodyMedium,
      ),
    );
  }

  String _formatDate(DateTime date) {
    final weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    final months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return '${weekdays[date.weekday - 1]}, ${months[date.month - 1]} ${date.day}';
  }
}
