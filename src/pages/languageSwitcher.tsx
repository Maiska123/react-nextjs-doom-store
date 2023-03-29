import { useTranslation, Trans } from "react-i18next";
const lngs: { [key: string]: { nativeName: string } } = {
  en: { nativeName: "English" },
  fi: { nativeName: "Finnish" },
};
function LanguageSwitcher() {
  const { t, i18n, ready } = useTranslation("common");

  return (
    <div className="App">
      <div>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName} {lng}
          </button>
        ))}
      </div>
      <p>
        <Trans i18nKey="description">
          <strong title={ready ? t("nameTitle") ?? "" : ""}>
            {t("part1")}
          </strong>

          {t("description.part1")}
        </Trans>
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("description.part2")}
      </a>
    </div>
  );
}
export default LanguageSwitcher;
