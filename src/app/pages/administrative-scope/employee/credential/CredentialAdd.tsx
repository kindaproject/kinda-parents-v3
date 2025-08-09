import React from 'react'
import ModAdd, { FieldConfig } from '../../../../../components/Mod/ModAdd/ModAdd'
import { curricularScopeProgStr, curricularScopeStr } from '../../../curricular-scope/complements/constants'
import { credentialFields, credentialQuickGuide } from './config'
import { credentialLinkPageHeader, credentialPageSubHeader } from '../../complements/constants'
import { useIntl } from 'react-intl'

// import { curricularScopeProgStr, curricularScopeStr, viewContentOptions } from '../../complements/constants'

const CredentialAdd = () => {

const intl = useIntl();




    return (
        <ModAdd
            title={intl.formatMessage({ id: "TEXT.CREDENTIAL.SINGLE" })}
            subtitle={credentialPageSubHeader}
            linkTitle={credentialLinkPageHeader}
            fields={credentialFields}
            quickGuideItems={credentialQuickGuide}
            apiUrl="/admin/credential/store"
            getEditUrl={(id) => `/admin/credential/show/${id}`}
            editUrl={(id) => `/admin/credential/data/${id}`}
        />

    )
}

export default CredentialAdd