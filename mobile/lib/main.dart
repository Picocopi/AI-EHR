import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'screens/dashboard_screen.dart';
import 'screens/patients/patient_list_screen.dart';
import 'screens/patients/patient_detail_screen.dart';
import 'screens/appointments/appointment_list_screen.dart';
import 'screens/observations/observation_list_screen.dart';
import 'providers/patient_provider.dart';
import 'providers/appointment_provider.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => PatientProvider()),
        ChangeNotifierProvider(create: (_) => AppointmentProvider()),
      ],
      child: MaterialApp.router(
        title: 'AI-EHR Mobile',
        theme: AppTheme.lightTheme,
        darkTheme: AppTheme.darkTheme,
        themeMode: ThemeMode.system,
        routerConfig: _router,
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}

// Router configuration
final GoRouter _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/patients',
      builder: (context, state) => const PatientListScreen(),
    ),
    GoRoute(
      path: '/patients/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return PatientDetailScreen(patientId: id);
      },
    ),
    GoRoute(
      path: '/appointments',
      builder: (context, state) => const AppointmentListScreen(),
    ),
    GoRoute(
      path: '/observations',
      builder: (context, state) => const ObservationListScreen(),
    ),
  ],
);
