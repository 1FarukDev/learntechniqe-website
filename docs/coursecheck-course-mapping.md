# CourseCheck course IDs vs app (Sanity) courses

**Provider:** [Technique Training Ltd on CourseCheck](https://www.coursecheck.com/provider/188/technique-training-ltd) (company ID `188`).

## Key finding

Every course in Sanity currently has `coursecheckCourseId: null`. The app falls back to ID **4368** (`Total Electrical 20`) for CourseCheck reviews on every course page until IDs are set in the CMS.

---

## Matched courses (Sanity → CourseCheck ID)

### Air conditioning & refrigeration

| Sanity course | Slug | CourseCheck ID |
| --- | --- | --- |
| F-Gas Regulations – 3 Days | `f-gas-regulations-course-3-day-city-guilds` | **4379** |
| F-Gas Regulations – 5 Days | `f-gas-regulations-course-5-day-city-guilds` | **4364** |
| Hydrocarbon Refrigeration | `level-2-award-hydrocarbon-refrigeration-city-guilds` | **11297** |
| Pipework & Brazing | `pipework-brazing-course-city-guilds` | **4821** |
| Refrigeration, AC & Heat Pump Systems | `refrigeration-air-conditioning-heat-pump-systems-level-3-course` | **8697** |
| Total Air Conditioning & Refrigeration 10 | `total-air-conditioning-refrigeration-10-tacr10` | **4399** |
| Total Air Conditioning & Refrigeration 15 | `total-air-conditioning-refrigeration-15-tacr15` | **7798** |
| Total Air Conditioning & Refrigeration 20 | `total-air-conditioning-refrigeration-20-tacr20` | **4380** |
| Refrigeration Electrics | `refrigeration-electrics-maintenance-course2` | **5575** |
| Refrigeration Electrics Maintenance | `refrigeration-electrics-maintenance-course` | **5574** |

### Electrical

| Sanity course | Slug | CourseCheck ID |
| --- | --- | --- |
| 18th Edition Wiring Regulations | `18th-edition-wiring-regulations-city-guilds-2382-22` | **4352** |
| 18th Edition Update (1 Day Online) | `18th-edition-wiring-regulations-update-city-guilds-2382-22-update` | **4401** |
| 18th Edition Online | `18th-edition-wiring-regulations-online-city-guilds-2382-22` | **4352** |
| Authorised Person (APLV) | `low-voltage-authorised-person-training-aplv` | **13884** |
| Basic Electrical Course Module 1 | `basic-electrical-course-module-1` | **4378** |
| Building Regulations (C&G 2393-10) | `building-regulations-for-electrical-installations-in-dwellings-city-guilds-2383-10` | **4354** |
| Central Heating Controls | `central-heating-controls-wiring-and-fault-finding` | **4787** |
| City & Guilds 2365-02 | `city-guilds-2365-02-level-2-course` | **9129** |
| City & Guilds 2365-03 | `city-guilds-2365-03-level-3-course` | **9162** |
| C&G 2377-77 PAT Testing (3 Days) | `pat-testing-city-guilds-2377-77` | **8177** |
| C&G 2396 Design & Verification | `design-and-verification-city-guilds-2396` | **15652** |
| C&G 2921-34 EV Charging | `design-installation-domestic-small-commercial-electric-vehicle-charging-city-guilds-2921-34-level-3` | **4359** |
| Commercial Electrical Installer | `commercial-electrical-installer-2382-22-2377-77-2391-52` | **4561** |
| Domestic Burglar Alarm Systems | `domestic-burglar-alarm-systems-module-3` | **4788** |
| Domestic Electrical Installer | `domestic-electrical-installer-2382-22-2392-2393` | **4554** |
| Domestic Ventilation Systems | `domestic-ventilation-systems` | **13886** |
| Domestic Wiring Circuits Module 2 | `domestic-wiring-circuits-module-2` | **4398** |
| EAL Fire Alarm Systems BS 5839 | `level-3-fire-alarm-systems-for-buildings-bs-5839-installation` | **4822** |
| EAL Level 3 EV Charging | `domestic-commercial-industrial-electric-vehicle-charging-equipment-installation-eal-level-3` | **8294** |
| EICR Form Filling | `eicr-form-filling-for-electricians-training-course` | **13887** |
| Emergency Lighting | `emergency-lighting-bs-5266` | **4823** |
| Essential Electrics | `essential-electrics-fundamental-skills` | **4835** |
| Fundamental Inspection & Testing (2392-10) | `fundamental-inspection-testing-cg-2392-10-level-2` | **4370** |
| In-Service Inspection & Testing (2 Day) | `in-service-inspection-testing-of-electrical-equipment-2-day-city-guilds-2377-77` | **5187** |
| Industrial Electrical Maintenance Module 4 | `industrial-electrical-maintenance-module-4` | **5272** |
| Industrial Electrical Maintenance Module 5 | `industrial-electrical-maintenance-module-5` | **4362** |
| Initial & Periodic Inspection (2391-52) | `initial-periodic-inspection-testing-of-electrical-installation-city-guilds-2391-52` | **4038** |
| Initial Verification (2391-50) | `initial-verification-of-electrical-installations-city-guilds-2391-50` | **4418** |
| Periodic Inspection (2391-51) | `periodic-inspection-testing-of-electrical-installations-city-guilds-2391-51` | **4372** |
| Pat Testing (C&G 2377-77) | `pat-testing-city-guilds-2377-7` | **4353** |
| Thermal Imaging | `thermal-imaging-diagnostic-training` | **17573** |
| Total Electrical 20 | `total-electrical-20-20-day-full-electrical-package` | **4368** |
| Total Industrial Electrical Maintenance 10 | `total-industrial-electrical-maintenance-10-10-day-industrial-total-package` | **4363** |
| Total Industrial Electrical Maintenance 13 | `total-industrial-electrical-maintenance-13-13-day-industrial-total-package-with-18th-edition` | **5545** |
| Total Industrial Electrical Maintenance 15 | `total-industrial-electrical-maintenance-15-15-day-industrial-total-package-with-inspection-testing` | **5143** |
| Total Industrial Electrical Maintenance 20 | `total-industrial-electrical-maintenance-20-20-day-industrial-total-package-with-10-day-plc-course` | **5008** |
| AM2 Assessment (hardcoded) | `am2-assessment` | **8576** |

### PLC

| Sanity course | Slug | CourseCheck ID |
| --- | --- | --- |
| Programmable Logic Controllers (C&G) | `city-guilds-programmable-logic-controllers-only-city-guilds-plc-course` | **4420** |
| PLC - Beginner | `programmable-logic-controllers-beginner-perfect-experience-newcomer-plc` | **4455** |
| PLC - Intermediate | `programmable-logic-controllers-intermediate-up-skill-your-plc-knowledge` | **4365** |
| PLC - Advanced | `programmable-logic-controllers-advanced-experience-course` | **11341** |
| PLC - Mitsubishi | `programmable-logic-controllers-mitsubishi-all-models-available` | **4995** |
| PLC - Siemens | `programmable-logic-controllers-siemens-all-models-available` | **4419** |
| PLC 10 | `programmable-logic-controllers-10-plc10-level-3-eal-certification` | **4366** |
| PLC 13 | `programmable-logic-controllers-13-plc10-level-3-eal-certification-18th-edition` | **8070** |
| PLC 15 | `programmable-logic-controllers-15-plc10-level-3-eal-certification-plus-inspection-testing` | **4367** |
| PLC 18 | `programmable-logic-controllers-18-plc10-level-3-eal-certification-18th-edition-inspection-testing` | **4555** |
| PLC SCADA | `programmable-logic-controllers-scada-3-day-course` | **9163** |
| PLC & TIEM Training Package | `plc-total-industrial-electrical-maintenance-training-package` | **16111** |
| SCADA HMI & Communications | `scada-hmi-communications-5-day-course` | **10009** |
| SCADA PLC & Communications | `scada-plc-communications-5-day-course` | **9865** |

---

## Unmatched — in app but not on CourseCheck

| Sanity course | Slug | Notes |
| --- | --- | --- |
| City & Guilds 2346-03 Experienced Worker | `city-guilds-2346-03-experienced-worker-level-3-course` | No CourseCheck listing |
| City & Guilds 2357 Level 3 Electrical NVQ | `nvq-level-3-course-city-guilds-2357-03-electrical` | No CourseCheck listing |
| City & Guilds Combined | `city-guilds-combined` | Bundle; no single CourseCheck match |
| Industrial Networking | `industrial-networking-technical-course` | No CourseCheck listing |
| Industrial Robotics – 5 Day Beginner | `5-day-beginner-industrial-robotics-course` | No CourseCheck listing |
| Lightning Protection | `lightning-protection-technical-standards` | No CourseCheck listing |
| PLC - Allen Bradley | `programmable-logic-controllers-allen-bradley-all-models-available` | No CourseCheck listing |
| Robotic Courses | `robotic-courses` | No CourseCheck listing |
| Robotics & Automation | `robotics-automation-eal-level-3-modular-course` | No CourseCheck listing |

## Unmatched — on CourseCheck but not in app

| CourseCheck ID | Course name |
| --- | --- |
| 5486 | Basic Mobile Air Conditioning Systems |
| 4837 | F Gas Renewal 2 Day Course |
| 4836 | F Gas Renewal Course 1 Day |
| 4353 | City and Guilds 2377-22 – Portable Appliance Testing – 1 Day |
| 4360 | City and Guilds 2377-22 – Portable Appliance Testing – 2 Day |
| 5273 | Commercial |
| 5230 | Domestic |
| 4369 | EAL Inspection and Testing 4337/4338 Combined |
| 4371 | Electrical Installer Gold |
| 8804 | Online Electrified Heat |
| 8477 | Online PAT Testing Course |
| 17572 | Part F - Ventilation |
| 14412 | Safe Isolation |
| 7964 | Total Electrical 30 |
| 15933 | PLC5 - TIA Portal - Advanced |
| 15674 | TIA Portal Intermediate |

---

## Summary

| Metric | Count |
| --- | --- |
| Matched (app ↔ CourseCheck) | 60 |
| App only (no CourseCheck) | 9 |
| CourseCheck only (not in app) | 16 |

**Note:** Some mappings are judgement calls (e.g. which PAT or 18th Edition variant maps to which CourseCheck course). Verify in Sanity Studio before bulk-updating `coursecheckCourseId`.

## CourseCheck URL pattern

`https://www.coursecheck.com/course/{id}/{slug}`
