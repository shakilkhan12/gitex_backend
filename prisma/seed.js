const { PrismaClient } = require('../src/prisma/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed users_roles first (needed for users)
  console.log('Seeding users_roles...');
  const roles = await Promise.all([
    prisma.users_roles.create({
      data: {
        role_name: 'Admin',
      },
    }),
    prisma.users_roles.create({
      data: {
        role_name: 'Manager',
      },
    }),
    prisma.users_roles.create({
      data: {
        role_name: 'Employee',
      },
    }),
  ]);

  // Seed users
  console.log('Seeding users...');
  const users = await Promise.all([
    prisma.users.create({
      data: {
        emp_Id: 'EMP001',
        gender: 'Male',
        emp__eng_name: 'John Smith',
        emp__arabic_name: 'جون سميث',
        country_code: '+971',
        phone: '501234567',
        email: 'john.smith@example.com',
        dep_eng_name: 'IT Department',
        dep_arabic_name: 'قسم تقنية المعلومات',
        desig_eng_name: 'Software Engineer',
        desig_arabic_name: 'مهندس برمجيات',
        unit_eng_name: 'Development Unit',
        unit_arabic_name: 'وحدة التطوير',
        committe_eng_name: 'Technical Committee',
        committe_arabic_name: 'اللجنة التقنية',
        ai_engine_access: true,
        role_Id: roles[0].Id, // Admin role
      },
    }),
    prisma.users.create({
      data: {
        emp_Id: 'EMP002',
        gender: 'Female',
        emp__eng_name: 'Sarah Johnson',
        emp__arabic_name: 'سارة جونسون',
        country_code: '+971',
        phone: '502345678',
        email: 'sarah.johnson@example.com',
        dep_eng_name: 'HR Department',
        dep_arabic_name: 'قسم الموارد البشرية',
        desig_eng_name: 'HR Manager',
        desig_arabic_name: 'مدير الموارد البشرية',
        unit_eng_name: 'HR Unit',
        unit_arabic_name: 'وحدة الموارد البشرية',
        committe_eng_name: 'HR Committee',
        committe_arabic_name: 'لجنة الموارد البشرية',
        ai_engine_access: false,
        role_Id: roles[1].Id, // Manager role
      },
    }),
    prisma.users.create({
      data: {
        emp_Id: 'EMP003',
        gender: 'Male',
        emp__eng_name: 'Ahmed Al Mansouri',
        emp__arabic_name: 'أحمد المنصوري',
        country_code: '+971',
        phone: '503456789',
        email: 'ahmed.mansouri@example.com',
        dep_eng_name: 'Operations Department',
        dep_arabic_name: 'قسم العمليات',
        desig_eng_name: 'Operations Officer',
        desig_arabic_name: 'ضابط العمليات',
        unit_eng_name: 'Operations Unit',
        unit_arabic_name: 'وحدة العمليات',
        committe_eng_name: 'Operations Committee',
        committe_arabic_name: 'لجنة العمليات',
        ai_engine_access: false,
        role_Id: roles[2].Id, // Employee role
      },
    }),
  ]);

  // Seed users_permissions
  console.log('Seeding users_permissions...');
  await Promise.all([
    prisma.users_permissions.create({
      data: {
        role_Id: roles[0].Id, // Admin permissions
        dashboard_view: true,
        role_permission_view: true,
        role_permission_add: true,
        role_permission_update: true,
        offices_view: true,
        offices_add: true,
        offices_update: true,
        parks_view: true,
        parks_add: true,
        parks_update: true,
        system_report_view: true,
        alerts_view: true,
        office_attendance_view: true,
        office_attendance_add: true,
        office_attendance_update: true,
        office_footfall_view: true,
        office_footfall_add: true,
        office_footfall_update: true,
        office_sentimental_view: true,
        office_sentimental_add: true,
        office_sentimental_update: true,
        park_attendance_view: true,
        park_attendance_add: true,
        park_attendance_update: true,
        park_footfall_view: true,
        park_footfall_add: true,
        park_footfall_update: true,
        park_sentimental_view: true,
        park_sentimental_add: true,
        park_sentimental_update: true,
        park_irrigation_view: true,
        park_irrigation_add: true,
        park_irrigation_update: true,
        park_landscaping_view: true,
        park_landscaping_add: true,
        park_landscaping_update: true,
        park_litter_detection_view: true,
        park_litter_detection_add: true,
        park_litter_detection_update: true,
        park_intrusion_detection_view: true,
        park_intrusion_detection_add: true,
        park_intrusion_detection_update: true,
        park_smoking_detection_view: true,
        park_smoking_detection_add: true,
        park_smoking_detection_update: true,
        my_account_view: true,
        settings_view: true,
      },
    }),
    prisma.users_permissions.create({
      data: {
        role_Id: roles[1].Id, // Manager permissions
        dashboard_view: true,
        role_permission_view: false,
        role_permission_add: false,
        role_permission_update: false,
        offices_view: true,
        offices_add: false,
        offices_update: false,
        parks_view: true,
        parks_add: false,
        parks_update: false,
        system_report_view: true,
        alerts_view: true,
        office_attendance_view: true,
        office_attendance_add: true,
        office_attendance_update: true,
        office_footfall_view: true,
        office_footfall_add: false,
        office_footfall_update: false,
        office_sentimental_view: true,
        office_sentimental_add: false,
        office_sentimental_update: false,
        park_attendance_view: true,
        park_attendance_add: true,
        park_attendance_update: true,
        park_footfall_view: true,
        park_footfall_add: false,
        park_footfall_update: false,
        park_sentimental_view: true,
        park_sentimental_add: false,
        park_sentimental_update: false,
        park_irrigation_view: true,
        park_irrigation_add: false,
        park_irrigation_update: false,
        park_landscaping_view: true,
        park_landscaping_add: false,
        park_landscaping_update: false,
        park_litter_detection_view: true,
        park_litter_detection_add: false,
        park_litter_detection_update: false,
        park_intrusion_detection_view: true,
        park_intrusion_detection_add: false,
        park_intrusion_detection_update: false,
        park_smoking_detection_view: true,
        park_smoking_detection_add: false,
        park_smoking_detection_update: false,
        my_account_view: true,
        settings_view: false,
      },
    }),
    prisma.users_permissions.create({
      data: {
        role_Id: roles[2].Id, // Employee permissions
        dashboard_view: true,
        role_permission_view: false,
        role_permission_add: false,
        role_permission_update: false,
        offices_view: false,
        offices_add: false,
        offices_update: false,
        parks_view: false,
        parks_add: false,
        parks_update: false,
        system_report_view: false,
        alerts_view: false,
        office_attendance_view: false,
        office_attendance_add: false,
        office_attendance_update: false,
        office_footfall_view: false,
        office_footfall_add: false,
        office_footfall_update: false,
        office_sentimental_view: false,
        office_sentimental_add: false,
        office_sentimental_update: false,
        park_attendance_view: false,
        park_attendance_add: false,
        park_attendance_update: false,
        park_footfall_view: false,
        park_footfall_add: false,
        park_footfall_update: false,
        park_sentimental_view: false,
        park_sentimental_add: false,
        park_sentimental_update: false,
        park_irrigation_view: false,
        park_irrigation_add: false,
        park_irrigation_update: false,
        park_landscaping_view: false,
        park_landscaping_add: false,
        park_landscaping_update: false,
        park_litter_detection_view: false,
        park_litter_detection_add: false,
        park_litter_detection_update: false,
        park_intrusion_detection_view: false,
        park_intrusion_detection_add: false,
        park_intrusion_detection_update: false,
        park_smoking_detection_view: false,
        park_smoking_detection_add: false,
        park_smoking_detection_update: false,
        my_account_view: true,
        settings_view: false,
      },
    }),
  ]);

  // Seed offices
  console.log('Seeding offices...');
  const offices = await Promise.all([
    prisma.offices.create({
      data: {
        office_Id: 'OFF001',
        office_english_name: 'Main Office Building',
        office_arabic_name: 'المبنى الرئيسي للمكتب',
        image: 'office1.jpg',
        latitude: 25.2048,
        longitude: 55.2708,
      },
    }),
    prisma.offices.create({
      data: {
        office_Id: 'OFF002',
        office_english_name: 'Branch Office',
        office_arabic_name: 'مكتب الفرع',
        image: 'office2.jpg',
        latitude: 25.1972,
        longitude: 55.2744,
      },
    }),
    prisma.offices.create({
      data: {
        office_Id: 'OFF003',
        office_english_name: 'Regional Office',
        office_arabic_name: 'المكتب الإقليمي',
        image: 'office3.jpg',
        latitude: 25.2285,
        longitude: 55.2867,
      },
    }),
  ]);

  // Seed parks
  console.log('Seeding parks...');
  const parks = await Promise.all([
    prisma.parks.create({
      data: {
        park_Id: 'PARK001',
        park_english_name: 'Central Park',
        park_arabic_name: 'الحديقة المركزية',
        image: 'park1.jpg',
        latitude: 25.2048,
        longitude: 55.2708,
      },
    }),
    prisma.parks.create({
      data: {
        park_Id: 'PARK002',
        park_english_name: 'Riverside Park',
        park_arabic_name: 'حديقة النهر',
        image: 'park2.jpg',
        latitude: 25.1972,
        longitude: 55.2744,
      },
    }),
    prisma.parks.create({
      data: {
        park_Id: 'PARK003',
        park_english_name: 'Mountain View Park',
        park_arabic_name: 'حديقة إطلالة الجبل',
        image: 'park3.jpg',
        latitude: 25.2285,
        longitude: 55.2867,
      },
    }),
  ]);

  // Seed office_streams
  console.log('Seeding office_streams...');
  await Promise.all([
    prisma.office_streams.create({
      data: {
        office_Id: offices[0].Id,
        stream_url: 'rtsp://192.168.1.100:554/stream1',
        stream_api_key: 'api_key_001',
        stream_path: '/streams/office1',
        password: 'password123',
      },
    }),
    prisma.office_streams.create({
      data: {
        office_Id: offices[1].Id,
        stream_url: 'rtsp://192.168.1.101:554/stream1',
        stream_api_key: 'api_key_002',
        stream_path: '/streams/office2',
        password: 'password456',
      },
    }),
    prisma.office_streams.create({
      data: {
        office_Id: offices[2].Id,
        stream_url: 'rtsp://192.168.1.102:554/stream1',
        stream_api_key: 'api_key_003',
        stream_path: '/streams/office3',
        password: 'password789',
      },
    }),
  ]);

  // Seed park_streams
  console.log('Seeding park_streams...');
  await Promise.all([
    prisma.park_streams.create({
      data: {
        park_Id: parks[0].Id,
        stream_url: 'rtsp://192.168.2.100:554/stream1',
        stream_api_key: 'park_api_key_001',
        stream_path: '/streams/park1',
        password: 'park_password123',
      },
    }),
    prisma.park_streams.create({
      data: {
        park_Id: parks[1].Id,
        stream_url: 'rtsp://192.168.2.101:554/stream1',
        stream_api_key: 'park_api_key_002',
        stream_path: '/streams/park2',
        password: 'park_password456',
      },
    }),
    prisma.park_streams.create({
      data: {
        park_Id: parks[2].Id,
        stream_url: 'rtsp://192.168.2.102:554/stream1',
        stream_api_key: 'park_api_key_003',
        stream_path: '/streams/park3',
        password: 'park_password789',
      },
    }),
  ]);

  // Seed offices_cameras
  console.log('Seeding offices_cameras...');
  const officeCameras = await Promise.all([
    prisma.offices_cameras.create({
      data: {
        office_Id: offices[0].Id,
        camera_Id: 'CAM001',
        camera_english_name: 'Main Entrance Camera',
        camera_arabic_name: 'كاميرا المدخل الرئيسي',
        latitude: 25.2048,
        longitude: 55.2708,
        ip_address: '192.168.1.10',
        last_active_date: new Date(),
        last_active_time: new Date(),
        status: 'Active',
      },
    }),
    prisma.offices_cameras.create({
      data: {
        office_Id: offices[0].Id,
        camera_Id: 'CAM002',
        camera_english_name: 'Reception Camera',
        camera_arabic_name: 'كاميرا الاستقبال',
        latitude: 25.2049,
        longitude: 55.2709,
        ip_address: '192.168.1.11',
        last_active_date: new Date(),
        last_active_time: new Date(),
        status: 'Active',
      },
    }),
    prisma.offices_cameras.create({
      data: {
        office_Id: offices[1].Id,
        camera_Id: 'CAM003',
        camera_english_name: 'Security Camera',
        camera_arabic_name: 'كاميرا الأمن',
        latitude: 25.1972,
        longitude: 55.2744,
        ip_address: '192.168.1.12',
        last_active_date: new Date(),
        last_active_time: new Date(),
        status: 'Active',
      },
    }),
  ]);

  // Seed park_cameras
  console.log('Seeding park_cameras...');
  const parkCameras = await Promise.all([
    prisma.park_cameras.create({
      data: {
        park_Id: parks[0].Id,
        camera_Id: 'PCAM001',
        camera_english_name: 'Park Entrance Camera',
        camera_arabic_name: 'كاميرا مدخل الحديقة',
        latitude: 25.2048,
        longitude: 55.2708,
        ip_address: '192.168.2.10',
        last_active_date: new Date(),
        last_active_time: new Date(),
        status: 'Active',
      },
    }),
    prisma.park_cameras.create({
      data: {
        park_Id: parks[0].Id,
        camera_Id: 'PCAM002',
        camera_english_name: 'Playground Camera',
        camera_arabic_name: 'كاميرا الملعب',
        latitude: 25.2049,
        longitude: 55.2709,
        ip_address: '192.168.2.11',
        last_active_date: new Date(),
        last_active_time: new Date(),
        status: 'Active',
      },
    }),
    prisma.park_cameras.create({
      data: {
        park_Id: parks[1].Id,
        camera_Id: 'PCAM003',
        camera_english_name: 'Walking Path Camera',
        camera_arabic_name: 'كاميرا مسار المشي',
        latitude: 25.1972,
        longitude: 55.2744,
        ip_address: '192.168.2.12',
        last_active_date: new Date(),
        last_active_time: new Date(),
        status: 'Active',
      },
    }),
  ]);

  // Seed park_zones
  console.log('Seeding park_zones...');
  const parkZones = await Promise.all([
    prisma.park_zones.create({
      data: {
        park_Id: parks[0].Id,
        zone_Id: 'ZONE001',
        zone_english_name: 'Playground Zone',
        zone_arabic_name: 'منطقة الملعب',
        latitude: 25.2048,
        longitude: 55.2708,
        device_ip: '192.168.3.10',
        web_api: 'http://192.168.3.10/api',
        status: 'Active',
      },
    }),
    prisma.park_zones.create({
      data: {
        park_Id: parks[0].Id,
        zone_Id: 'ZONE002',
        zone_english_name: 'Garden Zone',
        zone_arabic_name: 'منطقة الحديقة',
        latitude: 25.2049,
        longitude: 55.2709,
        device_ip: '192.168.3.11',
        web_api: 'http://192.168.3.11/api',
        status: 'Active',
      },
    }),
    prisma.park_zones.create({
      data: {
        park_Id: parks[1].Id,
        zone_Id: 'ZONE003',
        zone_english_name: 'Walking Zone',
        zone_arabic_name: 'منطقة المشي',
        latitude: 25.1972,
        longitude: 55.2744,
        device_ip: '192.168.3.12',
        web_api: 'http://192.168.3.12/api',
        status: 'Active',
      },
    }),
  ]);

  // Seed offices_attendance
  console.log('Seeding offices_attendance...');
  await Promise.all([
    prisma.offices_attendance.create({
      data: {
        office_Id: offices[0].Id,
        person_Id: 'P001',
        attendance_of: 'employee',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_out_date: new Date(),
        check_out_time: new Date(),
        snap_shot: 'attendance1.jpg',
        mood: 'Happy',
      },
    }),
    prisma.offices_attendance.create({
      data: {
        office_Id: offices[0].Id,
        person_Id: 'P002',
        attendance_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_out_date: new Date(),
        check_out_time: new Date(),
        snap_shot: 'attendance2.jpg',
        mood: 'Neutral',
      },
    }),
    prisma.offices_attendance.create({
      data: {
        office_Id: offices[1].Id,
        person_Id: 'P003',
        attendance_of: 'employee',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_out_date: new Date(),
        check_out_time: new Date(),
        snap_shot: 'attendance3.jpg',
        mood: 'Happy',
      },
    }),
  ]);

  // Seed parks_attendance
  console.log('Seeding parks_attendance...');
  await Promise.all([
    prisma.parks_attendance.create({
      data: {
        park_Id: parks[0].Id,
        person_Id: 'P004',
        attendance_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_out_date: new Date(),
        check_out_time: new Date(),
        snap_shot: 'park_attendance1.jpg',
        mood: 'Happy',
      },
    }),
    prisma.parks_attendance.create({
      data: {
        park_Id: parks[0].Id,
        person_Id: 'P005',
        attendance_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_out_date: new Date(),
        check_out_time: new Date(),
        snap_shot: 'park_attendance2.jpg',
        mood: 'Happy',
      },
    }),
    prisma.parks_attendance.create({
      data: {
        park_Id: parks[1].Id,
        person_Id: 'P006',
        attendance_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_out_date: new Date(),
        check_out_time: new Date(),
        snap_shot: 'park_attendance3.jpg',
        mood: 'Neutral',
      },
    }),
  ]);

  // Seed offices_sentiment_analysis
  console.log('Seeding offices_sentiment_analysis...');
  await Promise.all([
    prisma.offices_sentiment_analysis.create({
      data: {
        office_Id: offices[0].Id,
        person_Id: 'P007',
        sentiment_of: 'employee',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_in_sentiment: 'Positive',
        entry_camera_Id: officeCameras[0].Id,
        check_out_date: new Date(),
        check_out_time: new Date(),
        check_out_capture: 'sentiment1.jpg',
        exit_camera_Id: officeCameras[1].Id,
      },
    }),
    prisma.offices_sentiment_analysis.create({
      data: {
        office_Id: offices[0].Id,
        person_Id: 'P008',
        sentiment_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_in_sentiment: 'Neutral',
        entry_camera_Id: officeCameras[0].Id,
        check_out_date: new Date(),
        check_out_time: new Date(),
        check_out_capture: 'sentiment2.jpg',
        exit_camera_Id: officeCameras[1].Id,
      },
    }),
    prisma.offices_sentiment_analysis.create({
      data: {
        office_Id: offices[1].Id,
        person_Id: 'P009',
        sentiment_of: 'employee',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_in_sentiment: 'Positive',
        entry_camera_Id: officeCameras[2].Id,
        check_out_date: new Date(),
        check_out_time: new Date(),
        check_out_capture: 'sentiment3.jpg',
        exit_camera_Id: officeCameras[2].Id,
      },
    }),
  ]);

  // Seed parks_sentiment_analysis
  console.log('Seeding parks_sentiment_analysis...');
  await Promise.all([
    prisma.parks_sentiment_analysis.create({
      data: {
        park_Id: parks[0].Id,
        person_Id: 'P010',
        sentiment_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_in_sentiment: 'Positive',
        entry_camera_Id: parkCameras[0].Id,
        check_out_date: new Date(),
        check_out_time: new Date(),
        check_out_capture: 'park_sentiment1.jpg',
        exit_camera_Id: parkCameras[1].Id,
      },
    }),
    prisma.parks_sentiment_analysis.create({
      data: {
        park_Id: parks[0].Id,
        person_Id: 'P011',
        sentiment_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_in_sentiment: 'Positive',
        entry_camera_Id: parkCameras[0].Id,
        check_out_date: new Date(),
        check_out_time: new Date(),
        check_out_capture: 'park_sentiment2.jpg',
        exit_camera_Id: parkCameras[1].Id,
      },
    }),
    prisma.parks_sentiment_analysis.create({
      data: {
        park_Id: parks[1].Id,
        person_Id: 'P012',
        sentiment_of: 'visitor',
        check_in_date: new Date(),
        check_in_time: new Date(),
        check_in_sentiment: 'Neutral',
        entry_camera_Id: parkCameras[2].Id,
        check_out_date: new Date(),
        check_out_time: new Date(),
        check_out_capture: 'park_sentiment3.jpg',
        exit_camera_Id: parkCameras[2].Id,
      },
    }),
  ]);

  // Seed parks_behaviour_alerts
  console.log('Seeding parks_behaviour_alerts...');
  await Promise.all([
    prisma.parks_behaviour_alerts.create({
      data: {
        park_Id: parks[0].Id,
        person_Id: 'P013',
        camera_Id: parkCameras[0].Id,
        detected_behaviour: 'Running in restricted area',
        snap_shot: 'behaviour1.jpg',
      },
    }),
    prisma.parks_behaviour_alerts.create({
      data: {
        park_Id: parks[0].Id,
        person_Id: 'P014',
        camera_Id: parkCameras[1].Id,
        detected_behaviour: 'Climbing on equipment',
        snap_shot: 'behaviour2.jpg',
      },
    }),
    prisma.parks_behaviour_alerts.create({
      data: {
        park_Id: parks[1].Id,
        person_Id: 'P015',
        camera_Id: parkCameras[2].Id,
        detected_behaviour: 'Littering',
        snap_shot: 'behaviour3.jpg',
      },
    }),
  ]);

  // Seed parks_intrusion_detection
  console.log('Seeding parks_intrusion_detection...');
  await Promise.all([
    prisma.parks_intrusion_detection.create({
      data: {
        park_Id: parks[0].Id,
        location: 'North Gate',
        camera_Id: parkCameras[0].Id,
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'intrusion1.jpg',
        posted_to_intranet_date: new Date(),
        posted_to_intranet_time: new Date(),
      },
    }),
    prisma.parks_intrusion_detection.create({
      data: {
        park_Id: parks[0].Id,
        location: 'South Gate',
        camera_Id: parkCameras[1].Id,
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'intrusion2.jpg',
        posted_to_intranet_date: new Date(),
        posted_to_intranet_time: new Date(),
      },
    }),
    prisma.parks_intrusion_detection.create({
      data: {
        park_Id: parks[1].Id,
        location: 'East Gate',
        camera_Id: parkCameras[2].Id,
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'intrusion3.jpg',
        posted_to_intranet_date: new Date(),
        posted_to_intranet_time: new Date(),
      },
    }),
  ]);

  // Seed parks_smoking_detection
  console.log('Seeding parks_smoking_detection...');
  await Promise.all([
    prisma.parks_smoking_detection.create({
      data: {
        park_Id: parks[0].Id,
        location: 'Playground Area',
        camera_Id: parkCameras[0].Id,
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'smoking1.jpg',
        posted_to_intranet_date: new Date(),
        posted_to_intranet_time: new Date(),
      },
    }),
    prisma.parks_smoking_detection.create({
      data: {
        park_Id: parks[0].Id,
        location: 'Garden Area',
        camera_Id: parkCameras[1].Id,
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'smoking2.jpg',
        posted_to_intranet_date: new Date(),
        posted_to_intranet_time: new Date(),
      },
    }),
    prisma.parks_smoking_detection.create({
      data: {
        park_Id: parks[1].Id,
        location: 'Walking Path',
        camera_Id: parkCameras[2].Id,
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'smoking3.jpg',
        posted_to_intranet_date: new Date(),
        posted_to_intranet_time: new Date(),
      },
    }),
  ]);

  // Seed parks_landscaping
  console.log('Seeding parks_landscaping...');
  await Promise.all([
    prisma.parks_landscaping.create({
      data: {
        park_Id: parks[0].Id,
        case_Id: 'LAND001',
        location: 'Main Garden',
        snap_shot: 'landscaping1.jpg',
        type: 'Tree Trimming',
        status: 'Completed',
      },
    }),
    prisma.parks_landscaping.create({
      data: {
        park_Id: parks[0].Id,
        case_Id: 'LAND002',
        location: 'Flower Beds',
        snap_shot: 'landscaping2.jpg',
        type: 'Flower Planting',
        status: 'In Progress',
      },
    }),
    prisma.parks_landscaping.create({
      data: {
        park_Id: parks[1].Id,
        case_Id: 'LAND003',
        location: 'Pathway',
        snap_shot: 'landscaping3.jpg',
        type: 'Path Maintenance',
        status: 'Scheduled',
      },
    }),
  ]);

  // Seed parks_litter_detection
  console.log('Seeding parks_litter_detection...');
  await Promise.all([
    prisma.parks_litter_detection.create({
      data: {
        park_Id: parks[0].Id,
        case_Id: 'LITTER001',
        location: 'Playground',
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'litter1.jpg',
        status: 'Cleaned',
      },
    }),
    prisma.parks_litter_detection.create({
      data: {
        park_Id: parks[0].Id,
        case_Id: 'LITTER002',
        location: 'Picnic Area',
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'litter2.jpg',
        status: 'Pending',
      },
    }),
    prisma.parks_litter_detection.create({
      data: {
        park_Id: parks[1].Id,
        case_Id: 'LITTER003',
        location: 'Walking Path',
        occurrence_date: new Date(),
        occurrence_time: new Date(),
        snap_shot: 'litter3.jpg',
        status: 'In Progress',
      },
    }),
  ]);

  // Seed parks_irrigation_job_history
  console.log('Seeding parks_irrigation_job_history...');
  await Promise.all([
    prisma.parks_irrigation_job_history.create({
      data: {
        park_Id: parks[0].Id,
        zone_Id: parkZones[0].Id,
        job_Id: 'IRR001',
        job_completed_at: new Date(),
        job_status: 'Completed',
      },
    }),
    prisma.parks_irrigation_job_history.create({
      data: {
        park_Id: parks[0].Id,
        zone_Id: parkZones[1].Id,
        job_Id: 'IRR002',
        job_completed_at: new Date(),
        job_status: 'Completed',
      },
    }),
    prisma.parks_irrigation_job_history.create({
      data: {
        park_Id: parks[1].Id,
        zone_Id: parkZones[2].Id,
        job_Id: 'IRR003',
        job_status: 'In Progress',
      },
    }),
  ]);

  // Seed live_stream_favourites
  console.log('Seeding live_stream_favourites...');
  await Promise.all([
    prisma.live_stream_favourites.create({
      data: {
        emp_Id: users[0].Id,
        park_camera_Id: parkCameras[0].Id,
      },
    }),
    prisma.live_stream_favourites.create({
      data: {
        emp_Id: users[1].Id,
        office_camera_Id: officeCameras[0].Id,
      },
    }),
    prisma.live_stream_favourites.create({
      data: {
        emp_Id: users[2].Id,
        park_camera_Id: parkCameras[1].Id,
      },
    }),
  ]);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
