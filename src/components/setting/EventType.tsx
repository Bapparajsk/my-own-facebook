import {Name} from "@/components/setting/event/Name";
import {Role} from "@/components/setting/event/Role";
import {ContactInformation} from "@/components/setting/event/ContactInformation";
import {Birthday} from "@/components/setting/event/Birthday";
import {ProfilePicture} from "@/components/setting/event/ProfilePicture";
import { UserSType } from "@/interface/usertupe";


export const EventType = ({env, user}: {env: string, user : UserSType}) => {
    
    const components: Record<string, JSX.Element> = {
        name: <Name user={user} />,
        role: <Role user={user} />,
        "contact-information": <ContactInformation user={user} />,
        birthday: <Birthday user={user} />,
        "profile-picture": <ProfilePicture user={user} />,
    };

    return components[env] || null;
};
