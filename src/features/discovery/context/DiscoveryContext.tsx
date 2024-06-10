import {createContext, useState} from 'react';
import { DiscoveryContextType } from './Models';
import { User } from '../../../utils/GlobalInterfaces';
import { RootState } from '../../../redux/Store';
import { useSelector } from 'react-redux';
import axios from 'axios';


export const DiscoveryContext = createContext<DiscoveryContextType | null>(null);

const DiscoveryProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const token = useSelector((state:RootState) => state.user.token);

    const [searchContent, setSearchContent] = useState<string>("");
    const [searchResultUsers, setSearchResultUsers] = useState<User[]>([]);
    

    const searchForUsers = async (searchContent:string) => {
        let req = await axios.get(`http://localhost:8000/discovery/users`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            params: {
                "searchTerm": searchContent
            }
        });

        let body = req.data;

        setSearchResultUsers(body);
    }

    const updateSearchContent = (content:string) => {
        setSearchContent(content);
    }

    return(
        <DiscoveryContext.Provider value={{searchContent, searchResultUsers, searchForUsers, updateSearchContent}}>
            {children}
        </DiscoveryContext.Provider>
    )
}

export default DiscoveryProvider;