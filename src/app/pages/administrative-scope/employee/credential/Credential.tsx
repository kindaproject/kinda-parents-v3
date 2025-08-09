import { Route, Routes } from 'react-router-dom'
import CredentialAdd from './CredentialAdd'
import CredentialList from './CredentialList'
import CredentialView from './CredentialView'


const Credential: React.FC = () => (
    <Routes>
        {/* /administrative-scope/employee/staffs */}
        <Route index element={<CredentialList />} />

        <Route path="create" element={<CredentialAdd />} />

        <Route path="edit/:id" element={<CredentialAdd />} />

        <Route path="view/:id" element={<CredentialView />} />

    </Routes>
)

export default Credential
