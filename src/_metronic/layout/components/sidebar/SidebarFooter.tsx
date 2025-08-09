
import { KTIcon } from '../../../helpers'

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        href={'https://kindagolden.blog/'}
        target='_blank'
        className='btn btn-flex flex-center btn-custom btn-primary hover-scale overflow-hidden text-nowrap px-4 h-45px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss='click'
        title='Documentación y Componentes'
      >
        <span className='btn-label fw-bold fs-6'>Documentación</span>
        <KTIcon iconName='book' className='btn-icon fs-2 ms-2' />
      </a>
    </div>
  )
}

export { SidebarFooter }
