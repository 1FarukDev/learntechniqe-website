/**
 * Old WordPress slug → current Sanity course slug (path segment only).
 * Used after stripping /electrician-courses/, /plc-training-courses/, or /aircon-refrig-training-courses/.
 */
export const COURSE_SLUG_ALIASES: Readonly<Record<string, string>> = {
  // --- Electrical (old slug → Sanity slug) ---
  "online-18th-edition-training-course":
    "18th-edition-wiring-regulations-online-city-guilds-2382-22",
  "18th-edition-wiring-regulations-city-and-guilds-2382-22":
    "18th-edition-wiring-regulations-city-guilds-2382-22",
  "18th-edition-wiring-regulations-2382-22-1-day-update":
    "city-guilds-2382-22-18th-edition-wiring-regulations-1-day-update",
  "online-18th-edition-update-training-course":
    "18th-edition-wiring-regulations-1-day-update-online",
  "online-18th-edition-update-training-course-arlo":
    "18th-edition-wiring-regulations-1-day-update-online",
  "2391-52-inspection-testing-course":
    "initial-periodic-inspection-testing-of-electrical-installation-city-guilds-2391-52",
  "2391-52-inspection-testing-course-2":
    "initial-periodic-inspection-testing-of-electrical-installation-city-guilds-2391-52",
  "2391-51-inspection-testing-course":
    "periodic-inspection-testing-of-electrical-installations-city-guilds-2391-51",
  "2391-51-inspection-testing-course-arlo":
    "periodic-inspection-testing-of-electrical-installations-city-guilds-2391-51",
  "2391-50-electrical-installations-course":
    "initial-verification-of-electrical-installations-city-guilds-2391-50",
  "city-guilds-2392-10": "fundamental-inspection-testing-cg-2392-10-level-2",
  "city-guilds-2396-design-and-verification":
    "design-and-verification-city-guilds-2396",
  "city-guilds-2357-03-level-3":
    "nvq-level-3-course-city-guilds-2357-03-electrical",
  "city-guilds-2346-03-level-3":
    "city-guilds-2346-03-experienced-worker-level-3-course",
  "city-guilds-2377-22-2-day":
    "in-service-inspection-testing-of-electrical-equipment-2-day-city-guilds-2377-77",
  "city-guilds-2377-22-update":
    "pat-testing-city-guilds-2377-77-2days",
  "2-day-pat-testing-course":
    "in-service-inspection-testing-of-electrical-equipment-2-day-city-guilds-2377-77",
  "2-day-pat-testing-course-arlo":
    "in-service-inspection-testing-of-electrical-equipment-2-day-city-guilds-2377-77",
  "3-day-pat-testing-course": "pat-testing-city-guilds-2377-77",
  "online-pat-testing-course": "pat-testing-city-guilds-2377-77-2days",
  "total-industrial-electrical-maintenance": "total-industrial-electrical-maintenance-10",
  "total-industrial-electrical-maintenance-arlo":
    "total-industrial-electrical-maintenance-10",
  "basic-electrical-generic-module-module-1": "basic-electrical-course-module-1",
  "city-guilds-2383-10":
    "building-regulations-for-electrical-installations-in-dwellings-city-guilds-2383-10",
  "city-guilds-2365": "city-guilds-2365-02",
  "city-guilds-2365-level-3-arlo": "city-guilds-2365-03",
  "eicr-form-filling-course-for-electricians":
    "eicr-form-filling-for-electricians-training-course",
  "fire-alarms-bs-5839":
    "level-3-fire-alarm-systems-for-buildings-bs-5839-installation",
  "fire-alarm-systems-bs-5839-1":
    "level-3-fire-alarm-systems-for-buildings-bs-5839-installation",
  "refrigeration-electrics": "refrigeration-electrics-maintenance-course2",
  "refrigeration-electrics-maintenance-course":
    "refrigeration-electrics-maintenance-course",
  "pipework-and-brazing": "pipework-brazing-course-city-guilds",
  "hydrocarbon-refrigeration": "level-2-award-hydrocarbon-refrigeration-city-guilds",
  "hydrocarbon-refrigeration-arlo":
    "level-2-award-hydrocarbon-refrigeration-city-guilds",
  "f-gas-regulations": "f-gas-regulations-course-5-day-city-guilds",
  "f-gas-regulations-3-day-2": "f-gas-regulations-course-3-day-city-guilds",
  "total-air-conditioning-refrigeration":
    "total-air-conditioning-refrigeration-10-tacr10",
  "total-air-conditioning-and-refrigeration-15":
    "total-air-conditioning-refrigeration-15-tacr15",
  "total-air-conditioning-and-refrigeration-20":
    "total-air-conditioning-refrigeration-20-tacr20",
  "refrigeration-aircon-heat-pump-systems-level-3":
    "refrigeration-air-conditioning-heat-pump-systems-level-3-course",
  "city-guilds-plc":
    "city-guilds-programmable-logic-controllers-only-city-guilds-plc-course",
  "plc-eal-level-3-qualification":
    "robotics-automation-eal-level-3-modular-course",
  "plc-scada-courses": "programmable-logic-controllers-scada-3-day-course",
  "plc-siemens": "programmable-logic-controllers-siemens-all-models-available",
  "plc-allen-bradley":
    "programmable-logic-controllers-allen-bradley-all-models-available",
  "plc-mitsubishi": "programmable-logic-controllers-mitsubishi-all-models-available",
  "plc-18": "programmable-logic-controllers-18",
  "plc-15": "programmable-logic-controllers-15",
  "plc-15-arlo": "programmable-logic-controllers-15",
  "plc-13": "programmable-logic-controllers-13",
  "plc-total-industrial-electrical-maintenance": "plc-electrical-maintenance",
  "robotics-courses": "robotic-courses",
  "plc-scada-communications": "scada-plc-communications-5-day-course",
  "plc-scada-communications-arlo": "scada-plc-communications-5-day-course",
  "evening-online-plc-training-arlo":
    "programmable-logic-controllers-beginner-perfect-experience-newcomer-plc",
  "online-plc-training-2-arlo":
    "programmable-logic-controllers-beginner-perfect-experience-newcomer-plc",
  "programmable-logic-controllers-advanced":
    "programmable-logic-controllers-advanced-experience-course",
  "programmable-logic-controllers-beginner":
    "programmable-logic-controllers-beginner-perfect-experience-newcomer-plc",
  "programmable-logic-controllers-intermediate":
    "programmable-logic-controllers-intermediate-up-skill-your-plc-knowledge",
  "industrial-networking": "industrial-networking-technical-course",
  "scada-supervisory-control-and-data-acquisition-course":
    "programmable-logic-controllers-scada-3-day-course",
  "scada-hmi-communications": "scada-hmi-communications-5-day-course",
};

/** Sanity `course` slugs — used to map old root URLs like /domestic-electrical-installer → /courses/... */
export const KNOWN_COURSE_SLUGS = new Set<string>([
  "18th-edition-wiring-regulations-1-day-update-online",
  "18th-edition-wiring-regulations-city-guilds-2382-22",
  "18th-edition-wiring-regulations-online-city-guilds-2382-22",
  "5-day-beginner-industrial-robotics-course",
  "basic-electrical-course-module-1",
  "building-regulations-for-electrical-installations-in-dwellings-city-guilds-2383-10",
  "central-heating-controls-wiring-and-fault-finding",
  "city-guilds-2346-03-experienced-worker-level-3-course",
  "city-guilds-2365-02",
  "city-guilds-2365-03",
  "city-guilds-2382-22-18th-edition-wiring-regulations-1-day-update",
  "city-guilds-combined",
  "city-guilds-programmable-logic-controllers-only-city-guilds-plc-course",
  "commercial-electrical-installer",
  "design-and-verification-city-guilds-2396",
  "design-installation-domestic-small-commercial-electric-vehicle-charging-city-guilds-2921-34-level-3",
  "domestic-burglar-alarm-systems-module-3",
  "domestic-commercial-industrial-electric-vehicle-charging-equipment-installation-eal-level-3",
  "domestic-electrical-installer",
  "domestic-ventilation-systems",
  "domestic-wiring-circuits-module-2",
  "eicr-form-filling-for-electricians-training-course",
  "emergency-lighting-bs-5266",
  "essential-electrics-fundamental-skills",
  "f-gas-regulations-course-3-day-city-guilds",
  "f-gas-regulations-course-5-day-city-guilds",
  "fundamental-inspection-testing-cg-2392-10-level-2",
  "in-service-inspection-testing-of-electrical-equipment-2-day-city-guilds-2377-77",
  "industrial-electrical-maintenance-module-4",
  "industrial-electrical-maintenance-module-5",
  "industrial-networking-technical-course",
  "initial-periodic-inspection-testing-of-electrical-installation-city-guilds-2391-52",
  "initial-verification-of-electrical-installations-city-guilds-2391-50",
  "level-2-award-hydrocarbon-refrigeration-city-guilds",
  "level-3-fire-alarm-systems-for-buildings-bs-5839-installation",
  "lightning-protection-technical-standards",
  "low-voltage-authorised-person-training-aplv",
  "nvq-level-3-course-city-guilds-2357-03-electrical",
  "pat-testing-city-guilds-2377-77",
  "pat-testing-city-guilds-2377-77-2days",
  "periodic-inspection-testing-of-electrical-installations-city-guilds-2391-51",
  "pipework-brazing-course-city-guilds",
  "plc-electrical-maintenance",
  "programmable-logic-controllers-10",
  "programmable-logic-controllers-13",
  "programmable-logic-controllers-15",
  "programmable-logic-controllers-18",
  "programmable-logic-controllers-advanced-experience-course",
  "programmable-logic-controllers-allen-bradley-all-models-available",
  "programmable-logic-controllers-beginner-perfect-experience-newcomer-plc",
  "programmable-logic-controllers-intermediate-up-skill-your-plc-knowledge",
  "programmable-logic-controllers-mitsubishi-all-models-available",
  "programmable-logic-controllers-scada-3-day-course",
  "programmable-logic-controllers-siemens-all-models-available",
  "refrigeration-air-conditioning-heat-pump-systems-level-3-course",
  "refrigeration-electrics-maintenance-course",
  "refrigeration-electrics-maintenance-course2",
  "robotic-courses",
  "robotics-automation-eal-level-3-modular-course",
  "scada-hmi-communications-5-day-course",
  "scada-plc-communications-5-day-course",
  "thermal-imaging-diagnostic-training",
  "total-air-conditioning-refrigeration-10-tacr10",
  "total-air-conditioning-refrigeration-15-tacr15",
  "total-air-conditioning-refrigeration-20-tacr20",
  "total-electrical-20",
  "total-industrial-electrical-maintenance-10",
  "total-industrial-electrical-maintenance-13",
  "total-industrial-electrical-maintenance-15",
  "total-industrial-electrical-maintenance-20",
  "am2-assessment",
]);

/** Exact path (lowercase, no trailing slash except "/") → pathname (no hash). */
export const EXACT_PATH_REDIRECTS: Readonly<Record<string, string>> = {
  "/meet-our-team": "/company",
  "/careers": "/company",
  "/careers-at-technique": "/company",
  "/faq": "/company",
  "/our-services": "/courses",
  "/checkatrade": "/company",
  "/my-account": "/contact",
  "/online-training-courses": "/courses",
  "/health-safety": "/blog/health-safety",
  "/microsoft-365-training": "/blog/microsoft-365-training",
  "/european-computer-driving-licence-ecdl-course":
    "/blog/european-computer-driving-licence-ecdl-course",
  "/technique-blog": "/blog",
  "/technique_courses/plc-training-courses": "/courses/plc",
  "/refrigeration-and-air-conditioning-courses": "/courses/aircon-refrigeration",
  "/fgas-tacr-training-courses": "/courses/aircon-refrigeration",
  "/gas-courses": "/courses/aircon-refrigeration",
  "/documents": "/contact",
  "/images/map.pdf": "/company",
  "/oa": "/",
  "/privacy-policy": "/privacy-policy",
  "/terms-and-conditions": "/terms-and-conditions",
  // Root marketing URLs → canonical course URLs
  "/plc10-10-day-eal-level-3-plc-training-course":
    "/courses/plc/programmable-logic-controllers-10",
  "/plc13-13-day-plc-18th-edition-training-course":
    "/courses/plc/programmable-logic-controllers-13",
  "/total-industrial-electrical-maintenance-tiem10-10-day-training-course":
    "/courses/electrical/total-industrial-electrical-maintenance-10",
  "/total-industrial-electrical-maintenance-tiem20-20-day-training-course":
    "/courses/electrical/total-industrial-electrical-maintenance-20",
  "/refrigeration-air-conditioning-heat-pump-15-day-training-course":
    "/courses/aircon-refrigeration/total-air-conditioning-refrigeration-15-tacr15",
  "/refrigeration-electrics-maintenance-5-day-training-course":
    "/courses/electrical/refrigeration-electrics-maintenance-course",
  "/am2-assessment-technique-learning-solutions":
    "/courses/electrical/am2-assessment",
  "/18th-edition-online-course":
    "/courses/electrical/18th-edition-wiring-regulations-online-city-guilds-2382-22",
  "/online-18th-edition-wiring-regulations-2382-22":
    "/courses/electrical/18th-edition-wiring-regulations-online-city-guilds-2382-22",
  "/18th-edition-wiring-regulations-2382-22":
    "/courses/electrical/18th-edition-wiring-regulations-city-guilds-2382-22",
  "/pat-testing-course-city-guilds-2377":
    "/courses/electrical/pat-testing-city-guilds-2377-77",
  "/portable-appliance-testing-stirling-venue":
    "/courses/electrical/pat-testing-city-guilds-2377-77",
  "/electrical-training-level3-nvq3-am2": "/pathways",
  "/electrical-training-courses-tec20-dei-2365-2391-nvq-am2": "/pathways",
  "/on-site-training-courses-technique-learning-solutions": "/courses",
  "/plc-hmi-scada-training-courses": "/courses/plc",
  "/plc-city-guilds-beginner-allen-bradley-5-day-course":
    "/courses/plc/programmable-logic-controllers-allen-bradley-all-models-available",
  "/plc-beginner-5-day-training-course":
    "/courses/plc/programmable-logic-controllers-beginner-perfect-experience-newcomer-plc",
  "/programmable-logic-controllers-training-aberdeen-venue": "/courses/plc",
  "/city-guilds-7543-01-basic-mobile-air-conditioning":
    "/courses/aircon-refrigeration/refrigeration-air-conditioning-heat-pump-systems-level-3-course",
  "/water-regulations-course": "/courses",
  "/gas-safe-course-acs-renewal": "/courses/aircon-refrigeration",
  "/gas-safe-course-acs-initial": "/courses/aircon-refrigeration",
  "/unvented-hot-water-heating": "/courses",
  "/unvented-hot-water-heating-arlo": "/courses",
  "/managed-learning-programme-for-experienced-trades": "/courses",
  "/managed-learning-programme-for-new-entrants": "/courses",
  "/smart-meter-installer-to-domestic-gas-engineer": "/courses",
  "/gucsk": "/courses",
};

/**
 * Single path segment at domain root: do not treat as a blog slug (handled elsewhere or hub).
 */
export const RESERVED_ROOT_SEGMENTS = new Set([
  "courses",
  "company",
  "contact",
  "blog",
  "pathways",
  "career",
  "privacy-policy",
  "terms-and-conditions",
  "robots.txt",
  "sitemap.xml",
  "api",
  "wp-content",
  "documents",
  "images",
  "category",
  "testimonial",
  "electrician-courses",
  "plc-training-courses",
  "aircon-refrig-training-courses",
  "gas-courses",
  "technique-blog",
  "technique_trainarea",
  "technique_courses",
  "locations",
  "accommodation",
  "venues",
  "faq",
  "our-services",
  "checkatrade",
  "my-account",
  "users",
  "oa",
  "elcas-funded-training-courses-armed-forces",
  "technique-way-forward-elcas-users",
  "page",
  "author",
  "feed",
  "wp-admin",
  "wp-login.php",
  "_next",
]);
