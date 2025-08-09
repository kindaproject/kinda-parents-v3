import clsx from "clsx";
import { FC } from "react";
import { toAbsoluteUrl } from "../../../helpers";
import { useI18n } from "../../../i18n/Metronici18n";
import { useIntl } from "react-intl";

const languages = [
  {
    lang: "en",
    name: "Ingles",
    flag: toAbsoluteUrl("media/flags/united-states.svg"),
  },
  {
    lang: "es",
    name: "Español",
    flag: toAbsoluteUrl("media/flags/spain.svg"),
  },
  {
    lang: "pt-BR",
    name: "Portugues",
    flag: toAbsoluteUrl("media/flags/brazil.svg"),
  },
];

const Languages: FC = () => {
  // Usar el hook useI18n que incluye tanto el idioma como la función setLanguage
  const { selectedLang, setLanguage } = useI18n();
  const currentLanguage = languages.find((x) => x.lang === selectedLang);
  const intl = useIntl();
  return (
    <div
      className="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="bottom">
      <a href="#" className="menu-link px-5  d-flex justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>
          {intl.formatMessage({
            id: "TEXT.LANGUAGE",
          })}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img
            className="w-15px h-15px rounded-1"
            src={currentLanguage?.flag}
            alt="metronic"
          />
          <div style={{ marginLeft: 8 }} className="fs-8  bg-light  flex justify-center items-center end-0">
            {currentLanguage?.name}{" "}
          </div>
        </div>
      </a>

      <div className="menu-sub menu-sub-dropdown w-175px py-4">
        {languages.map((l) => (
          <div
            className="menu-item px-3"
            key={l.lang}
            onClick={() => {
              setLanguage(l.lang);
            }}>
            <p
              className={clsx("menu-link d-flex px-5", {
                active: l.lang === currentLanguage?.lang,
              })}>
              <span className="symbol symbol-20px me-4">
                <img className="rounded-1" src={l.flag} alt="metronic" />
              </span>
              {l.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Languages };
