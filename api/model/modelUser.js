// {
//   unit_id: {
//     type: String
//   },
//   title: {
//     type: String,
//       enum: ['Mr', 'Mrs', 'Dcn']
//   },
//   firstname: {
//     type: String,
//       required: true
//   },
//   lastname: {
//     type: String,
//       required: true
//   },
//   middlename: {
//     type: String
//   },
//   email: {
//     type: String,
//       required: true
//   },
//   password: {
//     type: String,
//       required: true
//   },
//   general: {
//     group: {
//       type: String
//     },
//     vocal_part: {
//       type: String,
//       enum: ['Alto', 'Suprano']
//     },
//     rehearsal_location: {
//       type: String,
//       enum: ['Iyana', 'Isashi']
//     },
//     gender:{
//       type: String,
//       enum: ['male', 'female']
//     }  
//   },
//   personal: {
//     phone: {
//       type: String
//     },
//     whatsapp_phone: {
//       type: String
//     },
//     email: {
//       type: String
//     },
//     contact_address: {
//       type: String
//     },
//     pha: {
//       type: String
//     },
//     dob: {
//       type: String
//     },
//     wed_date: {
//       type: String
//     },
//     marital_status: {
//       type: String
//     },
//     work_status: {
//       type: String
//     }, 
//     profession: {
//       type: String
//     },
//     employer_name: {
//       type: String
//     },
//     employer_address: {
//       type: String
//     },
//     state_origin: {
//       type: String
//     },
//     nationality: {
//       type: String
//     }

//   },
//   nok: {
//     name: {
//       type: String
//     },
//     address: {
//       type: String
//     },
//     phone: {
//       type: String
//     },
//     occupation: {
//       type: String
//     },
//     relation: {
//       type: String
//     },
//     email: {
//       type: String
//     }

//   },
//   choir_status: {


//   },
//   choir_roles: {
//     membership_status: {
//       type: String,
//       enum: ['member', 'ordained worker', 'pastorate']
//     },
//     leadership_status: {
//       type: String,
//       enum: ['choir_master', 'part head']
//     },
//     sub_group: {
//       type: String,
//       enum: ['music team', 'praise team', 'legal team']
//     }

//   },
//   church_info: {
//     wsf_status: {
//       type: String,
//       enum: ['home provider', 'member', 'district coordinator']
//     },
//     new_birth_year: {
//       type: String
//     },
//     holy_spirit_year: {
//       type: String
//     },
//     lfc_joined_year: {
//       type: String
//     },
//     ordination_year: {
//       type: String
//     },
//     province: {
//       type: String
//     },
//     district: {
//       type: String
//     },
//     zone: {
//       type: String
//     }
//   }
// }