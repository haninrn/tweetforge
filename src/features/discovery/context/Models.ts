import { User } from "../../../utils/GlobalInterfaces";

export type DiscoveryContextType = {
    searchContent: string;
    searchResultUsers: User[];
    searchForUsers: (searchContent:string) => void;
    updateSearchContent: (content:string) => void;
}