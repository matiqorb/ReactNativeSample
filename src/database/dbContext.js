import Realm from "realm"

export class Domains{
    static UserProfile="UserProfile";
    static WifiIndicator="WifiIndicator";
    static OfflineEntry="OfflineEntry"
};

class UserProfile extends Realm.Object {}
UserProfile.schema = {
    name:Domains.UserProfile,
    primaryKey: 'id',
    properties:{
        id:"int",
        firstName:"string",
        lastName:"string",
        phoneNumber:"string",
        picture:"data?",
        registerDate:"date?",
        token:"string",
        activationCode:"string",
        companyName:"string?",
        position:"string?",
        password:"string?",
        tenantId:"string?",
        defaultMethod:"int",
        IMEI:"string?",
        roles:"string"
    }
};
class WifiIndicator extends Realm.Object {}
WifiIndicator.schema = {
    name:Domains.WifiIndicator,
    properties:{
        SSID:"string",
        MAC:"string",
        RSSI:"int",
    }
};
class OfflineEntry extends Realm.Object {}
OfflineEntry.schema = {
    name:Domains.OfflineEntry,
    primaryKey: 'id',
    properties:{
        id:"string",
        entryDate:"date",
        indicatorType:"int",
        isSync:"bool",
        syncDate:"date?"
    }
};
export const asyncDbContext= (schema=null)=>{
    return Realm.open({schema:schema!==null?schema:[UserProfile,WifiIndicator,OfflineEntry],deleteRealmIfMigrationNeeded:true});
} 
export default new Realm({schema: [UserProfile,WifiIndicator,OfflineEntry],deleteRealmIfMigrationNeeded:true});

