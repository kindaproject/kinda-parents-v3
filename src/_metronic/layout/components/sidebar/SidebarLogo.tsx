import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { MutableRefObject, useEffect, useRef } from 'react'
import { ToggleComponent } from '../../../assets/ts/components'

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>
}

const SidebarLogo = ({ sidebarRef }: PropsType) => {
  const { config }: any = useLayout()
  const toggleRef = useRef<HTMLDivElement>(null)

  const minimizeEnabled = config?.app?.sidebar?.default?.minimize?.desktop?.enabled
  const collapseEnabled = config?.app?.sidebar?.default?.collapse?.desktop?.enabled
  const minimizeDefault = config?.app?.sidebar?.default?.minimize?.desktop?.default
  const layoutType = config?.layoutType
  const themeMode = config?.theme?.mode

  const toggleType = collapseEnabled
    ? 'collapse'
    : minimizeEnabled
      ? 'minimize'
      : ''
  const toggleState = minimizeEnabled ? 'active' : ''

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(toggleRef.current!)
      if (!toggleObj) return

      (toggleObj as any).on('kt.toggle.change', () => {
        sidebarRef.current?.classList.add('animating')
        setTimeout(() => {
          sidebarRef.current?.classList.remove('animating')
        }, 300)
      })
    }, 600)
  }, [sidebarRef])

  return (
    <div className='app-sidebar-logo px-6' id='kt_app_sidebar_logo'>
      <Link to='/'>
        {(layoutType === 'dark-sidebar' ||
          (themeMode === 'dark' && layoutType === 'light-sidebar')) && (
            <img
              alt='Logo'
              src={toAbsoluteUrl('media/logos/zkindalogo1.svg')}
              className='h-40px app-sidebar-logo-default'
            />
          )}
        {themeMode === 'light' && layoutType === 'light-sidebar' && (
          <img
            alt='Logo'
            src={toAbsoluteUrl('media/logos/zkindalogo1.svg')}
            className='h-40px app-sidebar-logo-default'
          />
        )}
        <img
          alt='Logo'
          src={toAbsoluteUrl('media/logos/favicon.ico')}
          className='h-25px app-sidebar-logo-minimize'
        // style={{ backgroundColor: 'red' }}

        />
      </Link>

      {(minimizeEnabled || collapseEnabled) && (
        <div
          ref={toggleRef}
          id='kt_app_sidebar_toggle'
          className={clsx(
            'app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate',
            { active: minimizeDefault }
          )}
          data-kt-toggle='true'
          data-kt-toggle-state={toggleState}
          data-kt-toggle-target='body'
          data-kt-toggle-name={`app-sidebar-${toggleType}`}
        >
          <KTIcon iconName='black-left-line' className='fs-3 rotate-180 ms-1' />
        </div>
      )}
    </div>
  )
}

export { SidebarLogo }
