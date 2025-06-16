import { compomint, tmpl } from "https://cdn.jsdelivr.net/gh/kurukona/compomint@latest/dist/compomint.esm.min.js"

// Language Switcher Component and I18n Support

document.addEventListener('DOMContentLoaded', function () {
  // Add utility function to update meta tags in real-time
  window.updateMetaTags = function () {
    const currentLang = document.documentElement.lang || 'en';

    // Helper function to get i18n value
    function getI18nValue(key) {
      const parts = key.split('.');
      if (parts.length !== 2) return null;

      const section = compomint.i18n[parts[0]];
      if (!section || !section[parts[1]]) return null;

      const translationFn = section[parts[1]];
      return typeof translationFn === 'function' ? translationFn() : null;
    }

    // Update document title
    const titleKey = 'app.page-title';
    const title = getI18nValue(titleKey);
    if (title) document.title = title;

    // Update meta tags with data-i18n-content attributes
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      const i18nKey = el.getAttribute('data-i18n-content');
      const content = getI18nValue(i18nKey);

      if (content) {
        if (el.hasAttribute('content')) {
          el.setAttribute('content', content);
        } else {
          el.textContent = content;
        }
      }
    });

    // Update schema.org data if it exists
    try {
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      schemaScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);

          // Update Software Application schema
          if (data['@type'] === 'SoftwareApplication') {
            const description = getI18nValue('app.meta-description');
            if (description) data.description = description;

            // Create updated JSON string with proper formatting
            script.textContent = JSON.stringify(data, null, 2);
          }
        } catch (e) {
          console.warn('Failed to parse schema JSON:', e);
        }
      });
    } catch (e) {
      console.warn('Error updating schema.org data:', e);
    }
  };

  // Add translations for all components
  compomint.addI18ns({
    'app': {
      'title': {
        'en': 'How to Create Web Components Easily',
        'ko': '웹 컴포넌트를 간단하게 만드는 방법',
        'ja': 'Webコンポーネントを簡単に作成する方法',
        'zh': '如何轻松创建Web组件'
      },
      'subtitle': {
        'en': 'Compomint is a lightweight JavaScript framework that provides a template-based component system.',
        'ko': 'Compomint는 템플릿 기반 컴포넌트 시스템을 제공하는 경량 JavaScript 프레임워크입니다.',
        'ja': 'Compomintは、テンプレートベースのコンポーネントシステムを提供する軽量JavaScriptフレームワークです。',
        'zh': 'Compomint是一个轻量级JavaScript框架，提供基于模板的组件系统。'
      },
      'page-title': {
        'en': 'Compomint - Lightweight Component Engine',
        'ko': 'Compomint - 경량 컴포넌트 엔진',
        'ja': 'Compomint - 軽量コンポーネントエンジン',
        'zh': 'Compomint - 轻量级组件引擎'
      },
      'meta-description': {
        'en': 'Compomint is a lightweight JavaScript template-based component engine for web applications',
        'ko': 'Compomint는 웹 애플리케이션을 위한 경량 JavaScript 템플릿 기반 컴포넌트 엔진입니다',
        'ja': 'Compomintは、Webアプリケーション向けの軽量JavaScriptテンプレートベースコンポーネントエンジンです',
        'zh': 'Compomint是一个用于Web应用程序的轻量级JavaScript模板组件引擎'
      },
      'og-image-alt': {
        'en': 'Compomint logo and code example screen',
        'ko': 'Compomint 로고 및 코드 예제 화면',
        'ja': 'Compomintロゴとコード例の画面',
        'zh': 'Compomint标志和代码示例屏幕'
      },
      'getStarted': {
        'en': 'Get Started',
        'ko': '시작하기',
        'ja': '始めましょう',
        'zh': '开始使用'
      },
      'featuresTitle': {
        'en': 'Why Use Compomint?',
        'ko': '왜 Compomint를 사용해야 할까요?',
        'ja': 'なぜCompomintを使用するのですか？',
        'zh': '为什么使用Compomint？'
      },
      'examplesTitle': {
        'en': 'Code Examples',
        'ko': '코드 예제',
        'ja': 'コード例',
        'zh': '代码示例'
      },
      'docTitle': {
        'en': 'Learn More',
        'ko': '더 알아보기',
        'ja': 'もっと詳しく',
        'zh': '了解更多'
      },
      'docDescription': {
        'en': 'Check out detailed documentation and resources for Compomint.',
        'ko': 'Compomint에 대한 자세한 정보와 문서를 확인하세요.',
        'ja': 'Compomintの詳細なドキュメントとリソースをご覧ください。',
        'zh': '查看Compomint的详细文档和资源。'
      }
    },
    'features': {
      'lightweight': {
        'title': {
          'en': 'Lightweight Size',
          'ko': '가벼운 크기',
          'ja': '軽量サイズ',
          'zh': '轻量级大小'
        },
        'description': {
          'en': 'Fast loading and execution with a small footprint (~14KB gzipped).',
          'ko': '약 14KB(gzip 압축)의 작은 크기로 빠른 로딩과 실행이 가능합니다.',
          'ja': '小さなフットプリント（gzip圧縮で約14KB）で高速なロードと実行が可能です。',
          'zh': '小体积（gzip压缩后约14KB）实现快速加载和执行。'
        }
      },
      'template': {
        'title': {
          'en': 'Template-Based',
          'ko': '템플릿 기반',
          'ja': 'テンプレートベース',
          'zh': '基于模板'
        },
        'description': {
          'en': 'Use a simple yet powerful string-based template syntax with JavaScript evaluation.',
          'ko': 'JavaScript 평가가 가능한 간단하고 강력한 문자열 기반 템플릿 구문을 사용합니다.',
          'ja': 'JavaScript評価が可能なシンプルで強力な文字列ベースのテンプレート構文を使用します。',
          'zh': '使用简单而强大的基于字符串的模板语法，支持JavaScript评估。'
        }
      },
      'component': {
        'title': {
          'en': 'Component-Oriented',
          'ko': '컴포넌트 지향',
          'ja': 'コンポーネント指向',
          'zh': '组件导向'
        },
        'description': {
          'en': 'Build reusable UI components with proper encapsulation.',
          'ko': '적절한 캡슐화와 함께 재사용 가능한 UI 컴포넌트를 구축합니다.',
          'ja': '適切なカプセル化を備えた再利用可能なUIコンポーネントを構築します。',
          'zh': '构建具有适当封装的可重用UI组件。'
        }
      },
      'easy': {
        'title': {
          'en': 'Component Composition',
          'ko': '컴포넌트 구성',
          'ja': 'コンポーネントの構成',
          'zh': '组件组合'
        },
        'description': {
          'en': 'Combine components like building blocks to create complex UIs.',
          'ko': '복잡한 UI를 구성하기 위해 블록처럼 컴포넌트를 조합할 수 있습니다.',
          'ja': '複雑なUIを作成するために、ビルディングブロックのようにコンポーネントを組み合わせます。',
          'zh': '像积木一样组合组件，创建复杂的UI。'
        }
      },
      'responsive': {
        'title': {
          'en': 'State Management',
          'ko': '상태 관리',
          'ja': '状態管理',
          'zh': '状态管理'
        },
        'description': {
          'en': 'Manage component state efficiently with automatic updates.',
          'ko': '자동 업데이트와 함께 컴포넌트 상태를 효율적으로 관리합니다.',
          'ja': '自動更新でコンポーネントの状態を効率的に管理します。',
          'zh': '通过自动更新高效管理组件状态。'
        }
      },
      'i18n': {
        'title': {
          'en': 'Internationalization',
          'ko': '다국어 지원',
          'ja': '国際化',
          'zh': '国际化'
        },
        'description': {
          'en': 'Built-in support for multiple languages with i18n system.',
          'ko': '여러 언어를 지원하는 내장된 국제화(i18n) 시스템을 제공합니다.',
          'ja': '複数言語をサポートする組み込みの国際化（i18n）システムを提供します。',
          'zh': '内置的i18n系统支持多种语言。'
        }
      }
    },
    'examples': {
      'result': {
        'en': 'Result:',
        'ko': '결과:',
        'ja': '結果:',
        'zh': '结果:'
      },
      'basicComponent': {
        'title': {
          'en': 'Basic Component',
          'ko': '기본 컴포넌트',
          'ja': '基本的なコンポーネント',
          'zh': '基础组件'
        },
        'description': {
          'en': 'Simple template definition and usage',
          'ko': '간단한 템플릿 정의와 사용 방법',
          'ja': 'シンプルなテンプレート定義と使用方法',
          'zh': '简单的模板定义和使用方法'
        }
      },
      'stateManagement': {
        'title': {
          'en': 'State Management',
          'ko': '상태 관리',
          'ja': '状態管理',
          'zh': '状态管理'
        },
        'description': {
          'en': 'How to manage internal component state and respond to events',
          'ko': '컴포넌트 내부 상태를 관리하고 이벤트에 반응하는 방법',
          'ja': 'コンポーネントの内部状態を管理しイベントに応答する方法',
          'zh': '如何管理组件内部状态并响应事件'
        }
      },
      'complexComponent': {
        'title': {
          'en': 'Complex Component',
          'ko': '복잡한 컴포넌트',
          'ja': '複雑なコンポーネント',
          'zh': '复杂组件'
        },
        'description': {
          'en': 'A more complex component example: Todo List',
          'ko': '더 복잡한 컴포넌트 예제: Todo 리스트',
          'ja': 'より複雑なコンポーネントの例：Todoリスト',
          'zh': '更复杂的组件示例：待办事项列表'
        }
      }
    },
    'vscode': {
      'title': {
        'en': 'VSCode Extension',
        'ko': 'VSCode 확장 기능',
        'ja': 'VSCode拡張機能',
        'zh': 'VSCode扩展'
      },
      'subtitle': {
        'en': 'Boost your Compomint development with powerful VSCode extension that provides syntax highlighting, auto-completion, and live preview.',
        'ko': '구문 하이라이팅, 자동 완성, 라이브 미리보기를 제공하는 강력한 VSCode 확장 기능으로 Compomint 개발을 향상시키세요.',
        'ja': '構文ハイライト、自動補完、ライブプレビューを提供する強力なVSCode拡張機能でCompomint開発を向上させましょう。',
        'zh': '使用提供语法高亮、自动完成和实时预览的强大VSCode扩展来提升您的Compomint开发体验。'
      },
      'install': {
        'en': 'Install Extension',
        'ko': '확장 기능 설치',
        'ja': '拡張機能をインストール',
        'zh': '安装扩展'
      },
      'features': {
        'syntax': {
          'title': {
            'en': 'Syntax Highlighting',
            'ko': '구문 하이라이팅',
            'ja': '構文ハイライト',
            'zh': '语法高亮'
          },
          'description': {
            'en': 'Colored syntax highlighting for Compomint templates and expressions.',
            'ko': 'Compomint 템플릿과 표현식을 위한 컬러 구문 하이라이팅을 제공합니다.',
            'ja': 'Compomintテンプレートと式のカラー構文ハイライトを提供します。',
            'zh': '为Compomint模板和表达式提供彩色语法高亮。'
          }
        },
        'autocomplete': {
          'title': {
            'en': 'Auto-completion',
            'ko': '자동 완성',
            'ja': '自動補完',
            'zh': '自动完成'
          },
          'description': {
            'en': 'Smart auto-completion for Compomint APIs and template syntax.',
            'ko': 'Compomint API와 템플릿 구문을 위한 스마트 자동 완성 기능을 제공합니다.',
            'ja': 'Compomint APIとテンプレート構文のスマート自動補完を提供します。',
            'zh': '为Compomint API和模板语法提供智能自动完成。'
          }
        },
        'snippets': {
          'title': {
            'en': 'Code Snippets',
            'ko': '코드 스니펫',
            'ja': 'コードスニペット',
            'zh': '代码片段'
          },
          'description': {
            'en': 'Ready-to-use code snippets for common Compomint patterns.',
            'ko': '일반적인 Compomint 패턴을 위한 즉시 사용 가능한 코드 스니펫을 제공합니다.',
            'ja': '一般的なCompomintパターン用のすぐに使えるコードスニペットを提供します。',
            'zh': '为常见的Compomint模式提供即用型代码片段。'
          }
        },
        'preview': {
          'title': {
            'en': 'Live Preview',
            'ko': '라이브 미리보기',
            'ja': 'ライブプレビュー',
            'zh': '实时预览'
          },
          'description': {
            'en': 'Real-time preview of your Compomint templates and components.',
            'ko': 'Compomint 템플릿과 컴포넌트의 실시간 미리보기를 제공합니다.',
            'ja': 'Compomintテンプレートとコンポーネントのリアルタイムプレビューを提供します。',
            'zh': '为您的Compomint模板和组件提供实时预览。'
          }
        }
      },
      'screenshots': {
        'template': {
          'title': {
            'en': 'Template Support',
            'ko': '템플릿 지원',
            'ja': 'テンプレートサポート',
            'zh': '模板支持'
          },
          'description': {
            'en': 'Advanced template editing with syntax highlighting and IntelliSense.',
            'ko': '구문 하이라이팅과 IntelliSense를 통한 고급 템플릿 편집 기능입니다.',
            'ja': '構文ハイライトとIntelliSenseによる高度なテンプレート編集機能です。',
            'zh': '通过语法高亮和IntelliSense提供高级模板编辑功能。'
          }
        },
        'preview': {
          'title': {
            'en': 'Live Preview',
            'ko': '라이브 미리보기',
            'ja': 'ライブプレビュー',
            'zh': '实时预览'
          },
          'description': {
            'en': 'See your components rendered in real-time as you code.',
            'ko': '코딩하는 동시에 컴포넌트가 실시간으로 렌더링되는 것을 확인할 수 있습니다.',
            'ja': 'コーディング中にコンポーネントがリアルタイムでレンダリングされるのを確認できます。',
            'zh': '在编码时实时查看组件的渲染效果。'
          }
        }
      }
    },
    'footer': {
      'description': {
        'en': 'Compomint is a lightweight JavaScript framework for creating web applications with a component-based architecture.',
        'ko': 'Compomint는 웹 애플리케이션 개발을 위한 경량 JavaScript 프레임워크로, 컴포넌트 기반 아키텍처에 중점을 둡니다.',
        'ja': 'Compomintは、コンポーネントベースのアーキテクチャでウェブアプリケーションを作成するための軽量JavaScriptフレームワークです。',
        'zh': 'Compomint是一个用于创建基于组件架构的Web应用程序的轻量级JavaScript框架。'
      },
      'links': {
        'home': {
          'en': 'Home',
          'ko': '홈',
          'ja': 'ホーム',
          'zh': '首页'
        },
        'features': {
          'en': 'Features',
          'ko': '특징',
          'ja': '機能',
          'zh': '特性'
        },
        'examples': {
          'en': 'Examples',
          'ko': '예제',
          'ja': '例',
          'zh': '示例'
        },
        'docs': {
          'en': 'Documentation',
          'ko': '문서',
          'ja': 'ドキュメント',
          'zh': '文档'
        }
      },
      'links_section': {
        'en': 'Links',
        'ko': '링크',
        'ja': 'リンク',
        'zh': '链接'
      },
      'contact_section': {
        'en': 'Contact',
        'ko': '연락처',
        'ja': 'お問い合わせ',
        'zh': '联系我们'
      },
      'license_text': {
        'en': 'Available under MIT License.',
        'ko': 'MIT 라이센스에 따라 사용 가능합니다.',
        'ja': 'MITライセンスの下で利用可能です。',
        'zh': '根据MIT许可证可用。'
      }
    },
    'demo': {
      'counter': {
        'title': {
          'en': 'Counter Component',
          'ko': '카운터 컴포넌트',
          'ja': 'カウンターコンポーネント',
          'zh': '计数器组件'
        }
      },
      'todo': {
        'title': {
          'en': 'Todo List',
          'ko': '할 일 목록',
          'ja': 'Todoリスト',
          'zh': '待办事项列表'
        },
        'addTodo': {
          'en': 'Add',
          'ko': '추가',
          'ja': '追加',
          'zh': '添加'
        },
        'placeholder': {
          'en': 'Add a todo...',
          'ko': '할 일 추가...',
          'ja': 'Todoを追加...',
          'zh': '添加待办事项...'
        },
        'empty': {
          'en': 'No todos yet. Add one above!',
          'ko': '할 일이 없습니다. 새로운 항목을 추가해보세요!',
          'ja': 'まだTodoはありません。上に新しいものを追加してください！',
          'zh': '暂无待办事项。请在上方添加！'
        },
        'itemsLeft': {
          'en': 'item(s) left',
          'ko': '항목 남음',
          'ja': 'アイテム残り',
          'zh': '剩余项目'
        },
        'clearCompleted': {
          'en': 'Clear completed',
          'ko': '완료된 항목 지우기',
          'ja': '完了したアイテムをクリア',
          'zh': '清除已完成'
        }
      }
    },
    'ui-LanguageSwitcher': {
      'language': {
        'en': 'Language',
        'ko': '언어',
        'ja': '言語',
        'zh': '语言'
      },
      'en': {
        'en': 'English',
        'ko': 'English',
        'ja': 'English',
        'zh': 'English'
      },
      'ko': {
        'en': '한국어',
        'ko': '한국어',
        'ja': '한국어',
        'zh': '한국어'
      },
      'ja': {
        'en': '日本語',
        'ko': '日本語',
        'ja': '日本語',
        'zh': '日本語'
      },
      'zh': {
        'en': '中文',
        'ko': '中文',
        'ja': '中文',
        'zh': '中文'
      }
    }
  });

  // Language Switcher Template
  compomint.addTmpls(`
    <template id="ui-LanguageSwitcher">
      ##
      const langs = ['en', 'ko', 'ja', 'zh'];

      // Get current language
      const currentLang = document.documentElement.lang || 'en';
      
      // Initialize state
      status.isOpen = status.isOpen || false;
      
      // Function to set language
      function setLanguage(lang) {

        // Set HTML lang attribute
        document.documentElement.lang = lang;

        // Store language preference
        try {
          localStorage.setItem('compomint-lang', lang);
        } catch (e) {
          console.warn('Failed to save language preference to localStorage:', e);
        }

        // Close the dropdown
        status.isOpen = false;

        // Refresh all components on page
        refreshAllComponents();

        // Refresh this component
        component.refresh();
      }

      // Close dropdown when clicking outside
      document.addEventListener('click', function (event) {
        if (status.isOpen && !event.target.closest('.ui-LanguageSwitcher')) {
          status.isOpen = false;
          component.refresh();
        }
      });

      // Function to refresh all components on the page
      function refreshAllComponents() {
        // Update meta tags with i18n content
        if (typeof window.updateMetaTags === 'function') {
          window.updateMetaTags();
        }

        // This is a simple way to refresh the page
        // For a more sophisticated approach, you would track all compomint
        // components and refresh them individually
        window.location.reload();
      }

      // Function to update meta tags based on the selected language
      function updateMetaTags() {
        // Update document title
        if (compomint.i18n.app && compomint.i18n.app['page-title']) {
          document.title = compomint.i18n.app['page-title']();
        }

        // Update meta tags with data-i18n-content attributes
        document.querySelectorAll('[data-i18n-content]').forEach(el => {
          const i18nKey = el.getAttribute('data-i18n-content');
          const parts = i18nKey.split('.');

          if (parts.length === 2 && compomint.i18n[parts[0]] && compomint.i18n[parts[0]][parts[1]]) {
            if (el.hasAttribute('content')) {
              el.setAttribute('content', compomint.i18n[parts[0]][parts[1]]());
            } else {
              el.textContent = compomint.i18n[parts[0]][parts[1]]();
            }
          }
        });
      }
      ##
      <div class="relative inline-block text-left ui-LanguageSwitcher" >
        <button 
          class="flex items-center space-x-1 text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          data-co-event="##:{
            click: function() {
              status.isOpen = !status.isOpen;
              component.refresh();
            }
          }##"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          <span>##=compomint.i18n['ui-LanguageSwitcher'].language##</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div class="##=status.isOpen ? 'block' : 'hidden'## absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 text-gray-800 dark:text-gray-200">
          ##langs.forEach(lang => {##
            <a href="##=window.location.origin + window.location.pathname + '?lang=' + lang##" 
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ##=currentLang === lang ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200' : ''##"
              data-co-event="##:{
                click: function(e) {
                  setLanguage(lang);
                }
              }##"
            >
              ##=compomint.i18n['ui-LanguageSwitcher'][lang]##
            </a>
          ##});##

        </div>
      </div >
    </template >
  `);

  const langs = ['en', 'ko', 'ja', 'zh'];

  // Initialize language from localStorage or browser language
  function initializeLanguage() {
    let lang;

    // Try to get from localStorage
    try {
      lang = localStorage.getItem('compomint-lang');
    } catch (e) {
      console.warn('Failed to read language preference from localStorage:', e);
    }

    // If not set, use browser language or default to English
    if (!lang) {
      const browserLang = navigator.language.split('-')[0];
      lang = langs.includes(browserLang) ? browserLang : 'en';
    }

    // Check for URL parameters that might override the language
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && langs.includes(urlLang)) {
      lang = urlLang;
    }
    /*
    // Check if we should redirect based on current pathname
    const currentPath = window.location.pathname;

    // If we're at the root or a generic path and not already on a language-specific path
    if (!currentPath.match(/\/(en|ko|ja|zh)\//)) {
      // Get hreflang link for the selected language
      const hreflangLink = document.querySelector(`link[rel = "alternate"][hreflang = "${lang}"]`);

      if (hreflangLink) {
        // Only redirect if we need to change to a different path
        const hrefTarget = hreflangLink.getAttribute('href');
        const targetPath = new URL(hrefTarget).pathname;

        if (targetPath !== currentPath) {
          //window.location.href = hrefTarget;
          console.log(lang)
          return;
        }
      }
    }
    */

    // Set language
    document.documentElement.lang = lang;

    // Initial update of meta tags
    setTimeout(function () {
      try {
        if (typeof window.updateMetaTags === 'function') {
          window.updateMetaTags();
        }
      } catch (e) {
        console.warn('Failed to update meta tags:', e);
      }
    }, 100);
  }

  // Initialize language
  initializeLanguage();
});
