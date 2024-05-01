const facilityEnums: {
  location: { [key: number]: string };
  facilityType: { [key: number]: string };
  ownership: { [key: number]: string };
} = {
  location: {
    1: "Urban",
    2: "Rural",
    3: "Peri Urbar",
  },
  facilityType: {
    1: "1st Level Hospital",
    2: "2nd Level Hospital",
    3: "3rd Level Hospital",
    4: "Dental Clinic",
    5: "Diagnostic Centre",
    6: "Eye Clinic",
    7: "Fertility Clinic",
    8: "First-Aid Stations",
    9: "General Clinic",
    10: "Health Centre",
    11: "Health Post",
    12: "Hospice",
    13: "Mini Hospital",
    14: "Mobile Clinic",
    15: "Optic Clinics",
    16: "Rehabilitation Centre",
    17: "Specimen Collection Centre",
    18: "Others",
  },
  ownership: {
    1: "Faith Based",
    2: "Ministry Of Health",
    3: "Correctional Service",
    4: "Private",
    5: "Zambia National Service",
    6: "Zambia Defence Force",
    7: "Zambia Defence Force",
    8: "Police Service",
  },
};

export default facilityEnums;
