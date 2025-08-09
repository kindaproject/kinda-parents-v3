import React from "react";
import ModList from "../../../../../components/Mod/ModList/ModList";

import { credentialHeaders, filtersConfigCredential } from "./config";
import { credentialLinkPageHeader, credentialPageSubHeader } from "../../complements/constants";
import { useIntl } from "react-intl";



const CredentialList: React.FC = () => {
    const intl = useIntl();


    return (
        <ModList
            mod={{
                single: intl.formatMessage({ id: "TEXT.CREDENTIAL.SINGLE" }),
                plural: intl.formatMessage({ id: "TEXT.CREDENTIAL.PLURAL" }),
                subPageHeader: credentialPageSubHeader,
                linkPageHeader: credentialLinkPageHeader,
            }}
            headers={credentialHeaders}
            url="/admin/credential/index"
            delUrl="/admin/credential/delete"
            filtersConfig={filtersConfigCredential}
            
        />
    );
};

export default CredentialList;
