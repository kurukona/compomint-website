import { compomint, tmpl } from "compomint";

// Language Switcher Component and I18n Support

document.addEventListener("DOMContentLoaded", function () {
  // Add core application i18n that's needed globally for meta tags and language switching
  compomint.addI18ns({
    app: {
      "page-title": {
        en: "Compomint - Lightweight Component Engine",
        ko: "Compomint - 경량 컴포넌트 엔진",
        ja: "Compomint - 軽量コンポーネントエンジン",
        zh: "Compomint - 轻量级组件引擎",
      },
      "meta-description": {
        en: "Compomint is a lightweight JavaScript template-based component engine for web applications",
        ko: "Compomint는 웹 애플리케이션을 위한 경량 JavaScript 템플릿 기반 컴포넌트 엔진입니다",
        ja: "Compomintは、Webアプリケーション向けの軽量JavaScriptテンプレートベースコンポーネントエンジンです",
        zh: "Compomint是一个用于Web应用程序的轻量级JavaScript模板组件引擎",
      },
      "og-image-alt": {
        en: "Compomint logo and code example screen",
        ko: "Compomint 로고 및 코드 예제 화면",
        ja: "Compomintロゴとコード例の画面",
        zh: "Compomint标志和代码示例屏幕",
      },
      examplesTitle: {
        en: "Code Examples",
        ko: "코드 예제",
        ja: "コード例",
        zh: "代码示例",
      },
    },
  });

  // Note: ui-LanguageSwitcher template is now loaded from templates/ui-language-switcher.cmint

  const langs = ["en", "ko", "ja", "zh"];

  // Initialize language from localStorage or browser language
  function initializeLanguage() {
    let lang;

    // Try to get from localStorage
    try {
      lang = localStorage.getItem("compomint-lang");
    } catch (e) {
      console.warn("Failed to read language preference from localStorage:", e);
    }

    // If not set, use browser language or default to English
    if (!lang) {
      const browserLang = navigator.language.split("-")[0];
      lang = langs.includes(browserLang) ? browserLang : "en";
    }

    // Check for URL parameters that might override the language
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    if (urlLang && langs.includes(urlLang)) {
      lang = urlLang;
    }

    // Set language
    document.documentElement.lang = lang;
    localStorage.setItem("compomint-lang", lang);

    // Initial update of meta tags
    setTimeout(function () {
      try {
        if (typeof window.updateMetaTags === "function") {
          window.updateMetaTags();
        }
      } catch (e) {
        console.warn("Failed to update meta tags:", e);
      }
    }, 100);
  }

  // Initialize language
  initializeLanguage();
});
