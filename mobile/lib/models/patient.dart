class Patient {
  final String? id;
  final String resourceType;
  final Identifier? identifier;
  final List<Name> name;
  final String gender;
  final DateTime? birthDate;
  final List<Address> address;
  final List<Telecom> telecom;

  Patient({
    this.id,
    this.resourceType = 'Patient',
    this.identifier,
    required this.name,
    required this.gender,
    this.birthDate,
    this.address = const [],
    this.telecom = const [],
  });

  factory Patient.fromJson(Map<String, dynamic> json) {
    return Patient(
      id: json['_id'],
      resourceType: json['resourceType'] ?? 'Patient',
      identifier: json['identifier'] != null 
          ? Identifier.fromJson(json['identifier']) 
          : null,
      name: (json['name'] as List<dynamic>?)
          ?.map((e) => Name.fromJson(e))
          .toList() ?? [],
      gender: json['gender'] ?? '',
      birthDate: json['birthDate'] != null 
          ? DateTime.parse(json['birthDate']) 
          : null,
      address: (json['address'] as List<dynamic>?)
          ?.map((e) => Address.fromJson(e))
          .toList() ?? [],
      telecom: (json['telecom'] as List<dynamic>?)
          ?.map((e) => Telecom.fromJson(e))
          .toList() ?? [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'resourceType': resourceType,
      'identifier': identifier?.toJson(),
      'name': name.map((e) => e.toJson()).toList(),
      'gender': gender,
      'birthDate': birthDate?.toIso8601String(),
      'address': address.map((e) => e.toJson()).toList(),
      'telecom': telecom.map((e) => e.toJson()).toList(),
    };
  }

  // Helper method to get full name
  String get fullName {
    if (name.isNotEmpty) {
      final firstName = name.first;
      return '${firstName.given.join(' ')} ${firstName.family}';
    }
    return 'Unknown Patient';
  }

  // Helper method to get age
  int? get age {
    if (birthDate != null) {
      final now = DateTime.now();
      int age = now.year - birthDate!.year;
      if (now.month < birthDate!.month || 
          (now.month == birthDate!.month && now.day < birthDate!.day)) {
        age--;
      }
      return age;
    }
    return null;
  }

  // Helper method to get primary contact
  String? get primaryEmail {
    return telecom
        .where((t) => t.system == 'email')
        .map((t) => t.value)
        .firstWhere((email) => email != null, orElse: () => null);
  }

  String? get primaryPhone {
    return telecom
        .where((t) => t.system == 'phone')
        .map((t) => t.value)
        .firstWhere((phone) => phone != null, orElse: () => null);
  }
}

class Identifier {
  final String use;
  final String? system;
  final String? value;

  Identifier({
    this.use = 'official',
    this.system,
    this.value,
  });

  factory Identifier.fromJson(Map<String, dynamic> json) {
    return Identifier(
      use: json['use'] ?? 'official',
      system: json['system'],
      value: json['value'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'use': use,
      'system': system,
      'value': value,
    };
  }
}

class Name {
  final String use;
  final String family;
  final List<String> given;

  Name({
    this.use = 'official',
    required this.family,
    required this.given,
  });

  factory Name.fromJson(Map<String, dynamic> json) {
    return Name(
      use: json['use'] ?? 'official',
      family: json['family'] ?? '',
      given: List<String>.from(json['given'] ?? []),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'use': use,
      'family': family,
      'given': given,
    };
  }
}

class Address {
  final String use;
  final List<String> line;
  final String? city;
  final String? state;
  final String? country;

  Address({
    this.use = 'home',
    required this.line,
    this.city,
    this.state,
    this.country,
  });

  factory Address.fromJson(Map<String, dynamic> json) {
    return Address(
      use: json['use'] ?? 'home',
      line: List<String>.from(json['line'] ?? []),
      city: json['city'],
      state: json['state'],
      country: json['country'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'use': use,
      'line': line,
      'city': city,
      'state': state,
      'country': country,
    };
  }

  String get fullAddress {
    final parts = <String>[];
    parts.addAll(line);
    if (city != null) parts.add(city!);
    if (state != null) parts.add(state!);
    if (country != null) parts.add(country!);
    return parts.join(', ');
  }
}

class Telecom {
  final String system;
  final String? value;
  final String use;

  Telecom({
    required this.system,
    this.value,
    this.use = 'home',
  });

  factory Telecom.fromJson(Map<String, dynamic> json) {
    return Telecom(
      system: json['system'],
      value: json['value'],
      use: json['use'] ?? 'home',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'system': system,
      'value': value,
      'use': use,
    };
  }
}
