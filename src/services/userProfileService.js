import dbContext, { asyncDbContext, Domains } from "../database/dbContext";
import request from "./requestService";
function get() {
  return asyncDbContext().then(realm => {
    const newProfile = {
      id: 0,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      picture: "",
      registerDate: null,
      token: "",
      activationCode: "",
      companyName: "",
      tenantId: "",
      password: "",
      position: "",
      defaultMethod: 0,
      IMEI: "0000",
      roles: ""
    };
    let profile = realm.objects(Domains.UserProfile).slice(0, 1);
    if (profile && profile.length > 0) return { ...profile[0] };
    else {
      
      realm.write(() => {
        const p = dbContext.create(Domains.UserProfile, newProfile, true);
      });
    }
    realm.close();
    return { ...newProfile };
  }).catch(error=>{
    Promise.reject(error);
  });
}
function getFromCloud() {
  return request(
    {
      url: "/api/v1/account/GetProfile",
      method: "GET"
    },
    true
  )
    .then(response => {
      return response;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
function update(model) {
  return asyncDbContext().then(realm => {
    realm.write(()=>{
      const p = realm.create(
        Domains.UserProfile,
        {
          ...model,
          id: 0
        },
        true
      );
      console.log("Update Profile:", { ...p });
    })
    realm.close()
  }).catch(error=>{
    throw error;
  });
}
function isUserInRoles(userProfile, rolesArray = []) {
  if (!userProfile || !userProfile.roles) return false;
  const { roles } = userProfile;
  const userRoles = roles.split(",");
  return rolesArray.some(role => userRoles.includes(role));
}
export const UserProfileService = {
  get,
  update,
  getFromCloud,
  isUserInRoles
};
