import {Name} from "@/components/setting/event/Name";
import {Role} from "@/components/setting/event/Role";
import {ContactInformation} from "@/components/setting/event/ContactInformation";
import {Birthday} from "@/components/setting/event/Birthday";
import {ProfilePicture} from "@/components/setting/event/ProfilePicture";


export const EventType = ({env}: {env: string | null}) => {
    switch(env) {
        case "name": return <Name />;
        case "role": return <Role/>;
        case "contact-information": return <ContactInformation />;
        case "birthday": return <Birthday/>;
        case "profile-picture": return <ProfilePicture/>
    }
};
